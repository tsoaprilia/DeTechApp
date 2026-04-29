<?php

namespace App\Http\Controllers\Dokter; // TAMBAHKAN \Dokter DI SINI

use App\Http\Controllers\Controller; // WAJIB ADA karena kita pindah folder
use App\Models\User;
use App\Models\Patient;
use App\Models\Radiograph;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Data khusus dokter (Antrean & Selesai)
        $antrean = Radiograph::with('patient.user')
            ->where('status', 'waiting')
            ->orderBy('created_at', 'asc')
            ->take(5)->get()->map(fn($rad) => [
                'id' => $rad->id_radiograph,
                'name' => $rad->patient->user->name,
                'initials' => strtoupper(substr($rad->patient->user->name, 0, 2)),
                'time' => $rad->created_at->diffForHumans(),
            ]);

        $selesai = Radiograph::with('patient.user')
            ->where('id_dokter', $user->id)
            ->where('status', 'verified')
            ->orderBy('updated_at', 'desc')
            ->take(5)->get()->map(fn($rad) => [
                'name' => $rad->patient->user->name,
                'initials' => strtoupper(substr($rad->patient->user->name, 0, 2)),
                'date' => $rad->updated_at->format('d/m/Y'),
            ]);

        return Inertia::render('Dokter/Dashboard', [
            'stats' => [
                'pasienSaya' => Patient::whereHas('radiographs', fn($q) => $q->where('id_dokter', $user->id))->count(),
                'perluVerifikasi' => Radiograph::where('status', 'waiting')->count(),
                'totalVerifikasi' => Radiograph::where('id_dokter', $user->id)->where('status', 'verified')->count(),
                'totalDeteksi' => Radiograph::count(),
            ],
            'antrean' => $antrean,
            'selesai' => $selesai
        ]);
    }
}