<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Task::class;

    public function definition(): array
    {

        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['to do', 'in progress', 'completed']),
        ];
    }
}
