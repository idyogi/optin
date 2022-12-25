<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\SubmissionsController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::get('/la', 'forceLoginAdmin');
    Route::post('/login', 'login');
    Route::any('/logout', 'logout')->name('logout');
});
Route::controller(FormsController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{slug}', [FormsController::class, 'show']);
    Route::get('/form/{slug}', [FormsController::class, 'show'])->name('form.show');
    Route::post('/form/{slug}/lead', [FormsController::class, 'lead'])->name('form.lead');
});
Route::controller(SubmissionsController::class)->group(function () {
    Route::post('/submission/{id}/whatsapp-rotator', [SubmissionsController::class, 'whatsappRotator'])->name('submissions.whatsapp-rotator');
});
Route::name('panel.')->prefix('panel')->middleware('auth')->group(function () {
    Route::resource('campaigns', CampaignsController::class);

    Route::post('forms/upload', [FormsController::class, 'upload'])->name('forms.upload');
    Route::resource('forms', FormsController::class);
    Route::get('forms/{uuid}/leads', [FormsController::class, 'leads'])->name('forms.leads');
    Route::get('forms/{uuid}/delete', [FormsController::class, 'delete'])->name('forms.delete');
    Route::post('forms/{uuid}/slug-change', [FormsController::class, 'changeSlug'])->name('forms.slug-change');
});