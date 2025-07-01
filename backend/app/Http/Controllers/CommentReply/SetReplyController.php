<?php

namespace App\Http\Controllers\CommentReply;

use App\Http\Controllers\Controller;
use App\Models\CommentReply;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class SetReplyController extends Controller {

    public function setReply(Request $request): Response {
        
        $request->validate([
            'user_id' => ['required', 'integer'],
            'comment_id' => ['required', 'integer'],
            'content' => ['required', 'string', 'max:250'],
        ]);
        
        $reply = CommentReply::create([
            'user_id' => $request->user_id,
            'comment_id' => $request->comment_id,
            'content' => $request->content,
            'send_time' => Carbon::now()
        ]);

        $replyId = $reply->id;

        return response(["replyId" => $replyId, "message" => "Comentário respondido"], 201);
    }
}
