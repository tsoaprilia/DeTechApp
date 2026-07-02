<?php

namespace App\Http\Controllers\Dokter; // TAMBAHKAN \Dokter DI SINI

use App\Http\Controllers\Controller; // WAJIB ADA karena kita pindah folder
use App\Models\User;
use App\Models\Patient;
use App\Models\Radiograph;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $today = Carbon::today();

        $waitingQuery = Radiograph::where('status', 'waiting');
        $verifiedByDoctorQuery = Radiograph::where('id_dokter', $user->id)
            ->where('status', 'verified');
        
        // Data khusus dokter (Antrean & Selesai)
        $antrean = Radiograph::with('patient.user')
            ->where('status', 'waiting')
            ->orderBy('created_at', 'desc')
            ->take(5)->get()->map(fn($rad) => [
                'id' => $rad->id_radiograph,
                'name' => $rad->patient?->user?->name ?? 'Pasien',
                'initials' => $this->initials($rad->patient?->user?->name ?? 'Pasien'),
                'time' => $rad->created_at->diffForHumans(),
                'date' => $rad->created_at->format('d/m/Y H:i'),
            ]);

        $selesai = Radiograph::with('patient.user')
            ->where('id_dokter', $user->id)
            ->where('status', 'verified')
            ->orderBy('updated_at', 'desc')
            ->take(5)->get()->map(fn($rad) => [
                'id' => $rad->id_radiograph,
                'name' => $rad->patient?->user?->name ?? 'Pasien',
                'initials' => $this->initials($rad->patient?->user?->name ?? 'Pasien'),
                'date' => $rad->updated_at->format('d/m/Y'),
            ]);

        return Inertia::render('Dokter/Dashboard', [
            'stats' => [
                'pasienSaya' => (clone $verifiedByDoctorQuery)->distinct('patient_nik')->count('patient_nik'),
                'perluVerifikasi' => (clone $waitingQuery)->count(),
                'perluVerifikasiHariIni' => (clone $waitingQuery)->whereDate('created_at', $today)->count(),
                'totalVerifikasi' => (clone $verifiedByDoctorQuery)->count(),
                'totalDeteksi' => Radiograph::count(),
            ],
            'antrean' => $antrean,
            'selesai' => $selesai
        ]);
    }

    private function initials(string $name): string
    {
        return collect(explode(' ', trim($name)))
            ->filter()
            ->map(fn ($part) => mb_substr($part, 0, 1))
            ->take(2)
            ->implode('');
    }
}
