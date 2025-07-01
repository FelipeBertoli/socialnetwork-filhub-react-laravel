<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'surname',
        'email',
        'title',
        'position',
        'gender',
        'birthday',
        'course_id',
        'status',
        'description',
        'password',
        'picture_path'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function followers()
    {
        return $this->hasMany(Relationship::class);
    }

    public function followed()
    {
        return $this->hasMany(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function commentLikes()
    {
        return $this->hasMany(CommentLike::class);
    }

    public function commentReplies()
    {
        return $this->hasMany(CommentReply::class);
    }

    public function followedCourses()
    {
        return $this->hasMany(FollowedCourse::class);
    }

}
