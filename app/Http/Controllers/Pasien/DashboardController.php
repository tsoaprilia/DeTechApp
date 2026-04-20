<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Radiograph;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf; // Import di bagian atas


class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $patient = Patient::where('user_id', $user->id)->first();

        if (!$patient) {
            return Inertia::render('Dashboard', [
                'stats' => ['count_pemeriksaan' => 0],
                'radiographs' => [],
                'patient' => null
            ]);
        }

        $radiographs = Radiograph::with(['dokter'])
            ->withCount('detections')
            ->where('patient_nik', $patient->nik)
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'patient' => $patient,
            'radiographs' => $radiographs,
            'stats' => ['count_pemeriksaan' => $radiographs->count()]
        ]);
    }

    // FUNGSI BARU UNTUK DETAIL PASIEN
    public function showDetail($id)
    {
        // Ambil data rontgen + relasi pendukungnya
        $radiograph = Radiograph::with(['detections', 'dokter', 'patient.user', 'radiografer'])
            ->where('id_radiograph', $id)
            ->firstOrFail();

        // Kirim ke folder Pasien/DetailDeteksi
        return Inertia::render('Pasien/DetailDeteksi', [
            'radiograph' => $radiograph
        ]);
    }

public function printPDF($id)
{
    $radiograph = Radiograph::with(['detections', 'dokter', 'patient.user'])
        ->where('id_radiograph', $id)
        ->firstOrFail();

    // Memuat view blade dan mengirim data
    $pdf = Pdf::loadView('pdf.hasil_deteksi', compact('radiograph'));

    // Download file dengan nama ID Radiografi
    return $pdf->download('Hasil_Deteksi_'.$radiograph->id_radiograph.'.pdf');
}
}