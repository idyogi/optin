<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\form;
use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Factories\FormFactory;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
        ]);
        //forms seeder
        for ($i = 0; $i < 1; $i++) {
            $form = form::factory()->create([
                'title' => 'Form ' . $i,
                'user_id' => 1,
            ]);
            foreach ($form->settings() as $key => $value) {
                $form_metas[] = [
                    'form_id' => $form->id,
                    'meta_key' => $key,
                    'value' => json_encode($value),
                ];
            }
            $form->metas()->createMany($form_metas);

            for ($j = 0; $j < 10; $j++) {
                $fields = collect($form->fields()['fields'])->map(function ($field, $index) use ($j) {
                    return [
                        'name' => $field['element'],
                        'value' => $field['element'].$index.$j,
                    ];
                });
//                $submisson = $form->leads()->create([
//                    'response' => json_encode($fields),
//                ]);
//                $submisson_metas = [];
//                foreach ($fields as $field) {
//                    $submisson_metas[] = [
//                        'submission_id' => $submisson->id,
//                        'meta_key' => $field['name'],
//                        'value' => $field['value'] ?? null,
//                        'user_id' => auth()->id() ?? null,
//                    ];
//                }
//                $submisson->meta()->createMany($submisson_metas);
            }

            //run lists seeder
            $this->call([
                ListsSeeder::class,
                CampaignSeeder::class
            ]);

        }
    }
}
