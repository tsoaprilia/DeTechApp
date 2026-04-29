<?php

namespace App\Http\Controllers\Radiografer;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Radiograph;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Statistik Khusus Radiografer
        $stats = [
            'totalPasien' => Patient::count(),
            'deteksiHariIni' => Radiograph::whereDate('created_at', Carbon::today())->count(),
            'totalDeteksi' => Radiograph::count(),
            'deteksiMenunggu' => Radiograph::where('status', 'waiting')->count(),
        ];

        // 2. Pasien Terbaru (Sesuai ActivitySection)
        $pasienTerbaru = Patient::with('user')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get()
            ->map(function($p) {
                return [
                    'name' => $p->user->name,
                    'detail' => $p->age . ' Tahun',
                    'initials' => strtoupper(substr($p->user->name, 0, 2)),
                    'date' => $p->created_at->format('d/m/Y'),
                    'type' => 'patient'
                ];
            });

        // 3. Deteksi Selesai (Sesuai ActivitySection)
        $deteksiSelesai = Radiograph::with(['patient.user'])
            ->withCount('detections')
            ->where('status', 'verified')
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get()
            ->map(function($rad) {
                return [
                    'name' => $rad->patient->user->name,
                    'detail' => $rad->detections_count . ' gigi susu terdeteksi',
                    'initials' => strtoupper(substr($rad->patient->user->name, 0, 2)),
                    'date' => $rad->updated_at->format('d/m/Y'),
                    'type' => 'detection'
                ];
            });

        return Inertia::render('Radiografer/Dashboard', [
            'stats' => $stats,
            'pasienTerbaru' => $pasienTerbaru,
            'deteksiSelesai' => $deteksiSelesai
        ]);
    }
}