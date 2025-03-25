<?php

use App\Http\Controllers\LeaveRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Authorized Users (HR)
        Route::group(["prefix" => "HR"], function () {
            // Route::group(["prefix" => ""], function () {});

            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);
        });

        //Unauthorized Users
        Route::group(["prefix" => "Employees"], function () {
            Route::post('/leave-request', [LeaveRequestController::class, 'store']);
            Route::get('/leave-requests/user/{userId}', [LeaveRequestController::class, 'getUserLeaveRequests']);
        });
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"])->name('login');
    Route::post('/signup', [AuthController::class, "signup"])->name('signup');
});

// Route::post('/login', [AuthController::class, "login"])->name('login');
