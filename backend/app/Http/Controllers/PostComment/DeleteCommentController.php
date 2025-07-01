<?php

namespace App\Http\Controllers\PostComment;

use App\Http\Controllers\Controller;
use App\Models\PostComment;
use Illuminate\Http\Request;

class DeleteCommentController extends Controller {

    public function deleteComment(Request $request) {
        $commentId = $request->input('id');
    
        $post = PostComment::where('id', $commentId)
                ->first();
    
        if ($post) {
            $post->delete();
    
            return response()->json(['message' => 'Comentário excluído com sucesso', 204]);
        } else {
            return response()->json(['message' => 'Comentário não encontrado', 404]);
        }
    }

}
