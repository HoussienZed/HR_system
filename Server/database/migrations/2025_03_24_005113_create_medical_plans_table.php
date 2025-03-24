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
        Schema::create('medical_plans', function (Blueprint $table) {
            $table->id();
            $table->enum('plan', ['none', 'prime', 'classic', 'essential']);
            $table->enum('yearly_cost', ['0', '800', '1200', '1500']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_plans');
    }
};
