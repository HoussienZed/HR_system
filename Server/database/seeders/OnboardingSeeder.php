<?php

namespace Database\Seeders;

use App\Models\Onboarding;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OnboardingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Onboarding::factory(5)->create();
    }
}
