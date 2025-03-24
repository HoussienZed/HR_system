<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'v1'], function(){
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Authorized Users (HR)
        Route::group(["prefix" => "HR"], function () {
            Route::group(["prefix" => ""], function () {

            });

        });

        //Unauthorized Users
        Route::group(["prefix" => "Employees"], function () {
            
        });

    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"])->name('login');
    Route::post('/signup', [AuthController::class, "signup"])->name('signup');

});

// Route::post('/login', [AuthController::class, "login"])->name('login');
