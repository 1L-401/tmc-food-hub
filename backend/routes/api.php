<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OwnerAuthController;
use Illuminate\Support\Facades\Route;

// Public Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/send-otp', [AuthController::class, 'sendOtp'])->middleware('throttle:5,1');
Route::post('/verify-otp', [AuthController::class, 'verifyOtp'])->middleware('throttle:10,1');

// Owner Auth Routes
Route::post('/owner/login', [OwnerAuthController::class, 'login']);
Route::post('/owner/register', [OwnerAuthController::class, 'register']);

// Shared Authenticated Routes (mostly Customer)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});

// Dedicated Owner Routes
Route::middleware('auth:sanctum')->prefix('owner')->group(function () {
    Route::get('/user', [OwnerAuthController::class, 'user']);
    Route::put('/user', [OwnerAuthController::class, 'updateProfile']);
    Route::post('/logout', [OwnerAuthController::class, 'logout']);
});
