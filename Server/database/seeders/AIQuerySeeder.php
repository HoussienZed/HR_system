<?php

namespace Database\Seeders;

use App\Models\AIQuery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AIQuerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AIQuery::factory(10)->create();
    }
}
