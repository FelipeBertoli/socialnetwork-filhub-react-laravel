<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentLike extends Model
{
    protected $table = 'comment_likes';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'user_id',
        'comment_id',
        'like_time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comment() {
        return $this->belongsTo(PostComment::class, 'comment_id');
    }
    
}
