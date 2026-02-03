<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detection extends Model
{
    protected $primaryKey = 'id_detection';
    protected $fillable = ['id_radiograph', 'no_fdi', 'analysis'];
}
