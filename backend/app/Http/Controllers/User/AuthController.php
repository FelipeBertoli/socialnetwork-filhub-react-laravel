<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller {
    function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ], [
            'email.required' => 'E-mail é obrigatório.',
            'password.required' => 'Senha é obrigatória.'
        ]);


        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['errors' => [
                'email' => 'O email informado é inválido.',
                'password' => 'A senha informada é inválida.'
            ]], 422);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return ['message' => 'Deslogado'];
    }
}


