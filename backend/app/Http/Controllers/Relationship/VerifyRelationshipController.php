<?php

namespace App\Http\Controllers\Relationship;

use App\Http\Controllers\Controller;
use App\Models\Relationship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerifyRelationshipController extends Controller
{

    function verifyFollowership(Request $request)
    {

        $followerId = $request->input('follower_id');
        $followedId = $request->input('followed_id');

        $isFollowing = Relationship::where('user_id', $followerId)
            ->where('related_id', $followedId)
            ->exists();

        if($isFollowing) {
            return response()->json(['message' => 'Usuário é seguido'], 200);
        } else {
            return response()->json(['message' => 'Usuário não é seguido'], 200);
        }

    }

}
