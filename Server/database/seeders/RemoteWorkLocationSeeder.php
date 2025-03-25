<?php

namespace Database\Seeders;

use App\Models\RemoteWorkLocation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RemoteWorkLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RemoteWorkLocation::factory(10)->create();
    }
}
