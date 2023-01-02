<?php

namespace Database\Factories;

use App\Models\SendingServer;
use Illuminate\Database\Eloquent\Factories\Factory;

class SendingServerFactory extends Factory
{
    protected $model = SendingServer::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'number' => random_int(1000000000, 9999999999),
            'type' => $this->faker->randomElement(['selvi']),
            'webhook_url' => $this->faker->url,
            'api_key' => $this->faker->uuid,
            'status' => $this->faker->randomElement(['connected', 'disconnected']),
        ];
    }
}
