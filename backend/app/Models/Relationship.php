<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $table = 'relationship';

    protected $fillable = [
        'id',
        'user_id',
        'related_id',
        'type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function related() {
        return $this->belongsTo(User::class);
    }
}
