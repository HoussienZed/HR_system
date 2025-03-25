<?php

namespace Database\Factories;

use App\Models\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Attendance::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'clock_in' => $this->faker->dateTimeThisMonth(),
            'clock_out' => $this->faker->dateTimeThisMonth(),
        ];
    }
}
