<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DokterController extends Controller
{
    /**
     * Menampilkan daftar dokter.
     */
    public function index()
    {
        $dokters = User::where('role', 'dokter')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Dokter', [
            'dokters' => $dokters
        ]);
    }

    /**
     * Menyimpan data dokter baru.
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
            'password' => Hash::make($request->password),
            'role' => 'dokter',
        ]);

        return redirect()->route('admin.dokter.index')
            ->with('message', 'Data Dokter berhasil ditambahkan');
    }

    /**
     * Memperbarui data dokter.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required', 'string', 'email', 'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone' => 'required|string|max:15',
            'password' => 'nullable|string|min:8',
        ]);

        $user->update($request->only('name', 'email', 'phone'));

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('admin.dokter.index')
            ->with('message', 'Data Dokter berhasil diperbarui');
    }

    /**
     * Menghapus data dokter.
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('admin.dokter.index')
            ->with('message', 'Data Dokter berhasil dihapus');
    }
}