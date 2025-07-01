<?php

namespace App\Http\Controllers\PostComment;

use App\Http\Controllers\Controller;
use App\Models\PostComment;
use Illuminate\Http\Request;

class GetCommentController extends Controller {

    public function getPostComments(Request $request) {
        $authUserId = auth()->id();

        $comments = PostComment::where('post_id', $request->postId)
        ->with(['user:id,name,surname,picture_path'])
        ->get()
        ->map(function ($comment) use ($authUserId) {
            return $this->formatComment($comment, $authUserId);
        });

        return response()->json([
            "message" => $comments->isEmpty() ? "Não foram encontradas comentários" : "Comentários encontrados",
            "comments" => $comments
        ]);
    }

    public function getCommentsCount(Request $request) {
        $postId = $request->input('id');
    
        $commentCount = PostComment::where('post_id', $postId)->count();
    
        return response()->json(['commentCount' => $commentCount, 'postId' => $postId]);
    }

    private function formatComment($comment, $authUserId)
    {
        $comment->formatted_send_time = $comment->formatted_send_time;
        $comment->isLiked = $comment->likes()->where('user_id', $authUserId)->exists();
        $comment->thereIsReplies = $comment->replies()->where('comment_id', $comment->id)->exists();
        $comment->likeId = $comment->likes()->where('comment_id', $comment->id)->where('user_id', $authUserId)->pluck('id')->first();
        return $comment;
    }
}
