<?php

namespace Database\Factories;

use App\Models\LeaveRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeaveRequest>
 */
class LeaveRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = LeaveRequest::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'leave_type' => $this->faker->randomElement(['annual', 'sick', 'unpaid', 'maternity', 'paternity']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'reason' => $this->faker->paragraph,
        ];
    }
}
