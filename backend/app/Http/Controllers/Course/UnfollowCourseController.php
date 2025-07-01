<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\FollowedCourse;
use Illuminate\Http\Request;

class UnFollowCourseController extends Controller
{

    function unfollowCourse(Request $request)
    {

        $userId = $request->input('user_id');
        $courseId = $request->input('course_id');

        $course = FollowedCourse::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->first();

        if ($course) {
            $course->delete();
            return response()->json(['message' => 'Curso deixou de ser seguido']);
        } else {
            return response()->json(['message' => 'Curso não encontrado'], 404);
        }
    }

}
