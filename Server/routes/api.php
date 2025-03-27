<?php

use App\Http\Controllers\AiQuery;
use App\Http\Controllers\AiQueryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\RemoteWorkLocationController;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Authorized Users (HR)
        Route::group(["prefix" => "HR", "middleware" => "isHR"], function () {
            // Route::get('/dashboard', [DashboardController::class, "dashboard"]);
        });

        //Authorized Users
        Route::group(["prefix" => "Employees"], function () {
            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);
            Route::post('/clockOut', [AttendanceController::class, "clockOut"]);
            Route::post('/addRemoteLocation', [RemoteWorkLocationController::class, "addRemoteLocation"]);
        });

        Route::post('/askGemini', [AiQueryController::class, "askGemini"]);
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"])->name('login');
    Route::post('/signup', [AuthController::class, "signup"])->name('signup');
});

// Route::post('/login', [AuthController::class, "login"])->name('login');
