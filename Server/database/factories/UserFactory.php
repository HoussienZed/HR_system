<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = User::class;

    public function definition(): array
    {
        return [
            'department_id' => \App\Models\Department::factory(),
            'position_id' => \App\Models\Position::factory(),
            'medical_plan_id' => \App\Models\MedicalPlan::factory(),
            'full_name' => $this->faker->name,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'user_type' => $this->faker->randomElement(['employee', 'HR']),
            'status' => $this->faker->randomElement(['active', 'terminated']),
            'location' => $this->faker->randomElement(['remote', 'onSite']),
            'bank_account' => $this->faker->bankAccountNumber,
            'nssf_contribution' => $this->faker->boolean,
        ];
    }
}
