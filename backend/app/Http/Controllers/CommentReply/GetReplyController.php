<?php

namespace App\Http\Controllers\CommentReply;

use App\Http\Controllers\Controller;
use App\Models\CommentReply;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class GetReplyController extends Controller {

    public function getReplies(Request $request) {

        $replies = CommentReply::where('comment_id', $request->commentId)
                ->with(['user:id,name,surname,picture_path'])
                ->get()
                ->map(function ($reply) {
                    return $this->formatReply($reply);
                });

        return response()->json([
            "message" => $replies->isEmpty() ? "Não foram encontradas respostas" : "Respostas encontradas",
            "replies" => $replies
        ]);
    }

    private function formatReply($reply) {
        $reply->formatted_send_time = Carbon::parse($reply->created_at)->diffForHumans();  
        return $reply;
    }
}

