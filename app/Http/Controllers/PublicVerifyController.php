<?php

namespace App\Http\Controllers;

use App\Models\Radiograph;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PublicVerifyController extends Controller
{

    public function show($id)
{
    // Gunakan first() tanpa orFail agar kita bisa buat logika custom
    $radiograph = Radiograph::with(['patient.user', 'dokter'])
        ->where('id_radiograph', $id)
        ->first();

    return Inertia::render('VerifyResult', [
        'radiograph' => $radiograph, // Isinya null kalau ID salah
        'requested_id' => $id
    ]);
}
}