<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SolverController;
use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;

Route::get('/' , function(){
    return redirect()->route('index');
});


Route::get('/allTables' , [HomeController::class , 'index'])->name('index');
Route::get('/solve_table/{table}' , [HomeController::class , 'solve_table'])->name('solve_table');
Route::get('/solvers' , [SolverController::class , 'index'])->name('solvers.index');
Route::post('/solvers' , [SolverController::class , 'store'])->name('solvers.store');

Route::middleware('auth')->group(function (){
    Route::resource('tables', TableController::class)->except('show');
});
