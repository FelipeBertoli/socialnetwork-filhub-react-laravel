<?php

namespace App\Http\Controllers\CommentLike;

use App\Http\Controllers\Controller;
use App\Models\CommentLike;
use Illuminate\Http\Request;

class GetCommentLikesController extends Controller {

    public function getLikesCount(Request $request) {
        $commentId = $request->input('id');
    
        if (is_null($commentId)) {
            return response()->json(['error' => 'É necessário o ID do comentário'], 400);
        }
    
        $likeCount = CommentLike::where('comment_id', $commentId)->count();
    
        return response()->json(['likeCount' => $likeCount, 'commentId' => $commentId]);
    }
    
}
