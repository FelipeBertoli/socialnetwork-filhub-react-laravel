<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class DeletePostController extends Controller
{
    public function deletePost(Request $request) {
        $postId = $request->input('id');
    
        $post = Post::where('id', $postId)
                ->first();
    
        if ($post) {
            $post->delete();
    
            return response()->json(['message' => 'Postagem removida com sucesso', 204]);
        } else {
            return response()->json(['message' => 'Postagem não encontrado', 404]);
        }
    }
    
}
