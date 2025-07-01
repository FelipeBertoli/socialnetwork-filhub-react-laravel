<?php

namespace App\Http\Controllers\PostFavorite;

use App\Http\Controllers\Controller;
use App\Models\PostFavorite;
use Illuminate\Http\Request;

class UnfavoritePostController extends Controller {

    public function unfavoritePost(Request $request) {
    
        $favoriteId = $request->input('id');
        
        $postFavorite = PostFavorite::where('id', $favoriteId)
        ->first();

            $postFavorite->delete();
            return response()->json(['message' => 'Publicação desfavoritada']);
    }
}
