<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:20'],
            'surname' => ['required', 'string', 'max:35'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:55', 'unique:'.User::class],
            'title' => ['required', 'string', 'max:35'],
            'position' => ['required', 'string', 'max:20'],
            'gender' => ['required', 'string', 'max:15'],
            'birthday' => ['required', 'date'],
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['required', 'string', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'picture_path' => ['required', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'title' => $request->title,
            'position' => $request->position,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'course_id' => $request->course_id,
            'status' => 'Ativo', // Se você tiver um status padrão para novos usuários, pode definir aqui
            'description' => $request->description,
            'password' => Hash::make($request->password),
            'picture_path' => $request->picture_path,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
