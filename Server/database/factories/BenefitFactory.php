<?php

namespace Database\Factories;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Benefit>
 */
class BenefitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Benefit::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'experience_bonus' => $this->faker->randomFloat(2, 500, 5000),
            'special_allowance' => $this->faker->randomFloat(2, 100, 2000),
            'appraisal' => $this->faker->randomFloat(2, 500, 5000),
        ];
    }
}
