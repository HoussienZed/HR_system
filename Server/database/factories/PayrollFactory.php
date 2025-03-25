<?php

namespace Database\Factories;

use App\Models\Payroll;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payroll>
 */
class PayrollFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Payroll::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'net_salary' => $this->faker->randomFloat(2, 3000, 10000),
            'tax_deducted' => $this->faker->randomFloat(2, 100, 1000),
        ];
    }
}
