<?php

namespace App\Http\Controllers\CommentReply;

use App\Http\Controllers\Controller;
use App\Models\CommentReply;
use Illuminate\Http\Request;

class DeleteReplyController extends Controller {

    public function deleteReply(Request $request) {
        $replyId = $request->input('id');
    
        $reply= CommentReply::where('id', $replyId)
                ->first();
    
        if ($reply) {
            $reply->delete();
    
            return response()->json(['message' => 'Resposta excluída com sucesso', 204]);
        } else {
            return response()->json(['message' => 'Resposta não encontrada', 404]);
        }
    }

}
