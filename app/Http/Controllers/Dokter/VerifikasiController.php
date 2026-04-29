<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Radiograph;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function index()
    {
        // Hanya ambil yang statusnya 'waiting' (Belum diverifikasi)
        $antrean = Radiograph::with(['patient.user', 'radiografer'])
            ->where('status', 'waiting')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($rad) {
                return [
                    'id' => $rad->id_radiograph,
                    'patient_name' => $rad->patient->user->name,
                    'nik' => $rad->patient_nik,
                    'image' => $rad->image,
                    'date' => $rad->created_at->format('d/12/Y'), // Sesuaikan format tgl di gambar
                    'status' => 'Menunggu'
                ];
            });

        return Inertia::render('Dokter/Verifikasi', [
            'antrean' => $antrean
        ]);
    }
}