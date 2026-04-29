<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Radiograph;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $patient = Patient::where('user_id', $user->id)->first();

        // Data Dasar yang harus ada di setiap render
        $sharedData = [
            'auth' => [
                'user' => $user
            ]
        ];

        if (!$patient) {
            return Inertia::render('Dashboard', array_merge($sharedData, [
                'stats' => ['count_pemeriksaan' => 0],
                'radiographs' => [],
                'patient' => null
            ]));
        }

        $radiographs = Radiograph::with(['dokter'])
            ->withCount('detections')
            ->where('patient_nik', $patient->nik)
            ->latest()
            ->get();

        return Inertia::render('Dashboard', array_merge($sharedData, [
            'patient' => $patient,
            'radiographs' => $radiographs,
            'stats' => ['count_pemeriksaan' => $radiographs->count()]
        ]));
    }

    public function showDetail($id)
    {
        $radiograph = Radiograph::with(['detections', 'dokter', 'patient.user', 'radiografer'])
            ->where('id_radiograph', $id)
            ->firstOrFail();

        return Inertia::render('Pasien/DetailDeteksi', [
            'auth' => [
                'user' => auth()->user() // WAJIB ADA JUGA DI SINI
            ],
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