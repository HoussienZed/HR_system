<?php

namespace Database\Factories;

use App\Models\LeaveBalance;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeaveBalance>
 */
class LeaveBalanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = LeaveBalance::class;
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'leave_type' => $this->faker->randomElement(['annual', 'sick', 'unpaid', 'maternity', 'paternity']),
            'balance' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}
