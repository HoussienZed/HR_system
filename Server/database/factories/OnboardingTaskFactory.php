<?php

namespace Database\Factories;

use App\Models\OnboardingTask;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OnboardingTask>
 */
class OnboardingTaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = OnboardingTask::class;

    public function definition(): array
    {
        return [
            'onboarding_id' => \App\Models\Onboarding::factory(),
            'title' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['pending', 'completed']),
        ];
    }
}
