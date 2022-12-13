<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormsController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::get('/la', 'forceLoginAdmin');
    Route::post('/login', 'login');
    Route::any('/logout', 'logout')->name('logout');
});
Route::controller(FormsController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/form/{slug}', [FormsController::class, 'show'])->name('form.show');
    Route::post('/form/{slug}/lead', [FormsController::class, 'lead'])->name('form.lead');

});
Route::name('panel.')->prefix('panel')->middleware('auth')->group(function () {
    Route::post('/forms/upload', [FormsController::class, 'upload'])->name('forms.upload');
    Route::resource('forms', FormsController::class);
    Route::get('forms/{uuid}/leads', [FormsController::class, 'leads'])->name('forms.leads');

});
