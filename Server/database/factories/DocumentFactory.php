<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Document::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'document_name' => $this->faker->word . '.pdf',
            'document_path' => $this->faker->filePath(),
            'type' => $this->faker->randomElement(['contract', 'certificate', 'id']),
        ];
    }
}
