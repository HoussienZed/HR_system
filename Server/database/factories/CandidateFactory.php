<?php

namespace Database\Factories;

use App\Models\Candidate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidate>
 */
class CandidateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Candidate::class;

    public function definition(): array
    {
        return [
            'job_id' => \App\Models\Job::factory(),
            'full_name' => $this->faker->name,
            'email' => $this->faker->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'resume' => $this->faker->filePath(),
            'status' => $this->faker->randomElement(['pending', 'hired', 'rejected']),
        ];
    }
}
