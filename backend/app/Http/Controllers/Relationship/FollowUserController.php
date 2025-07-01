<?php

namespace App\Http\Controllers\Relationship;

use App\Http\Controllers\Controller;
use App\Models\Relationship;
use Illuminate\Http\Request;

class FollowUserController extends Controller {

    function followUser(Request $request) {
        $followerId = $request->input('follower_id');
        $followedId = $request->input('followed_id');

        $existingRelationship = Relationship::where('user_id', $followerId)
                                            ->where('related_id', $followedId)
                                            ->first();

        if ($existingRelationship) {
            return response()->json(['message' => 'Already following'], 400);
        }

         Relationship::create([
            'user_id' => $followerId,
            'related_id' => $followedId,
            'type' => 'Following'
        ]);

        return response()->json(['message' => 'User followed successfully']);
    }

}
