<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeleteUserController extends Controller {

    function deleteUser(Request $request): Response {
        $user = User::findOrFail($request->id);

        $user->update([
            'email' => null,
            'status' => 'Deletado',
        ]);
        
        return response(['user' => $user], 200);
    }
}

