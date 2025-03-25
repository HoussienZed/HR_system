<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemoteWorkLocation extends Model
{
    /** @use HasFactory<\Database\Factories\RemoteWorkLocationFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'latitude', 'longitude', 'address', 'approved'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
