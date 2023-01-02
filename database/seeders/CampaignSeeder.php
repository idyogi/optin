<?php

namespace Database\Seeders;

use App\Models\Campaign;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    public function run()
    {
//        for ($i = 0; $i < 2; $i++) {
//            $default_list_id = $i + 1;
//            $campaign = \App\Models\Campaign::factory()->create([
//                'user_id' => 1,
//                'default_list_id' => $default_list_id,
//                'name' => 'Campaign LIVE ' . $default_list_id,
//                'text' => 'Kita akan live lagi di facebook jam 9 pagi. Jangan sampai ketinggalan ya. Klik link ini untuk melihat live nya.',
//                'scheduled_at' => now()->addDays(1),
//                'status' => 'scheduled',
//            ]);
//            $list = \App\Models\Lists::find($default_list_id);
//            $campaign->lists()->attach($list);
//            //attach to a list except default list
//
//            $lists = \App\Models\Lists::where('id', '!=', $default_list_id)->get();
//            if ($lists->count() > 0 && $i == 0) {
//                $campaign->lists()->attach($lists[0]);
//            }
//        }

//        create sending server
        $server = \App\Models\SendingServer::factory()->create([
            'name' => 'CS Selvi',
            'number' => '0',
            'type' => 'selvi',
            'webhook_url' => 'https://api.adminselvi.com/send-message',
            'api_key' => 'awCnq3n2no7IWCiSYgE3xDbcQKTphd',
            'status' => 'disconnected',
        ]);

        //create new campaign status sent with log sent
        $campaign = \App\Models\Campaign::factory()->create([
            'user_id' => 1,
            'default_list_id' => 1,
            'name' => 'Campaign LIVE 1',
            'text' => 'Kita akan live lagi di facebook jam 9 pagi. Jangan sampai ketinggalan ya. Klik link ini untuk melihat live nya.',
            'scheduled_at' => now()->subDay(1),
            'status' => Campaign::STATUS_DONE,
        ]);
        $list = \App\Models\Lists::find(1);
        $campaign->lists()->attach($list);
//        $contacts = $list->contacts()->get();
//        foreach ($contacts as $contact) {
//            //status random, 1/3 failed. if failed using error message
//            $status = random_int(1, 3) == 1 ? 'failed' : 'sent';
//            $error_message = $status === 'failed' ? 'Error message' : null;
//            \App\Models\LogSent::create([
//                'contact_id' => $contact->id,
//                'campaign_id' => $campaign->id,
//                'sending_server_id' => $server->id,
//                'sent_at' => now()->subDay(1)->addMinutes(random_int(1, 60)),
//                'status' => $status,
//                'error_message' => $error_message,
//
//            ]);
//        }
    }
}
