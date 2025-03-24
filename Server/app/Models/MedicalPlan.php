<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalPlan extends Model
{
    /** @use HasFactory<\Database\Factories\MedicalPlanFactory> */
    use HasFactory;


    public function users()
    {
        return $this->hasMany(User::class);
    }
}
