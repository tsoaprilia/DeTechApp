<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Radiograph;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function index()
    {
        // Ambil data radiografi dengan relasi pasien dan hitung jumlah deteksi gigi
        $radiographs = Radiograph::with(['patient.user'])
            ->withCount('detections')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/RiwayatDeteksi', [
            'radiographs' => $radiographs
        ]);
    }

    public function destroy($id)
    {
        $radiograph = Radiograph::findOrFail($id);
        
        // Hapus file gambar di storage jika perlu
        // Storage::disk('public')->delete($radiograph->image);
        
        $radiograph->delete();

        return redirect()->back()->with('success', 'Riwayat berhasil dihapus.');
    }
}