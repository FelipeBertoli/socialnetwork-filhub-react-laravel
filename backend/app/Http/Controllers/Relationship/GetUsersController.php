<?php

namespace App\Http\Controllers\Relationship;

use App\Http\Controllers\Controller;
use App\Models\Relationship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetUsersController extends Controller
{

    function getSuggestUsers(Request $request)
    {

        $userId = $request->input('id');

        $followers = DB::table('relationship')
            ->where('related_id', $userId)
            ->pluck('user_id');

        $following = DB::table('relationship')
            ->where('user_id', $userId)
            ->pluck('related_id');

        $pendentFollowers = DB::table('relationship')
            ->whereIn('user_id', $followers)
            ->whereNotIn('user_id', $following)
            ->pluck('user_id');


        $users = User::where('status', 'Ativo')
            ->whereNotIn('id', $following)
            ->whereNotIn('id', $pendentFollowers)
            ->where('id', '!=', $userId)
            ->get();

        return response($users);
    }

    function getPendentFollowers(Request $request)
    {
        $userId = $request->input('id');

        $followers = DB::table('relationship')
            ->where('related_id', $userId)
            ->pluck('user_id');

        $following = DB::table('relationship')
            ->where('user_id', $userId)
            ->pluck('related_id');


        $users = User::whereIn('id', $followers)
            ->whereNotIn('id', $following)
            ->where('status', 'Ativo')
            ->get();

        return response($users);
    }

    function getFollowers(Request $request)
    {
        $userId = $request->input('id');

        $followers = Relationship::join('users', 'users.id', '=', 'relationship.user_id')
            ->where('related_id', $userId)
            ->select('users.id', 'users.name', 'users.surname', 'users.title', 'users.picture_path')
            ->get();

        return response($followers);
    }

    function getFollowed(Request $request)
    {
        $userId = $request->input('id');

        $followers = Relationship::join('users', 'users.id', '=', 'relationship.related_id')
            ->where('user_id', $userId)
            ->select('users.id', 'users.name', 'users.surname', 'users.title', 'users.picture_path')
            ->get();

        return response($followers);
    }

    function getFollowersCount(Request $request)
    {
        $userId = $request->input('id');

        $followers = Relationship::join('users', 'users.id', '=', 'relationship.user_id')
            ->where('related_id', $userId)
            ->select('users.id', 'users.name', 'users.surname', 'users.title', 'users.picture_path')
            ->count();

        return response($followers);
    }

    function getFollowedCount(Request $request)
    {
        $userId = $request->input('id');

        $followers = Relationship::join('users', 'users.id', '=', 'relationship.related_id')
            ->where('user_id', $userId)
            ->select('users.id', 'users.name', 'users.surname', 'users.title', 'users.picture_path')
            ->count();

        return response($followers);
    }


    public function searchUsers(Request $request)
    {
        $query = $request->input('query');
        $userId = $request->input('id');

        $users = User::where('name', 'LIKE', "%{$query}%")
            ->orWhere('surname', 'LIKE', "%{$query}%")
            ->where('id', '!=', $userId)
            ->get();

        return response()->json($users);
    }
}
