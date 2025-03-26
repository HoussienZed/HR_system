<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;

Route::group(['prefix' => 'v1'], function(){
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Authorized Users (HR)
        Route::group(["prefix" => "HR", "middleware" => "isHR"], function(){
            // Route::get('/dashboard', [DashboardController::class, "dashboard"]);
        });
        
        //Unauthorized Users
        Route::group(["prefix" => "Employees"], function () {
            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);
        });

    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"])->name('login');
    Route::post('/signup', [AuthController::class, "signup"])->name('signup');

});

// Route::post('/login', [AuthController::class, "login"])->name('login');
