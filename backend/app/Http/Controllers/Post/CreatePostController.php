<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class CreatePostController extends Controller
{

    function createPost(Request $request)
    {

        $request->validate([
            'author_id' => ['required', 'integer', 'exists:courses,id'],
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['required', 'string', 'max:3000'],
            'media_path' => 'nullable|file|mimes:jpeg,png,jpg,gif,mov,avi,flv,wmv|max:10000'

        ], [
            'description.required' => 'A descrição da publicação é obrigatória.',
        ]);

        
        $fileUrl = null;

        if ($request->hasFile('media_path')) {
            $file = $request->file('media_path');
            
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
          
	    //$path = 'public/' . $filename;
	    //Storage::put($path, $file);   
            Storage::putFileAs('public', $file, $filename);  	    
	    $fileUrl = 'https://filhub.unifil.tech' . Storage::url($filename);
        }

        $post = Post::create([
            'type' => 'Post',
            'author_id' => $request->author_id,
            'course_id' => $request->course_id,
            'status' => 'Postado',
            'send_time' => Carbon::now(), 
            'description' => $request->description,
            'media_path' => $fileUrl

        ]);

        return response(["message" => "Publicação foi criada com sucesso", "post" => $post], 201);
    }
}
