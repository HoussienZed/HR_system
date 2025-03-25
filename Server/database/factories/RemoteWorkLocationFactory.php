<?php

namespace Database\Factories;

use App\Models\RemoteWorkLocation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RemoteWorkLocation>
 */
class RemoteWorkLocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = RemoteWorkLocation::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];
    }
}
