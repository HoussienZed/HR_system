<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Onboarding extends Model
{
    /** @use HasFactory<\Database\Factories\OnboardingFactory> */
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'start_date',
        'status',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function tasks()
    {
        return $this->hasMany(OnboardingTask::class);
    }
}
