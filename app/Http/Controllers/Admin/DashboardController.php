<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Patient;
use App\Models\Radiograph;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        
        // 1. Statistik Utama
        $stats = [
            'totalPasien' => Patient::count(),
            'totalDokter' => User::where('role', 'dokter')->count(),
            'totalRadiografer' => User::where('role', 'radiografer')->count(),
            'totalDeteksi' => Radiograph::count(),
            'pasienTrend' => '+' . Patient::whereMonth('created_at', $now->month)->count(),
            'deteksiTrend' => Radiograph::whereMonth('created_at', $now->month)->count() . ' Bln Ini',
        ];

        // 2. Data Grafik Mingguan (7 Hari Terakhir)
        $grafikMingguan = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $grafikMingguan[] = [
                'label' => $date->format('D'),
                'value' => Radiograph::whereDate('created_at', $date)->count()
            ];
        }

        // 3. Data Grafik Bulanan (Januari - Desember Tahun Ini)
        $grafikBulanan = [];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        foreach ($months as $key => $month) {
            $grafikBulanan[] = [
                'label' => $month,
                'value' => Radiograph::whereYear('created_at', $now->year)
                            ->whereMonth('created_at', $key + 1)
                            ->count()
            ];
        }

        // --- LOGIKA AKTIFITAS DOKTER (X/Y Verifikasi Data) ---
        $totalRadiograph = Radiograph::count(); // Ini adalah nilai Y (Total Semua Data)

        $aktifitasDokter = User::where('role', 'dokter')
            // Hitung hanya rontgen yang SUDAH diverifikasi oleh dokter ini (Nilai X)
            ->withCount(['radiographsAsDokter as verified_count' => function($query) {
                $query->where('status', 'verified');
            }])
            ->withCount(['radiographsAsDokter as verified_today_count' => function($query) use ($now) {
                $query->where('status', 'verified')
                    ->whereDate('updated_at', $now->toDateString());
            }])
            ->orderBy('verified_count', 'desc')
            ->take(4)
            ->get()
            ->map(function ($user) use ($totalRadiograph) {
                return [
                    'name' => $user->name,
                    // Format: "2/125 Verifikasi Data"
                    'detail' => $user->verified_count . '/' . $totalRadiograph . ' Verifikasi Data',
                    'todayDetail' => $user->verified_today_count . ' verifikasi hari ini',
                    'initials' => strtoupper(substr($user->name, 0, 2)),
                    'status' => $user->verified_today_count > 0 ? 'Aktif' : 'Tidak Aktif',
                ];
            });

        // --- LOGIKA AKTIFITAS RADIOGRAFER ---
        $aktifitasRadiografer = User::where('role', 'radiografer')
            ->withCount('radiographsAsRadiografer')
            ->withCount(['radiographsAsRadiografer as upload_today_count' => function($query) use ($now) {
                $query->whereDate('created_at', $now->toDateString());
            }])
            ->orderBy('radiographs_as_radiografer_count', 'desc')
            ->take(4)
            ->get()
            ->map(function ($user) {
                return [
                    'name' => $user->name,
                    'detail' => $user->radiographs_as_radiografer_count . ' Upload Data',
                    'todayDetail' => $user->upload_today_count . ' upload hari ini',
                    'initials' => strtoupper(substr($user->name, 0, 2)),
                    'status' => $user->upload_today_count > 0 ? 'Aktif' : 'Tidak Aktif',
                ];
            });

        // 4. Notifikasi Terbaru
        $notifications = Radiograph::with('patient.user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function($rad) {
                return [
                    'id' => $rad->id_radiograph,
                    'patient_name' => $rad->patient->user->name ?? 'Pasien Umum',
                    'time' => $rad->created_at->diffForHumans(),
                    'date' => $rad->created_at->format('d M'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'aktifitasDokter' => $aktifitasDokter,
            'aktifitasRadiografer' => $aktifitasRadiografer,
            'dataMingguan' => $grafikMingguan,
            'dataBulanan' => $grafikBulanan,
            'notifications' => $notifications
        ]);
    }
}
