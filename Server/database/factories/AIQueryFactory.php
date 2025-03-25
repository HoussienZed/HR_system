<?php

namespace Database\Factories;

use App\Models\AIQuery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AIQuery>
 */
class AIQueryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = AIQuery::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'question' => $this->faker->sentence,
            'answer' => $this->faker->paragraph,
        ];
    }
}
