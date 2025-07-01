<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FollowedCourse;
use Illuminate\Http\Request;

class GetCourseController extends Controller {

    function getFollowingCourses(Request $request){

        $userId = $request->input('user_id');

        $courses = Course::all();

        $courses = $courses->map(function($course) use ($userId) {
            $isFollowed = FollowedCourse::where('user_id', $userId)
                ->where('course_id', $course->id)
                ->exists();
        
            $course->follow_status = $isFollowed ? 'Seguido' : 'Não seguido';
            return $course;
        });
        
        return response()->json($courses);
    }

}

