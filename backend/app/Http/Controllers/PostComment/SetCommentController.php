<?php

namespace App\Http\Controllers\PostComment;

use App\Http\Controllers\Controller;
use App\Models\PostComment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SetCommentController extends Controller {

    public function setComment(Request $request) {
        
        $validatedData = $request->validate([
            'user_id' => ['required', 'integer'],
            'post_id' => ['required', 'integer'],
            'content' => ['required', 'string', 'max:500'],
        ]);

        $comment = PostComment::create(array_merge($validatedData, [
            'send_time' => Carbon::now()
        ]));

        return response()->json([
            'commentId' => $comment->id,
            'message' => 'Publicação comentada'
        ], 201);
    }
}
