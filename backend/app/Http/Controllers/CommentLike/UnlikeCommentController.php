<?php

namespace App\Http\Controllers\CommentLike;

use App\Http\Controllers\Controller;
use App\Models\CommentLike;
use App\Models\PostLike;
use Illuminate\Http\Request;

class UnlikeCommentController extends Controller
{

    public function unlikeComment(Request $request)
    {

        $likeId = $request->input('id');

        $commentLike = CommentLike::where('id', $likeId)
            ->first();

        $commentLike->delete();
        return response()->json(['message' => 'Comentário descurtido']);
    }
}
