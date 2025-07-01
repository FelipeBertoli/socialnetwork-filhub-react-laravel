<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowedCourse extends Model
{

    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'type',
        'user_id',
        'course_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
