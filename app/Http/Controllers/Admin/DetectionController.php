<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Radiograph;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http; // WAJIB ADA untuk konek ke Flask
use Inertia\Inertia;
use Carbon\Carbon;

class DetectionController extends Controller
{
    /**
     * Halaman Utama Deteksi - List Pasien
     */
    public function index()
    {
        $patients = Patient::with('user')->get();
        return Inertia::render('Admin/Deteksi', [
            'patients' => $patients
        ]);
    }

    /**
     * Proses Simpan Pasien & Upload Gambar
     */
    public function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:16',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            'gender' => 'required|in:male,female',
            'age' => 'required|numeric',
            'phone' => 'nullable|string|max:15',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'address' => 'required|string',
        ]);

        return DB::transaction(function () use ($request) {
            $patient = Patient::find($request->nik);

            if (!$patient) {
                // Buat User Baru jika Pasien Belum Ada
                $emailFinal = $request->email ?: $request->nik . '@detech.id';

                $user = User::create([
                    'name' => $request->name,
                    'email' => $emailFinal,
                    'password' => Hash::make('password'), 
                    'phone' => $request->phone,
                    'role' => 'pasien',
                ]);

                $formattedDate = Carbon::parse($request->birth_date)->format('Y-m-d');
                
                $patient = Patient::create([
                    'nik' => $request->nik,
                    'user_id' => $user->id,
                    'birth_place' => $request->birth_place,
                    'birth_date' => $formattedDate,
                    'address' => $request->address,
                    'age' => $request->age,
                    'gender' => $request->gender,
                ]);
            }

            // Simpan Gambar ke Storage
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('radiographs', 'public');
                
                // Generate ID RAD Otomatis
                $id_rad = 'RAD-' . date('dmy') . '-' . sprintf('%03d', Radiograph::count() + 1);

                Radiograph::create([
                    'id_radiograph' => $id_rad,
                    'patient_nik' => $patient->nik,
                    'image' => $path,
                    'status' => 'waiting',
                ]);

                // Redirect ke Halaman Detail
return redirect()->route('admin.deteksi.detail', $id_rad);            }

            return back()->withErrors(['image' => 'Gagal memproses gambar.']);
        });
    }

   public function show($id)
    {
        $radiograph = Radiograph::with(['patient.user', 'detections'])->findOrFail($id);
        return Inertia::render('Admin/DetailDeteksi', ['radiograph' => $radiograph]);
    }

    public function analyze($id)
    {
        $radiograph = Radiograph::findOrFail($id);
        $fullPath = str_replace('\\', '/', storage_path('app/public/' . $radiograph->image));

        try {
            $response = Http::timeout(120)->post('http://127.0.0.1:5000/predict', ['image_path' => $fullPath]);

            if ($response->successful()) {
                $data = $response->json();
                // Kirim ke session flash agar ditangkap Middleware
                session()->flash('temp_results', $data['results']);
                return redirect()->back();
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal konek ke Flask: ' . $e->getMessage()]);
        }
    }

    public function finalize(Request $request, $id)
    {
        $detections = $request->input('selected_detections');

        return DB::transaction(function () use ($detections, $id) {
            $radiograph = Radiograph::findOrFail($id);
            
            if ($detections) {
                foreach ($detections as $item) {
                    DB::table('detections')->insert([
                        'id_radiograph' => $id,
                        'no_fdi'        => $item['fdi'],
                        'analysis'      => $item['keterangan'] ?? null,
                        'created_at'    => now(),
                        'updated_at'    => now(),
                    ]);
                }
            }

            $radiograph->update(['status' => 'verified']);
            return redirect()->route('admin.deteksi.detail', $id)->with('success', 'Data diverifikasi.');
        });
    }
}