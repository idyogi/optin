<?php

namespace Database\Factories;

use App\Models\submission;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class submissionFactory extends Factory
{
    protected $model = submission::class;

    public function definition(): array
    {
        return [
            'form_id' => $this->faker->randomNumber(),
            'serial_number' => $this->faker->randomNumber(),
            'response' => $this->faker->word(),
            'source_url' => $this->faker->url(),
            'user_id' => $this->faker->randomNumber(),
            'status' => $this->faker->word(),
            'is_favourite' => 0,
            'browser' => $this->faker->word(),
            'device' => $this->faker->word(),
            'ip' => $this->faker->ipv4(),
            'city' => $this->faker->city(),
            'country' => $this->faker->country(),
            'payment_status' => $this->faker->word(),
            'payment_method' => $this->faker->word(),
            'payment_type' => $this->faker->word(),
            'currency' => $this->faker->word(),
            'total_paid' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
