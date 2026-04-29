<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Radiograph;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    // App/Http/Controllers/Admin/RiwayatController.php

public function index()
{
    // Ambil data radiografi dan hitung jumlah deteksi gigi yang valid
    $radiographs = Radiograph::with(['patient.user', 'detections']) // Tambahkan 'detections'
        ->withCount('detections') 
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Admin/RiwayatDeteksi', [
        'radiographs' => $radiographs
    ]);
}

   public function destroy($id) 
{
    // Cari data berdasarkan ID string RAD-XXXX
    $radiograph = Radiograph::where('id_radiograph', $id)->firstOrFail();
    
    // Eksekusi hapus
    $radiograph->delete();

    // JANGAN PAKAI back(), gunakan route() agar arah redirect JELAS dan tidak 404
    return redirect()->route('admin.riwayat')->with('success', 'Riwayat berhasil dihapus.');
}
}