<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalPlan extends Model
{
    /** @use HasFactory<\Database\Factories\MedicalPlanFactory> */
    use HasFactory;

    protected $fillable = ['plan', 'yearly_cost'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
