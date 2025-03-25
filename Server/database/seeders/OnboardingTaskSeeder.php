<?php

namespace Database\Seeders;

use App\Models\OnboardingTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OnboardingTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OnboardingTask::factory(5)->create();
    }
}
