<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Post extends Model
{
    protected $table = 'posts';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'type',
        'status',
        'send_time',
        'author_id',
        'course_id',
        'description',
        'media_path'
    ];
    
    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function likes() {
        return $this->hasMany(PostLike::class);
    }

    public function favorites()
    {
        return $this->hasMany(PostFavorite::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
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
