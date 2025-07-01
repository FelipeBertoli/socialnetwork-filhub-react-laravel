<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\FollowedCourse;
use Illuminate\Http\Request;


class FollowCourseController extends Controller {

    function followCourse(Request $request) {
        
        $userId = $request->input('user_id');
        $courseId = $request->input('course_id');

        $existingFollowedCourse = FollowedCourse::where('user_id', $userId)
                                            ->where('course_id', $courseId)
                                            ->first();

        if ($existingFollowedCourse) {
            return response()->json(['message' => 'O curso já está sendo seguido'], 400);
        }

        $followedCourse = FollowedCourse::create([
            'user_id' => $userId,
            'course_id' => $courseId,
        ]);

        if($followedCourse) {
            return response()->json(['message' => 'O curso foi seguido com sucesso', 200]);
        } else {
            return response()->json(['message' => 'Houve um problema ao seguir o curso', 500]);
        }

    }

}
