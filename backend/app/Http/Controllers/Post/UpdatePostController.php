<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UpdatePostController extends Controller {


    public function updatePost(Request $request): Response {
        
        $post = Post::findOrFail($request->id);

        $request->validate([
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'description' => ['required', 'string', 'max:3000'],
        ]);

        $post->update([
            'course_id' => $request->course_id,
            'description' => $request->description,
        ]);

        $response = [
            'post' => $post
        ];

        return response($response, 201);
    }

}
