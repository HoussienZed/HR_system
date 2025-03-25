<?php

namespace Database\Factories;

use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Position::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->randomElement(['assistant', 'officer', 'coordinator', 'manager']),
            'base_salary' => $this->faker->randomFloat(2, 3000, 10000),
            'yearly_leave' => $this->faker->numberBetween(10, 30),
        ];
    }
}
