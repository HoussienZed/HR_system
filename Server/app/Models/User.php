<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'department_id',
        'position_id',
        'medical_plan_id',
        'full_name',
        'gender',
        'email',
        'password',
        'type',
        'status',
        'location',
        'bank_account',
        'nssf_contribution',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'nssf_contribution' => 'boolean',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function medical_plan()
    {
        return $this->belongsTo(MedicalPlan::class);
    }

    //there is a many to many relation between users and courses through the junction table user_courses
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'user_courses')->withTimestamps();
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function benefits()
    {
        return $this->hasMany(Benefit::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function leaveBalances()
    {
        return $this->hasMany(LeaveBalance::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
    public function remoteWorkLocations()
    {
        return $this->hasMany(RemoteWorkLocation::class);
    }
    public function givenReviews()
    {
        return $this->hasMany(Review::class);
    }

    public function ai_queries()
    {
        return $this->hasMany(AIQuery::class);
    }
}
