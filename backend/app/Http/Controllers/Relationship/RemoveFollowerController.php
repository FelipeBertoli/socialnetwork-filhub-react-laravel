<?php

namespace App\Http\Controllers\Relationship;

use App\Http\Controllers\Controller;
use App\Models\Relationship;
use Illuminate\Http\Request;

class RemoveFollowerController extends Controller
{
    public function removeFollower(Request $request) {
        $followerId = $request->input('follower_id');
        $followedId = $request->input('followed_id');
    
        $existingRelationship = Relationship::where('user_id', $followerId)
                                            ->where('related_id', $followedId)
                                            ->first();
    
        if ($existingRelationship) {
            $existingRelationship->delete();
    
            return response()->json(['message' => 'Seguidor removido com sucesso']);
        } else {
            return response()->json(['message' => 'Seguidor não encontrado', 'follower' => $followerId, 'followed' => $followedId], 404);
        }
    }
    
}
