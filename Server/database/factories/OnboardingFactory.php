<?php

namespace Database\Factories;

use App\Models\Onboarding;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Onboarding>
 */
class OnboardingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    protected $model = Onboarding::class;

    public function definition(): array
    {
        return [
            'candidate_id' => \App\Models\Candidate::factory(),
            'start_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['completed', 'in progress']),
        ];
    }
}
