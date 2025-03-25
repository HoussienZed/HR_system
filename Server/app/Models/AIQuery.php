<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIQuery extends Model
{
    /** @use HasFactory<\Database\Factories\AIQueryFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'query_text', 'response_text'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
