<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class PasienController extends Controller
{
    public function index()
    {
        $patients = Patient::with('user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Pasien', [
            'patients' => $patients
        ]);
    }
 
public function riwayat($nik)
{
    $patient = Patient::with([
        'user', 
        'radiographs' => function($q) {
            $q->withCount('detections')
              ->with('dokter') // Memuat relasi dokter dari tabel radiographs
              ->orderBy('created_at', 'desc');
        }
    ])->where('nik', $nik)->firstOrFail();

    return Inertia::render('Admin/RiwayatDetailPasien', [
        'patient' => $patient
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|size:16|unique:patients,nik',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|digits_between:10,13',
            'birth_place' => 'required|string',
            'birth_date' => 'required', // Tetap divalidasi
            'address' => 'required|string',
            'gender' => 'required|in:male,female',
            'password' => 'required|min:8',
        ]);

        // FIXED: Memformat tanggal menggunakan Carbon
        $formattedBirthDate = Carbon::parse($request->birth_date)->format('Y-m-d');

        DB::transaction(function () use ($request, $formattedBirthDate) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => 'pasien',
            ]);

            Patient::create([
                'nik' => $request->nik,
                'user_id' => $user->id,
                'birth_place' => $request->birth_place,
                'birth_date' => $formattedBirthDate,
                'address' => $request->address,
                'age' => Carbon::parse($formattedBirthDate)->age,
                'gender' => $request->gender,
            ]);
        });

        return redirect()->route('admin.pasien.index')->with('message', 'Pasien berhasil didaftarkan');
    }

    public function update(Request $request, $nik)
    {
        $patient = Patient::where('nik', $nik)->firstOrFail();
        $user = $patient->user;

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'required|string|digits_between:10,13',
            'birth_place' => 'required|string',
            'birth_date' => 'required',
            'address' => 'required|string',
            'gender' => 'required|in:male,female',
        ]);

        // FIXED: Memformat tanggal menggunakan Carbon
        $formattedBirthDate = Carbon::parse($request->birth_date)->format('Y-m-d');

        DB::transaction(function () use ($request, $patient, $user, $formattedBirthDate) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if ($request->filled('password')) {
                $user->update(['password' => Hash::make($request->password)]);
            }

            $patient->update([
                'birth_place' => $request->birth_place,
                'birth_date' => $formattedBirthDate,
                'address' => $request->address,
                'age' => Carbon::parse($formattedBirthDate)->age,
                'gender' => $request->gender,
            ]);
        });

        return redirect()->route('admin.pasien.index')->with('message', 'Data pasien diperbarui');
    }

    public function destroy($nik)
    {
        $patient = Patient::where('nik', $nik)->firstOrFail();
        User::find($patient->user_id)->delete();
        return redirect()->route('admin.pasien.index')->with('message', 'Data pasien dihapus');
    }
}