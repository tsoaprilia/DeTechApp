<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
            'email' => 'nullable|email|unique:users,email',
            'phone' => 'required|string|digits_between:10,13',
            'birth_place' => 'required|string',
            'birth_date' => 'required', // Tetap divalidasi
            'address' => 'required|string',
            'gender' => 'required|in:male,female',
            'password' => 'nullable|string|min:8',
        ]);

        // FIXED: Memformat tanggal menggunakan Carbon
        $formattedBirthDate = Carbon::parse($request->birth_date)->format('Y-m-d');

        DB::transaction(function () use ($request, $formattedBirthDate) {
            $email = $request->filled('email')
                ? $request->email
                : $request->nik . '@detech.id';

            $user = User::create([
                'name' => $request->name,
                'email' => $email,
                'phone' => $request->phone,
                'password' => Hash::make($request->filled('password') ? $request->password : 'password'),
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
            'email' => ['nullable', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'required|string|digits_between:10,13',
            'birth_place' => 'required|string',
            'birth_date' => 'required',
            'address' => 'required|string',
            'gender' => 'required|in:male,female',
            'password' => 'nullable|string|min:8',
        ]);

        // FIXED: Memformat tanggal menggunakan Carbon
        $formattedBirthDate = Carbon::parse($request->birth_date)->format('Y-m-d');

        DB::transaction(function () use ($request, $patient, $user, $formattedBirthDate) {
            $email = $request->filled('email')
                ? $request->email
                : $patient->nik . '@detech.id';

            $user->update([
                'name' => $request->name,
                'email' => $email,
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
        $patient = Patient::with('radiographs.detections')->where('nik', $nik)->firstOrFail();
        $userId = $patient->user_id;
        $filesToDelete = $this->collectRadiographFilesForDelete($patient);

        DB::transaction(function () use ($patient, $userId) {
            foreach ($patient->radiographs as $radiograph) {
                $radiograph->detections()->delete();
                $radiograph->delete();
            }

            $patient->delete();
            User::where('role', 'pasien')->find($userId)?->delete();
        });

        if (! empty($filesToDelete)) {
            Storage::disk('public')->delete($filesToDelete);
        }

        return redirect()->route('admin.pasien.index')->with('message', 'Data pasien dan seluruh riwayat pemeriksaannya berhasil dihapus');
    }

    private function collectRadiographFilesForDelete(Patient $patient): array
    {
        $files = [];
        $storage = Storage::disk('public');
        $radiographFiles = $storage->files('radiographs');

        foreach ($patient->radiographs as $radiograph) {
            $imagePath = ltrim(str_replace('\\', '/', (string) $radiograph->image), '/');

            if ($imagePath !== '') {
                $files[] = $imagePath;
            }

            $fileName = basename($imagePath);
            $baseName = pathinfo($fileName, PATHINFO_FILENAME);

            if ($fileName === '' || $baseName === '') {
                continue;
            }

            foreach ($radiographFiles as $storedFile) {
                $storedBaseName = basename($storedFile);
                $isResultImage = $storedBaseName === 'result_'.$fileName;
                $isCropImage = preg_match('/^crop_\d+_'.preg_quote($baseName, '/').'\.(jpg|jpeg|png)$/i', $storedBaseName);

                if ($isResultImage || $isCropImage) {
                    $files[] = $storedFile;
                }
            }
        }

        return array_values(array_unique($files));
    }
}
