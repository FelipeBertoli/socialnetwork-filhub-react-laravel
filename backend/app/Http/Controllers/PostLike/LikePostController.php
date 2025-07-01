<?php

namespace App\Http\Controllers\PostLike;

use App\Http\Controllers\Controller;
use App\Models\PostLike;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class LikePostController extends Controller {

    public function likePost(Request $request): Response {
    
        $like = PostLike::firstOrCreate([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
        ], [
            'like_time' => Carbon::now()
        ]);
        
        if (!$like->wasRecentlyCreated) {
            return response(["message" => "Você já curtiu esta publicação"], 409);
        }
        
        return response(["likeId" => $like->id, "message" => "Publicação curtida"], 201);
        
    }
    
}
