<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benefit extends Model
{
    /** @use HasFactory<\Database\Factories\BenefitFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'experience_bonus', 'special_allowance', 'appraisal'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
