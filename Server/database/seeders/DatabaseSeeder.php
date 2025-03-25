<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DepartmentSeeder::class,
            PositionSeeder::class,
            MedicalPlanSeeder::class,
            CourseSeeder::class,
            UserSeeder::class,
            UserCourseSeeder::class,
            PayrollSeeder::class,
            BenefitSeeder::class,
            ReviewSeeder::class,
            DocumentSeeder::class,
            LeaveRequestSeeder::class,
            LeaveBalanceSeeder::class,
            JobSeeder::class,
            CandidateSeeder::class,
            InterviewSeeder::class,
            OnboardingSeeder::class,
            OnboardingTaskSeeder::class,
            TaskSeeder::class,
            AttendanceSeeder::class,
            AIQuerySeeder::class,
            RemoteWorkLocationSeeder::class,
        ]);
    }
}
