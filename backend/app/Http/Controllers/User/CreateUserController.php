<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CreateUserController extends Controller {
    public function registerUser(Request $request): Response {
        $request->validate([
            'name' => ['required', 'string', 'regex:/^[a-zA-ZÀ-ÿ\s]+$/', 'max:30'],
            'surname' => ['required', 'string','regex:/^[a-zA-ZÀ-ÿ\s]+$/', 'max:60'],
            'email' => ['required', 'string', 'email', 'max:100', 'unique:' . User::class],
            'position' => ['nullable', 'string', 'max:40'],
            'gender' => ['required', 'string', 'max:15'],
            'birthday' => ['nullable', 'date', 'before_or_equal:' . now()->subYears(16)->format('d-m-Y')],
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'picture_path' => ['nullable', 'string'],
        ],
        [
            'name.required' => 'O nome é obrigatório.',
            'name.max' => 'O nome é muito grande.',
            'surname.required' => 'O sobrenome é obrigatório.',
            'surname.max' => 'O sobrenome é muito grande',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'O e-mail é inválido.',
            'email.unique' => 'O e-mail precisa seer único.',
            'email.max' => 'O e-mail é muito grande',
            'gender.required' => 'O gênero é obrigatório.',
            'birthday.required' => 'A data de aniversário é obrigatória.',
            'birthday.before_or_equal' => 'Você não tem idade suficiente.',
            'password.required' => 'A senha é obrigatória.',
            'name.regex' => 'O nome só pode conter letras e espaços.',
            'surname.regex' => 'O sobrenome só pode conter letras e espaços.',
            'description.max' => 'A descrição é muito longa.'
        ]);
    
        $title = $request->position;
        $courseName = '';

        if ($request->course_id) {
            $course = Course::find($request->input('course_id'));
            $courseName = $course ? $course->name : '';
            $title .= $course ? ' de ' . $courseName : '';
        }

        $uploadedFileUrl = null;
        if ($request->picture_path) {
	        $base64Image = $request->picture_path;
                $imageData = base64_decode($base64Image);

                $filename = $request->email  . '.jpg';
                $path = 'public/user/' . $filename;
                Storage::put($path, $imageData);

                $uploadedFileUrl = 'https://filhub.unifil.tech' . Storage::url('user/' . $filename);
            
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'title' => $title,
            'position' => $request->position,
            'gender' => $request->gender,
            'birthday' => $request->birthday,
            'course_id' => $request->course_id,
            'status' => 'Pendente',
            'description' => $request->description,
            'password' => Hash::make($request->password),
            'picture_path' => $uploadedFileUrl
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        Mail::send('emails.activate', [
            'user' => $user, 
            'activationUrl' => route('user.activate', ['id' => $user->id])
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Filhub - Confirme sua conta');
        });

        return response(['user' => $user, 'token' => $token], 201);
    }

    public function activateUser($id) {
        $user =  User::whereHas('tokens', fn($query) => $query->where('tokenable_id', $id))->first();

        if ($user) {
            $user->status = 'Ativo';
            $user->save();
            return response('Conta ativada com sucesso!', 200);
        }

        return response('Token inválido ou expirado.', 400);
    }

    private function uploadImage($base64Image) {
        $imageData = base64_decode($base64Image);
        $tempFilePath = sys_get_temp_dir() . '/' . Str::uuid()->toString() . '.jpg';
        file_put_contents($tempFilePath, $imageData);

        $uploadedFileUrl = Cloudinary::upload($tempFilePath)->getSecurePath();
        unlink($tempFilePath);

        return $uploadedFileUrl;
    }
}

