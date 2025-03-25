<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory;

    protected $fillable = ['job_id', 'full_name', 'email', 'phone', 'resume', 'status'];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
