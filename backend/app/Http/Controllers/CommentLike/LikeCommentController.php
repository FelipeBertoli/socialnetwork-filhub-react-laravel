<?php

namespace App\Http\Controllers\CommentLike;

use App\Http\Controllers\Controller;
use App\Models\CommentLike;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class LikeCommentController extends Controller {
    public function likeComment(Request $request): Response {

        $like = CommentLike::firstOrCreate([
            'user_id' => $request->user_id,
            'comment_id' => $request->comment_id,
            'like_time' => Carbon::now()
        ]);
    
        if (!$like->wasRecentlyCreated) {
            return response(["message" => "Você já curtiu este comentário"], 409);
        }
    
        return response(["likeId" => $like->id, "message" => "Comentário curtido"], 201);
    }
    
}
