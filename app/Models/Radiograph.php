<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Radiograph extends Model
{
    protected $primaryKey = 'id_radiograph';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id_radiograph', 'patient_nik', 'image', 'status'];

    public function patient() {
        return $this->belongsTo(Patient::class, 'patient_nik', 'nik');
    }

    public function detections() {
        return $this->hasMany(Detection::class, 'id_radiograph', 'id_radiograph');
    }
}
