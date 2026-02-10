<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DetectionController;
use App\Http\Controllers\Admin\RadiograferController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\DokterController;
use App\Http\Controllers\Admin\RiwayatController;


// 1. Halaman Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 2. Route yang membutuhkan Login (Auth)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // --- REDIRECTOR DASHBOARD UTAMA ---
    // Logika ini akan mengarahkan user ke URL yang tepat berdasarkan role saat mereka akses /dashboard
    Route::get('/dashboard', function () {
        $role = auth()->user()->role;
        return match($role) {
            'admin'       => redirect()->route('admin.dashboard'),
            'radiografer' => redirect()->route('radiografer.dashboard'),
            'dokter'      => redirect()->route('dokter.dashboard'),
            default       => Inertia::render('Dashboard'), // Untuk role Pasien
        };
    })->name('dashboard');

        // --- AREA ADMIN ---

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('dashboard');
    
    // Rute Deteksi
    Route::get('/deteksi', [DetectionController::class, 'index'])->name('deteksi');
    Route::post('/deteksi/store', [DetectionController::class, 'store'])->name('deteksi.store');
    Route::get('/deteksi/detail/{id}', [DetectionController::class, 'show'])->name('deteksi.detail');
    Route::post('/deteksi/analyze/{id}', [DetectionController::class, 'analyze'])->name('deteksi.analyze');
    Route::post('/deteksi/finalize/{id}', [DetectionController::class, 'finalize'])->name('deteksi.finalize');

    Route::resource('radiografer', RadiograferController::class);
    Route::resource('pasien', PasienController::class);

    // PERBAIKAN: Hapus awalan 'admin.' pada name() karena sudah ada di grup
    Route::get('/pasien/{nik}/riwayat', [PasienController::class, 'riwayat'])->name('pasien.riwayat');

    Route::resource('dokter', DokterController::class);
    Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat');
    Route::delete('/riwayat/{id}', [RiwayatController::class, 'destroy'])->name('riwayat.destroy');
});
    // --- AREA RADIOGRAFER ---
    Route::middleware('role:radiografer')->prefix('radiografer')->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('Radiografer/Dashboard'))->name('radiografer.dashboard');
    });

    // --- AREA DOKTER ---
    Route::middleware('role:dokter')->prefix('dokter')->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('Dokter/Dashboard'))->name('dokter.dashboard');
        
    });

    // --- AREA PROFILE (Bisa diakses semua role) ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';