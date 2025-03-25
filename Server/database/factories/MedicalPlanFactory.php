<?php

namespace Database\Factories;

use App\Models\MedicalPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalPlan>
 */
class MedicalPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = MedicalPlan::class;

    public function definition(): array
    {
        return [
            'plan' => $this->faker->randomElement(['none', 'prime', 'classic', 'essential']),
            'yearly_cost' => $this->faker->randomElement(['0', '800', '1200', '1500']),
        ];
    }
}
