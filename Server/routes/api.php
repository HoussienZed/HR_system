<?php

use App\Http\Controllers\LeaveBalanceController;
use App\Http\Controllers\LeaveRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Models\LeaveRequest;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Authorized Users (HR)
        Route::group(["prefix" => "HR"], function () {
            // Route::group(["prefix" => ""], function () {});

            Route::post('/clockIn', [AttendanceController::class, "clockIn"]);

            //leave request routes for HR
            Route::get('upcoming-leaves', [LeaveRequestController::class, 'getUpcomingLeaves']);
            Route::patch('/{id}/status', [LeaveRequestController::class, 'UpdateStatus']);

            //leave balance routes for HR
            Route::get('/all', [LeaveBalanceController::class, 'getAllUsersLeaveBalances']); // Get all users' leave balances
            Route::get('/totals', [LeaveBalanceController::class, 'getTotalBalanceByType']); // Get total balance per leave type
            Route::get('/overall', [LeaveBalanceController::class, 'getOverallTotalBalance']);
        });

        //Unauthorized Users
        Route::group(["prefix" => "Employees"], function () {



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
