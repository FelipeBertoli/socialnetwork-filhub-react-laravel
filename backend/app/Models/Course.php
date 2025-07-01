<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{

    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'name'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function followedCourses()
    {
        return $this->hasMany(FollowedCourse::class);
    }

}
