<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\FollowedCourse;
use Illuminate\Http\Request;

class VerifyFollowedCourseController extends Controller {

    function verifyFollowedCourse(Request $request){

        $userId = $request->input('user_id');
        $courseId = $request->input('course_id');

        $isFollowing = FollowedCourse::where('user_id', $userId)
                                            ->where('course_id', $courseId)
                                            ->exists();

        if($isFollowing) {
            return response()->json(['message' => 'Curso é seguido'], 200);
        } else {
            return response()->json(['message' => 'Curso não é seguido'], 200);
        }

    }

}
