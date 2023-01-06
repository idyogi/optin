<?php

namespace App\Models;

use App\Jobs\LoadCampaignJob;
use App\Jobs\ScheduleCampaignJob;
use App\Traits\HasCache;
use App\Traits\TrackJobs;
use App\Traits\WithUuid;
use Illuminate\Bus\Batch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Logger;
use Throwable;

class Campaign extends Model
{
    use HasFactory;
    use WithUuid;
    use HasCache;
    use TrackJobs;

    protected $logger;

    // Campaign status
    public const STATUS_NEW = 'new';
    public const STATUS_QUEUING = 'queuing'; // equiv. to 'queue'
    public const STATUS_QUEUED = 'queued'; // equiv. to 'queue'
    public const STATUS_SENDING = 'sending';
    public const STATUS_ERROR = 'error';
    public const STATUS_DONE = 'done';
    public const STATUS_PAUSED = 'paused';

    protected $table = 'campaigns';
    protected $fillable = [
        'user_id',
        'default_list_id',
        'name',
        'text',
        'status',
        'scheduled_at',
        'runtime_message_id',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function lists()
    {
        return $this->belongsToMany(\App\Models\Lists::class, 'list_campaigns');
    }

    public function getCacheIndex()
    {
        return [
            // @note: SubscriberCount must come first as its value shall be used by the others
            'SubscriberCount' => function () {
                return $this->subscribersCount(false); // spepcial key that requires true update
            },
        ];
    }

    /**
     * Count contacts.
     *
     * @return int
     */
    public function contactsCount($cache = false)
    {
        if ($cache) {
            return $this->readCache('SubscriberCount', 0);
        }

        return $this->contacts([])->count();
    }

    /**
     * Subscribers.
     *
     */
    public function contacts($params = [])
    {
        if ($this->lists->isEmpty()) {
            // this is a trick for returning an empty builder
            return Contact::limit(0);
        }

        $query = Contact::select('contacts.*');
        // Get subscriber from mailist and segment
        $conditions = [];
        foreach ($this->lists as $list) {
            if ($list->contacts()->count() > 0) {
                $conditions[] = "contacts.id IN (SELECT contact_id FROM list_contacts WHERE list_id = {$list->id})";
            }
        }
        if (!empty($conditions)) {
            $query = $query->whereRaw('(' . implode(' OR ', $conditions) . ')');
        }
        return $query;
    }

    public function logger()
    {
        if (!is_null($this->logger)) {
            return $this->logger;
        }

        $formatter = new LineFormatter("[%datetime%] %channel%.%level_name%: %message%\n");

        $logfile = $this->getLogFile();
        $stream = new RotatingFileHandler($logfile, 0, Logger::DEBUG);
        $stream->setFormatter($formatter);

        $pid = getmypid();
        $logger = new Logger($pid);
        $logger->pushHandler($stream);
        $this->logger = $logger;

        return $this->logger;
    }

    public function getLogFile()
    {
        return storage_path('logs/campaign-' . $this->uuid . '.log');
    }

    /**
     * Mark the campaign as 'done' or 'sent'.
     */
    public function setDone()
    {
        $this->status = self::STATUS_DONE;
        $this->last_error = null;
        ($this->save()) ? $this->logger()->info('Campaign marked as done') : $this->logger()->error('Campaign could not be marked as done');
    }

    /**
     * Mark the campaign as 'sending'.
     */
    public function setSending()
    {
        $this->status = self::STATUS_SENDING;
        $this->running_pid = getmypid();
        $this->delivery_at = Carbon::now();
        $this->save();
    }

    /**
     * Check if the campaign is in the "SENDING" status;.
     */
    public function isSending()
    {
        return $this->status == self::STATUS_SENDING;
    }

    /**
     * Check if the campaign is in the "DONE" status;.
     */
    public function isDone()
    {
        return $this->status == self::STATUS_DONE;
    }

    /**
     * Check if the campaign is ready to start.
     */
    public function isQueued()
    {
        return $this->status == self::STATUS_QUEUED;
    }

    /**
     * Mark the campaign as 'ready' (which is equiv. to 'queued').
     */
    public function setQueued()
    {
        $this->status = self::STATUS_QUEUED;
        $this->save();
        return $this;
    }

    /**
     * Mark the campaign as 'ready' (which is equiv. to 'queued').
     */
    public function setQueuing()
    {
        $this->status = self::STATUS_QUEUING;
        $this->save();
        return $this;
    }

    /**
     * Mark the campaign as 'done' or 'sent'.
     */
    public function setError($error = null)
    {
        $this->status = self::STATUS_ERROR;
        $this->last_error = $error;
        $this->save();
        return $this;
    }

    public function schedule()
    {
        $this->setQueuing();
        // Schedule Job initialize
//        $scheduler = (new ScheduleCampaignJob($this))->delay($this->scheduled_at);
        $scheduler = (new ScheduleCampaignJob($this))->delay(now()->addSeconds(10));
        $this->dispatchWithMonitor($scheduler);
        // After this job is dispatched successfully, set status to "queuing"
        // Notice the different between the two statuses
        // + Queuing: waiting until campaign is ready to run
        // + Queued: ready to run

    }

    // log sent
    public function logSent()
    {
        return $this->hasMany(\App\Models\LogSent::class);
    }

    /**
     * Log delivery message, used for later tracking.
     */
    public function trackMessage($response, $contact, $server)
    {

        // @todo: customerneedcheck
        $params = array_merge(array(
            'campaign_id' => $this->id,
            'contact_id' => $contact->id,
            'sending_server_id' => $server->id,
            'sent_at' => Carbon::now(),
        ), $response);


        $log = LogSent::create($params);
        $this->logger()->warning('Log sent id: ' . $log->id);
    }

    public function contactsToSend()
    {
        // Retrieve subscribers to send!
        $query = $this->contacts([])
            ->whereRaw(sprintf('contacts.phone NOT IN (SELECT phone FROM %s t JOIN %s s ON t.contact_id = s.id WHERE t.campaign_id = %s)', 'log_sents', 'contacts', $this->id));

        return $query;
    }

    // Should be called by ScheduleCampaign

    /**
     * @throws \Exception
     */
    public function launch()
    {
        // Pause any previous batch no matter what status it is
        // Notice that batches without a job_monitor will not be retrieved
        $jobs = $this->jobMonitors()->byJobType(LoadCampaignJob::class)->get();
        foreach ($jobs as $job) {
            $job->cancelWithoutDeleteBatch();
        }

        // Campaign loader job
        $campaignLoader = new LoadCampaignJob($this);
//        dispatch($campaignLoader);
        // Dispatch it with a batch monitor
        $this->dispatchWithBatchMonitor(
            $campaignLoader,
            function ($batch) {
                $this->logger()->warning('tes');
                $count = $this->contactsToSend()->count();
                if ($count > 0) {
                    $this->logger()->warning('Launch another batch of ' . $count);
                    $this->launch();
                } else {
                    $this->logger()->warning('No contact left, campaign finishes successfully!');
                }
            },
            function (Batch $batch, Throwable $e) {
                // CATCH callback
                $errorMsg = "Campaign stopped. " . $e->getMessage() . "\n" . $e->getTraceAsString();
                $this->logger()->info($errorMsg);
                $this->setError($errorMsg);
            },
            function () {
                // FINALLY callback
                $this->setDone();
                $this->logger()->info('Finally!');
            }
        );
    }

    /**
     * Reset max_execution_time so that command can run for a long time without being terminated.
     *
     * @return mixed
     */
    public static function resetMaxExecutionTime(): void
    {
        set_time_limit(0);
        ini_set('max_execution_time', 0);
        ini_set('memory_limit', '-1');
    }

    /**
     * Start the campaign. called by daemon job
     */
    public function prepare($callback, $loadLimit = null)
    {
        // Available sending servers
        $servers = SendingServer::getAllActive();
        // If no sending server available, return
        if ($servers->count() == 0) {
            $this->setError('No sending server available');
            return;
        }
        // Reset max_execution_time so that command can run for a long time without being terminated
        self::resetMaxExecutionTime();

        // Query subscribers
        // IMPORTANT: this method is called by LoadCampaign job which create a SendMessage job for each subscribers
        // then add to the batch
        // However, iterating through a big list may cause memory leak
        // So, LoadCampaign only a fixed number of $loadLimit subscribers each time, then just finish the queue
        // (it will automatically load the other $loadLimit after that)
        if (!is_null($loadLimit)) {
            $contacts = $this->contactsToSend()->limit($loadLimit)->get();
            foreach ($contacts as $contact) {
                $server = $servers[0];
                $callback($this, $contact, $server);
            }

            // Important
            return;
        }
        // Iterate through batches of subscribers, 100 each
        $this->cursorIterate(
            $this->contactsToSend(),
            $orderBy = 'contacts.id',
            $perPage = 100,
            function ($contacts) use (&$i, &$servers, $callback) {
                foreach ($contacts as $contact) {
                    $server = $servers[0];
                    $callback($this, $contact, $server);
                }
            }
        );
    }

    /*
 *  Iterate through a Eloquent $query using cursor paginate
 *  The $orderBy parameter is critically required for a cursor pagination
 */
    function cursorIterate($query, $orderBy, $size, $callback)
    {
        $cursor = null;
        $page = 1;
        do {
            $q = clone $query;
            // The 4th parameter contains the offset cursor
            $list = $q->orderBy($orderBy)->cursorPaginate($size, ['*'], 'cursor', $cursor);
            $callback($list->items(), $page);
            $cursor = $list->nextCursor();
            $page += 1;
        } while ($list->hasMorePages());
    }

    public function cancelAndDeleteJobs($jobType = null)
    {
        $query = $this->jobMonitors();

        if (!is_null($jobType)) {
            $query = $query->byJobType($jobType);
        }

        foreach ($query->get() as $job) {
            $job->cancel();
        }
    }

    /**
     * Pause campaign.
     *
     * @return bool
     */
    public function pause(): void
    {
        $this->cancelAndDeleteJobs();
    }
}