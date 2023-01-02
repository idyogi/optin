<?php

namespace App\Jobs;

use App\Models\Campaign;
use App\Models\Contact;
use App\Models\SendingServer;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendMessageJob implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 600;
    public $maxExceptions = 1; // This is required if retryUntil is used, otherwise, the default value is 255
    public $failOnTimeout = true;

    protected Campaign $campaign;
    protected Contact $contact;
    protected SendingServer $server;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Campaign $campaign, Contact $contact, SendingServer $server)
    {
        $this->campaign = $campaign;
        $this->contact = $contact;
        $this->server = $server;
    }

    public function handle()
    {
        $logger = $this->campaign->logger();
        $phone = $this->contact->getPhone();
        try {
            $sent = $this->server->send($this->campaign->text, $phone);

            // Log successful shot
            $this->campaign->trackMessage($sent, $this->contact, $this->server);
            $logger->info(sprintf('Sent to %s [Server "%s"]', $phone, $this->server->name));
        } catch (\Exception $e) {
            $this->fail($e);
        }
    }
}