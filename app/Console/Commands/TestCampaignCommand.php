<?php

namespace App\Console\Commands;

use App\Jobs\SendMessageJob;
use App\Models\SendingServer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TestCampaignCommand extends Command
{
    protected $signature = 'test:campaign';

    protected $description = 'Command description';

    //const

    public function handle()
    {
        $url = 'https://starsender.online/api/sendText';
        $api_key = 'ab0b4e9a9381aa5839edfe0c1abd4c337b610388';

        //get a campaign with status scheduled
        $campaign = \App\Models\Campaign::where('status', 'scheduled')->first();
        //foreach all contacts in all list in campaign
        $contacts = $campaign->contacts()->get();
        $this->info('total contacts: ' . $contacts->count());
        foreach ($contacts as $contact) {
            $data = [
                'phone' => '082312225580',
                'text' => 'Kita akan live lagi di facebook jam 9 pagi. Jangan sampai ketinggalan ya. Klik link ini untuk melihat live nya.',
            ];
            $server = SendingServer::where('type', 'selvi')->where('status','connected')->first();
            dispatch(new SendMessageJob(
                $campaign,
                $contact,
                $server
            ));
            //send text to contact
//            $this->sendText($url, $api_key, $data);
        }
        $this->info('done');


    }

    private function sendText($url, $api_key, $data)
    {
        $headers = [
            'apikey' => $api_key,
        ];
        $data = [
            'tujuan' => '082312225580',
            'message' => $data['text'],
        ];
        return Http::withHeaders($headers)->post($url, $data);
    }
}
