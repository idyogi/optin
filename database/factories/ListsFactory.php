<?php

namespace Database\Factories;

use App\Models\Lists;
use Illuminate\Database\Eloquent\Factories\Factory;

class ListsFactory extends Factory
{
    protected $model = Lists::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid,
            'user_id' => \App\Models\User::factory(),
            'name' => $this->faker->name,
            'sort_order' => $this->faker->randomNumber(0),
        ];
    }
}
