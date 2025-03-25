<?php

namespace Database\Factories;

use App\Models\Interview;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interview>
 */
class InterviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Interview::class;

    public function definition(): array
    {
        return [
            'candidate_id' => \App\Models\Candidate::factory(),
            'scheduled_date' => $this->faker->dateTime(),
            'feedback' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['completed', 'canceled']),
        ];
    }
}
