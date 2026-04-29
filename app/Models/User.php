<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function patientProfile()
{
    return $this->hasOne(Patient::class, 'user_id', 'id');
}

public function radiographsAsDokter()
{
    // Menghubungkan User ID ke kolom id_dokter di tabel radiographs
    return $this->hasMany(\App\Models\Radiograph::class, 'id_dokter');
}

/**
 * Relasi untuk menghitung aktifitas Radiografer
 */
public function radiographsAsRadiografer()
{
    // Menghubungkan User ID ke kolom id_radiografer di tabel radiographs
    return $this->hasMany(\App\Models\Radiograph::class, 'id_radiografer');
}
}
