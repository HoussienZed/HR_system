<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    /** @use HasFactory<\Database\Factories\InterviewFactory> */
    use HasFactory;

    protected $fillable = ['candidate_id', 'scheduled_date', 'feedback', 'status'];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
