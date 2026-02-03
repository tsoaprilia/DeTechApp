<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class RadiograferController extends Controller
{
    /**
     * Menampilkan daftar radiografer di halaman Radiografer.tsx
     */
    public function index()
    {
        // Mengambil data user dengan role 'radiografer'
        $radiografers = User::where('role', 'radiografer')
            ->orderBy('id', 'desc')
            ->get();

        // Merender halaman Radiografer.tsx di folder resources/js/Pages/Admin/
        return Inertia::render('Admin/Radiografer', [
            'radiografers' => $radiografers
        ]);
    }

    /**
     * Menyimpan data radiografer baru dari modal tambah
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password), // Enkripsi password
            'role' => 'radiografer', // Menandai user sebagai radiografer
        ]);

        // Redirect ke route index agar tabel ter-refresh
        return redirect()->route('admin.radiografer.index')
            ->with('message', 'Data Radiografer berhasil ditambahkan');
    }

    /**
     * Memperbarui data radiografer dari modal edit
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Abaikan email milik user ini sendiri
            ],
            'phone' => 'required|string|max:15',
            'password' => 'nullable|string|min:8', // Password opsional saat edit
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        // Update password hanya jika diisi oleh admin
        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('admin.radiografer.index')
            ->with('message', 'Data Radiografer berhasil diperbarui');
    }

    /**
     * Menghapus data radiografer
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.radiografer.index')
            ->with('message', 'Data Radiografer berhasil dihapus');
    }
}