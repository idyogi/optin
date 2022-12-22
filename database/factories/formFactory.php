<?php

namespace Database\Factories;

use App\Models\form;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class formFactory extends Factory
{
    protected $model = form::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'slug' => form::slug(),
            'title' => 'Form #'.$this->faker->word(),
            'status' => 'published',
            'appearance_settings' => null,
            'form_fields' => json_encode(form::getDefaultFields()),
            'response_fields' => json_encode(form::getFormatResponseFields()),
            'has_payment' => 0,
            'type' => '',
            'conditions' => null,
            'user_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
