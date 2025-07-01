<?php

namespace App\Http\Controllers\PostFavorite;

use App\Http\Controllers\Controller;
use App\Models\PostFavorite;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FavoritePostController extends Controller {

    public function favoritePost(Request $request): Response {
        
        $favorite =PostFavorite::firstOrCreate([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
        ]);

        $favoriteId = $favorite->id;

        return response(["favoriteId" => $favoriteId, "message" => "Publicação salva"], 201);
    }
}
