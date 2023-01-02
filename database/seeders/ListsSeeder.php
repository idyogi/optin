<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ListsSeeder extends Seeder
{
    public function run()
    {
        for($i = 0; $i < 1; $i++) {
            $list = \App\Models\Lists::factory()->create([
                'user_id' => 1,
                'name' => 'LEAD form',
            ]);
            //add 5 to 9 contacts to list
//            $list->contacts()->attach(\App\Models\Contact::factory()->count(random_int(1, 7))->create([
//                'user_id' => 1,
//            ])->pluck('id'));
        }
    }
}
