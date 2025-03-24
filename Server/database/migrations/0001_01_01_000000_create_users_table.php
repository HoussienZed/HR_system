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
            // $table->integer('department_id');
            // $table->integer('position_id');
            // $table->integer('medical_plan_id');
            $table->string('full_name', 255);
            // $table->enum('gender', ['male', 'female']);
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            // $table->enum('user_type', ['employee', 'HR']);
            // $table->enum('status', ['active', 'terminated'])->default('active');
            // $table->enum('location', ['remote', 'onSite']);
            // $table->string('bank_account', 255)->nullable();
            // $table->boolean('nssf_contribution')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
