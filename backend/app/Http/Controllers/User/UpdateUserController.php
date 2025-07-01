<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;

class UpdateUserController extends Controller {


    public function updateProfile(Request $request): Response {
        
        $user = User::findOrFail($request->id);

        $request->validate([
            'name' => ['nullable', 'string', 'max:20'],
            'surname' => ['nullable', 'string', 'max:35'],
            'title' => ['nullable', 'string', 'max:35'],
            'position' => ['nullable', 'string', 'max:20'],
            'gender' => ['nullable', 'string', 'max:15'],
            'birthday' => ['nullable', 'date'],
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['nullable', 'string', 'max:255'],
            'picture_path' => ['nullable', 'string']
        ]);

        $uploadedFileUrl = $user->picture_path;
        if ($request->picture_path != $user->picture_path) {
            if($request->picture_path == null) {
                $uploadedFileUrl = null;
            } else {
                $base64Image = $request->picture_path;
                $imageData = base64_decode($base64Image);
        
                $filename = $user->email . '.jpg';
                $path = 'public/user/' . $filename;
                Storage::put($path, $imageData);
       
                $uploadedFileUrl = 'https://filhub.unifil.tech' . Storage::url('user/' . $filename);
            }

        }

        $user->update([
            'name' => $request->name ?? $user->name,
            'surname' => $request->surname ?? $user->surname,
            'email' => $request->email ?? $user->email,
            'title' => $request->title ?? $user->title,
            'position' => $request->position ?? $user->position,
            'gender' => $request->gender ?? $user->gender,
            'birthday' => $request->birthday ?? $user->birthday,
            'course_id' => $request->course_id ?? $user->course_id,
            'description' => $request->description ?? $user->description,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'picture_path' =>  $uploadedFileUrl
        ]);

        $response = [
            'user' => $user
        ];

        return response($response, 200);
    }

    public function changeEmail($id, $email){

        $user = User::whereHas('tokens', function ($query) use ($id) {
            $query->where('tokenable_id', $id);
        })->first();
    
        if ($user) {
            $user->email = $email;
            $user->save();
    
            return response('E-mail alterado com sucesso!', 200);
        }
    
        return response('Token inválido ou expirado.', 400);
    }

    public function changePassword($id, $password){

        $user = User::whereHas('tokens', function ($query) use ($id) {
            $query->where('tokenable_id', $id);
        })->first();

        $hashPassword = Hash::make($password);
    
        if ($user) {
            $user->password = $hashPassword;
            $user->save();
    
            return response('Senha alterada com sucesso!', 200);
        }
    
        return response('Token inválido ou expirado.', 400);
    }

    function updatePassword(Request $request): Response {
        
        $user = User::findOrFail($request->id);

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        $response = [
            'user' => $user
        ];

        return response($response, 200);
    }

    /*Send Email*/
    function sendNewEmail(Request $request): Response {
        
        $user = User::findOrFail($request->id);

        $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email', 'max:55', 'unique:' . User::class],
        ]);

        $id = $user->id;

        $activationUrl = route('user.changeEmail', ['id' => $id, 'email' => $request->email]);
        Mail::send('emails.change-email', ['user' => $user, 'activationUrl' => $activationUrl, 'email' => $request->email], function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Filhub -  Alteração de E-mail');
        });

        $response = [
            'user' => $user
        ];

        return response($response, 200);
    }

    function sendNewPassword(Request $request): Response {

        $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);
        
        $user = User::where('email', $request->email)->first();

        if($user) {
            $id = $user->id;

            $password =  Str::random(10);
    
            $activationUrl = route('user.changePassword', ['id' => $id, 'password' => $password]);
            Mail::send('emails.change-password', ['user' => $user, 'activationUrl' => $activationUrl, 'password' => $password], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Filhub -  Alteração de Senha');
            });
    
            $response = [
                'user' => $user
            ];
    
            return response($response, 200);
        }

        else {
            return response([
                'status' => 'error',
                'message' => 'E-mail não existe',
            ], 404);
        }

    }


}
