<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = ['title', 'description', 'pdf_url', 'course_category'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_courses')->withTimestamps();
    }
}
