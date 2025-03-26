<?php

use App\Http\Controllers\LeaveBalanceController;
use App\Http\Controllers\LeaveRequestController;
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
        Route::group(["prefix" => "HR"], function () {
            // Route::group(["prefix" => ""], function () {});

            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);

            //leave request routes for HR
            Route::get('upcoming-leaves', [LeaveRequestController::class, 'getUpcomingLeaves']);
            Route::patch('/{id}/status', [LeaveRequestController::class, 'UpdateStatus']);

            //leave balance routes for HR
            Route::get('/all-balances', [LeaveBalanceController::class, 'getAllUsersLeaveBalances']);
            Route::get('/overall-balance', [LeaveBalanceController::class, 'getOverallTotalBalance']);
            Route::get('/total-type-balance', [LeaveBalanceController::class, 'getTotalBalanceByType']);
        });

        //Authorized Users
        Route::group(["prefix" => "Employees"], function () {
            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);
            Route::post('/clockOut', [AttendanceController::class, "clockOut"]);
            Route::post('/addRemoteLocation', [RemoteWorkLocationController::class, "addRemoteLocation"]);



            //leave reques routes for employee
            Route::post('/leave-request', [LeaveRequestController::class, 'store']);
            Route::get('/leave-requests/user/{userId}', [LeaveRequestController::class, 'getUserLeaveRequests']);

            //leave balance routes for employee
            Route::get('/user/{userId}', [LeaveBalanceController::class, 'getUserLeaveBalance']);
        });
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"])->name('login');
    Route::post('/signup', [AuthController::class, "signup"])->name('signup');
});

// Route::post('/login', [AuthController::class, "login"])->name('login');
