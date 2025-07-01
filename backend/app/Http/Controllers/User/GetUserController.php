<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GetUserController extends Controller {

    function getUser(Request $request) {
        $user = $request->user()->load('course');
        return response($user);
    }

    function getUserById(Request $request) {
        $user = User::with('course')->findOrFail($request->id);
        return response($user);
    }
}

