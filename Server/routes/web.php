<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/', function () {
//     return redirect('/api/v1'); // Or some other meaningful response
// });

// Route::get('/', function () {
//     return response()->json('API is working', 200);
// });