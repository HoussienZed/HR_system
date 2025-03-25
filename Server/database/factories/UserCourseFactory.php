<?php

namespace Database\Factories;

use App\Models\UserCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserCourse>
 */
class UserCourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = UserCourse::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'course_id' => \App\Models\Course::factory(),
            'started_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'completed_at' => null,
            'certificate_issued_at' => null,
            'status' => 'started',
        ];
    }
}
