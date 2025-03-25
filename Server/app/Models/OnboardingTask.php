<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingTask extends Model
{
    /** @use HasFactory<\Database\Factories\OnboardingTaskFactory> */
    use HasFactory;

    protected $fillable = [
        'onboarding_id',
        'title',
        'status',
    ];

    public function onboarding()
    {
        return $this->belongsTo(Onboarding::class);
    }
}
