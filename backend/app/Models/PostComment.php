<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    protected $table = 'post_comments';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'user_id',
        'post_id',
        'content',
        'send_time',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function likes() {
        return $this->hasMany(CommentLike::class, 'comment_id');
    }
    
    public function replies() {
        return $this->hasMany(CommentReply::class, 'comment_id');
    }
    
    public function getFormattedSendTimeAttribute()
    {
        $sendTime = Carbon::parse($this->send_time);
        $now = Carbon::now();
        $diffInMinutes = round($sendTime->diffInMinutes($now));
        $diffInHours = round($sendTime->diffInHours($now));
        $diffInDays = round($sendTime->diffInDays($now));
        $diffInMonths = round($sendTime->diffInMonths($now));
        $diffInYears = round($sendTime->diffInYears($now));

        if ($diffInMinutes < 3) {
            return 'Agora Mesmo';
        } elseif ($diffInMinutes < 60) {
            return $diffInMinutes . ' min';
        } elseif ($diffInHours < 24) {
            return $diffInHours . ' hr';
        } elseif ($diffInDays < 30) {
            return $diffInDays . ' d';
        } elseif ($diffInMonths < 12) {
            return $diffInMonths . ' m';
        } else {
            return $diffInYears . ' anos';
        }
    }
}
