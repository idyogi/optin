<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\ListsController;
use App\Http\Controllers\SendingServersController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SubmissionsController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::get('/la', 'forceLoginAdmin');
    Route::post('/login', 'login');
    Route::any('/logout', 'logout')->name('logout');
});
Route::controller(FormsController::class)->group(function () {
    Route::get('/{slug}', [FormsController::class, 'show']);
    Route::get('/form/{slug}', [FormsController::class, 'show'])->name('form.show');
    Route::post('/form/{slug}/lead', [FormsController::class, 'lead'])->name('form.lead');
});
Route::controller(SubmissionsController::class)->group(function () {
    Route::post('/submission/{id}/whatsapp-rotator', [SubmissionsController::class, 'whatsappRotator'])->name('submissions.whatsapp-rotator');
});
Route::name('panel.')->prefix('panel')->middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('campaigns', CampaignsController::class);
    Route::resource('devices', SendingServersController::class);
    //getQrCode from devices
    Route::post('/devices/{device}/qr', [SendingServersController::class, 'getQrCode'])->name('devices.qr');

    Route::get('/campaigns/{campaign}/delete', [CampaignsController::class, 'delete'])->name('campaigns.delete');
    Route::get('/campaigns/{campaign}/duplicate', [CampaignsController::class, 'duplicate'])->name('campaigns.duplicate');
    Route::resource('lists', ListsController::class);
    //post import from form leads
    Route::post('/lists/import', [ListsController::class, 'import'])->name('lists.import');
    Route::post('/lists/{list}/importFile', [ListsController::class, 'importFile'])->name('lists.importFile');
    Route::get('/lists/{list}/delete', [ListsController::class, 'delete'])->name('lists.delete');

    Route::post('forms/upload', [FormsController::class, 'upload'])->name('forms.upload');
    Route::resource('forms', FormsController::class);
    Route::get('forms/{uuid}/leads', [FormsController::class, 'leads'])->name('forms.leads');
    Route::get('forms/{uuid}/export', [FormsController::class, 'export'])->name('forms.export');
    Route::get('forms/{uuid}/duplicate', [FormsController::class, 'duplicate'])->name('forms.duplicate');
    Route::get('forms/{uuid}/delete', [FormsController::class, 'delete'])->name('forms.delete');
    Route::post('forms/{uuid}/slug-change', [FormsController::class, 'changeSlug'])->name('forms.slug-change');
    Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);
    Route::get('changelog', function () {
        return inertia('Panel/Changelog');
    });
    Route::get('fetch', [DashboardController::class, 'fetch']);
    Route::get('fetch30d', [DashboardController::class, 'fetch30d']);
    Route::get('fetchLastLeads', [DashboardController::class, 'fetchLastLeads']);
    Route::middleware('permission')->name('staff')->group(function () {
        Route::get('staff', [StaffController::class, 'index']);
        Route::get('staff/create', [StaffController::class, 'create']);
        Route::post('staff', [StaffController::class, 'store']);
        Route::get('staff/{user}/edit', [StaffController::class, 'edit']);
        Route::put('staff/{user}', [StaffController::class, 'update']);
        Route::delete('staff/{user}', [StaffController::class, 'destroy']);
    });


});