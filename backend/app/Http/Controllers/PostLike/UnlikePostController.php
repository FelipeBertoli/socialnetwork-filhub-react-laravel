<?php

namespace App\Http\Controllers\PostLike;

use App\Http\Controllers\Controller;
use App\Models\PostLike;
use Illuminate\Http\Request;

class UnlikePostController extends Controller {

    public function unlikePost(Request $request) {
    
        $postLike = PostLike::findOrFail($request->input('id'));

        if ($postLike->delete()) {
            return response()->json(['message' => 'Publicação descurtida'], 200);
        } else {
            return response()->json(['message' => 'Falha ao descurtir publicação'], 500);
        }

    }
}
