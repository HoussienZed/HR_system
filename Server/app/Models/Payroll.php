<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    /** @use HasFactory<\Database\Factories\PayrollFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'net_salary', 'tax_deducted'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
