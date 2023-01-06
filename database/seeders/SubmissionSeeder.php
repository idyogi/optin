<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SubmissionSeeder extends Seeder
{
    public function run()
    {
        for($i = 0; $i < random_int(50,70); $i++) {
            $submission = \App\Models\submission::factory()->create([
                'form_id' => 1,
                'created_at' => now()->addSecond(rand(4, 60)),
            ]);
            //create meta
            \App\Models\submission_meta::create([
                'submission_id' => $submission->id,
                'meta_key' => 'name',
                'value' => 'John Doe',
            ]);
            //meta phone
            \App\Models\submission_meta::create([
                'submission_id' => $submission->id,
                'meta_key' => 'phone',
                'value' => '09123456789',
            ]);
        }
    }
}
