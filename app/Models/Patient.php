<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $primaryKey = 'nik'; // Memberitahu Laravel PK adalah NIK
    public $incrementing = false;  // NIK bukan angka auto-increment
    protected $keyType = 'string';

   protected $fillable = [
    'nik',
    'user_id',
    'birth_place', // Tambah ini
    'birth_date',  // Tambah ini
    'address',     // Tambah ini
    'age',
    'gender',
];

    // Relasi balik ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
