<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('position_id')->nullable()->constrained('positions')->onDelete('set null');
            $table->foreignId('medical_plan_id')->nullable()->constrained('medical_plans')->onDelete('set null');
            $table->string('full_name', 255);
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->enum('type', ['employee', 'HR']);
            $table->enum('status', ['active', 'terminated'])->default('active');
            $table->enum('location', ['remote', 'onSite']);
            $table->string('bank_account', 255)->nullable();
            $table->boolean('nssf_contribution')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
