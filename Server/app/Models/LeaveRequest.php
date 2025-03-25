<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    /** @use HasFactory<\Database\Factories\LeaveRequestFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'leave_type', 'start_date', 'end_date', 'status', 'reason'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
