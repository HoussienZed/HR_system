<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Job::class;

    public function definition(): array
    {
        return [
            'department_id' => \App\Models\Department::factory(),
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['open', 'closed']),
        ];
    }
}
