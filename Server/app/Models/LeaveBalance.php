<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveBalance extends Model
{
    /** @use HasFactory<\Database\Factories\LeaveBalanceFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'leave_type', 'days_available'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
