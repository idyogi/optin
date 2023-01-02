<?php

namespace App\Jobs;

use App\Models\Campaign;
use App\Traits\Trackable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ScheduleCampaignJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Trackable;

    protected $campaign;
    public function __construct(Campaign $campaign)
    {
        $this->campaign = $campaign;
    }

    public function handle()
    {

        try {
            $this->campaign->logger()->info("Launch campaign ---------------------->");
            $this->campaign->launch();
        } catch (\Throwable $e) {
            $errorMsg = "Error scheduling campaign: ".$e->getMessage()."\n".$e->getTraceAsString();
            $this->campaign->setError($errorMsg);

            // To set the job to failed
            throw $e;
        }
    }
}