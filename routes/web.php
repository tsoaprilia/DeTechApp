<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Import Semua Controller
use App\Http\Controllers\Admin\DetectionController;
use App\Http\Controllers\Admin\RadiograferController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\DokterController;
use App\Http\Controllers\Admin\RiwayatController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard; 
use App\Http\Controllers\Pasien\DashboardController as PasienDashboard;
use App\Http\Controllers\Dokter\DashboardController as DokterDashboard;
use App\Http\Controllers\Radiografer\DashboardController as RadiograferDashboard;
use App\Http\Controllers\Dokter\VerifikasiController ;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // 1. REDIRECTOR UTAMA (Menentukan Dashboard mana yang dibuka pertama kali)
    Route::get('/dashboard', function () {
        $role = auth()->user()->role;
        return match($role) {
            'admin'       => redirect()->route('admin.dashboard'),
            'radiografer' => redirect()->route('radiografer.dashboard'),
            'dokter'      => redirect()->route('dokter.dashboard'),
            'pasien'      => redirect()->route('pasien.dashboard'),
            default       => redirect('/'),
        };
    })->name('dashboard');

    // 2. AREA KHUSUS PASIEN (Menggunakan folder Pasien/DashboardController)
    Route::middleware(['role:pasien'])->prefix('pasien')->name('pasien.')->group(function () {
        Route::get('/dashboard', [PasienDashboard::class, 'index'])->name('dashboard');
        Route::get('/deteksi/detail/{id}', [PasienDashboard::class, 'showDetail'])->name('deteksi.detail');
        Route::get('/deteksi/print/{id}', [PasienDashboard::class, 'printPDF'])->name('deteksi.print');
    });

    // 3. AREA SHARING MEDIS (Admin, Dokter, Radiografer, Pasien bisa akses Detail)
    // Gunakan middleware gabungan agar Pasien bisa melihat rute di prefix admin ini jika diperlukan
    Route::middleware(['role:admin,dokter,radiografer,pasien'])->prefix('admin')->name('admin.')->group(function () {
        
        // Fitur Deteksi Utama
        Route::get('/deteksi', [DetectionController::class, 'index'])->name('deteksi');
        Route::post('/deteksi/store', [DetectionController::class, 'store'])->name('deteksi.store');
        Route::get('/deteksi/detail/{id}', [DetectionController::class, 'show'])->name('deteksi.detail');
        Route::get('/deteksi/analyze/{id}', [DetectionController::class, 'analyze'])->name('deteksi.analyze');
        Route::post('/deteksi/finalize/{id}', [DetectionController::class, 'finalize'])->name('deteksi.finalize');

        // Manajemen Pasien & Riwayat
        Route::resource('pasien', PasienController::class);
        Route::get('/pasien/{nik}/riwayat', [PasienController::class, 'riwayat'])->name('pasien.riwayat');
        Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat');
        Route::delete('/riwayat/{id}', [RiwayatController::class, 'destroy'])->name('riwayat.destroy');
    });

    // 4. AREA EKSKLUSIF ADMIN (Manajemen User)
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('dashboard');    
        Route::resource('radiografer', RadiograferController::class);
        Route::resource('dokter', DokterController::class);
    });

    // 5. AREA EKSKLUSIF RADIOGRAFER
    Route::middleware(['role:radiografer'])->prefix('radiografer')->name('radiografer.')->group(function () {
        Route::get('/dashboard', [RadiograferDashboard::class, 'index'])->name('dashboard');
    });

    // 6. AREA EKSKLUSIF DOKTER
    Route::middleware(['role:dokter'])->prefix('dokter')->name('dokter.')->group(function () {
        Route::get('/dashboard', [DokterDashboard::class, 'index'])->name('dashboard');        

        Route::get('/tugas-verifikasi', [VerifikasiController::class, 'index'])->name('verifikasi.index');
    });

    // 7. PROFILE SETTINGS (Default Laravel Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';