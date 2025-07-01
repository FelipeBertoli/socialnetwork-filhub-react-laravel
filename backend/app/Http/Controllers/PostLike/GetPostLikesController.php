<?php

namespace App\Http\Controllers\PostLike;

use App\Http\Controllers\Controller;
use App\Models\PostLike;
use Illuminate\Http\Request;

class GetPostLikesController extends Controller {

    public function getLikesCount(Request $request) {
        $postId = $request->input('id');
    
        if (is_null($postId)) {
            return response()->json(['error' => 'Post ID is required'], 400);
        }
    
        $likeCount = PostLike::where('post_id', $postId)->count();
    
        return response()->json(['likeCount' => $likeCount, 'postId' => $postId]);
    }
    
}
