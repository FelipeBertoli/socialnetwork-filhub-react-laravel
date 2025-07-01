<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\FollowedCourse;
use App\Models\Relationship;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GetPostController extends Controller
{
    private $limit = 6;

    public function getProfilePosts(Request $request)
    {
        $userId = $request->input('id');
        $authUserId = auth()->id();

        $posts = Post::where('author_id', $userId)
            ->orderBy('id', 'desc')
            ->with(['course'])
            ->get()
            ->map(function ($post) use ($authUserId) {
                return $this->formatPost($post, $authUserId);
            });

        return response()->json($posts);
    }

    public function getTimeLinePosts(Request $request)
    {
        $userId = $request->input('id');
        $authUserId = auth()->id();
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $this->limit;

        $followedIds =  Relationship::where('user_id', $userId)->pluck('related_id')->toArray();

        $followedCourseIds = FollowedCourse::where('user_id', $userId)->pluck('course_id')->toArray();

        $posts = Post::whereIn('author_id', $followedIds)
            ->orWhereIn('course_id', $followedCourseIds)
            ->with(['author:id,name,surname,picture_path,title', 'course'])
            ->latest('send_time')
            ->offset($offset)
            ->limit($this->limit)
            ->get()
            ->map(fn($post) => $this->formatPost($post, $authUserId));

        return response()->json([
            "message" => $posts->isEmpty() ? "Não foram encontradas postagens" : "Postagens encontradas",
            "posts" => $posts
        ]);
    }

    public function getCoursePosts(Request $request)
    {
        $courseId = $request->input('course_id');
        $authUserId = auth()->id();
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $this->limit;

        if (!$courseId) {
            return response()->json(["message" => "Course ID não fornecido", "posts" => []], 400);
        }

        $posts = Post::whereIn('course_id', (array) $courseId)
            ->orderBy('send_time', 'desc')
            ->offset($offset)
            ->limit($this->limit)
            ->with(['author', 'course'])
            ->get()
            ->map(function ($post) use ($authUserId) {
                return $this->formatPost($post, $authUserId);
            });

        return response()->json([
            "message" => $posts->isEmpty() ? "Não foram encontradas postagens" : "Postagens encontradas",
            "posts" => $posts
        ]);
    }

    public function getFavoritePosts(Request $request)
    {
        $authUserId = auth()->id();
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $this->limit;
    
        $posts = Post::whereHas('favorites', function($query) use ($authUserId) {
                $query->where('user_id', $authUserId);
            })
            ->orderBy('send_time', 'desc')
            ->offset($offset)
            ->limit($this->limit)
            ->with(['author', 'course', 'likes', 'favorites'])
            ->get()
            ->map(function ($post) use ($authUserId) {
                return $this->formatPost($post, $authUserId);
            });
    
        return response()->json([
            "message" => $posts->isEmpty() ? "Não foram encontradas postagens" : "Postagens encontradas",
            "posts" => $posts
        ]);
    }
    

    private function formatPost($post, $authUserId)
    {
        $post->formatted_send_time = $post->formatted_send_time;
        $post->isLiked = $post->likes()->where('user_id', $authUserId)->exists();
        $post->likeId = $post->likes()->where('post_id', $post->id)->where('user_id', $authUserId)->pluck('id')->first();
        $post->isFavorited = $post->favorites()->where('user_id', $authUserId)->exists();
        $post->favoriteId = $post->favorites()->where('post_id', $post->id)->where('user_id', $authUserId)->pluck('id')->first();
        return $post;
    }
}
