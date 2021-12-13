<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Course;

class enrollmentController extends Controller
{
   public function __construct()
   {
      $this->middleware('auth');
   }

   public function show(int $id){
      return view('enrollment.index');
   }
   public function getCourse(int $id){
         $course = DB::table("course_chapter")->
         select("course_chapter.id as chapter_id","chapter_title",
         "course_chapter_content.id as content_id",
         "course_chapter_content.title as content_title",
         "user_content.content_id as watched",
         "time_required_in_sec",'is_open_for_free',"video_url")
         ->join('course_chapter_content','course_chapter.id',
         '=','course_chapter_content.course_chapter_id')
         ->leftjoin("user_content",function($join){
            $join->on('user_content.content_id',
            '=','course_chapter_content.id')->
            where('user_content.user_id','=',Auth::id());
         })
         ->where('course_id',$id)
         ->orderBy('chapter_id')
         ->get();
          $courseInf = DB::table("course")->select("title",
          "description","cover_image")
          ->where('id',$id)->first();
          $instructor = DB::table("user")->select('id',
          'image as profile_image','first_name','last_name')
          ->rightjoin('instructor_course','instructor_id','user.id')
          ->where('instructor_course.course_id',$id)->first();

          return response()->json(["cover_image"=>$courseInf->cover_image,
          'instructor' =>$instructor,
          'description'=>$courseInf->description,
          "course_title"=>$courseInf->title,"chapters"=>$course],200);
   }
   public function getEnrolledCourses(){
      $course = DB::table("course")
      ->select("id","title","cover_image")
      ->leftjoin("user_content",function($join){
         $join->on('user_content.user_content.user_id',
         '=',Auth::id());
      })
      ->get();
      return response()->json($courses,200);
   }
   public function getRelatedCourse(int $id){
         $course = Course::find($id);
         $courses = DB::table("course")
         ->select("id","title","cover_image")
         ->where(['sub_subject_id'=>$course->sub_subject_id,
        ["id","<>",$id]])
         ->limit(3)
         ->get();
        return response()->json($courses,200);
   }
   public function getInstructor(int $courseId){
         $course = Course::find($id);
         $courses = DB::table("course")
         ->select("id","title","cover_image")
         ->where(['sub_subject_id'=>$course->sub_subject_id,
        ["id","<>",$id]])
         ->limit(3)
         ->get();
        return response()->json($courses,200);
   }
   public function enrollcontent(Request $request)
   {
     $this->validate($request,['content_id'=>"bail|required|integer",
  'course_id'=>"bail|required|integer"]);
     $user_id = Auth::id();
     $course_id = $request->input("course_id");
     $count = DB::table('course_chapter')
     ->join('course','course.id','course_chapter.course_id')
     ->join('course_chapter_content','course_chapter.id','course_chapter_id')
     ->join('user_content','course_chapter_content.id','user_content.content_id')
     ->where(["user_content.user_id"=>$user_id,'course_chapter.course_id'=>$course_id])
     ->count();
     if ($count==0) {
        DB::table('enrollment')
        ->insert(["user_id"=>$user_id,"course_id"=>$course_id]);
     }
     $instructor = DB::table('instructor_course')
     ->select('instructor_id as user_id')
     ->where('course_id',$request->input("course_id"))
     ->first();
     if ($user_id == $instructor->user_id) {
        return response()->json([],422);
     }
     $content_id  = $request->input("content_id");
        $data = ["content_id"=>$content_id,"user_id"=>
     Auth::id()];
        DB::table('user_content')->insert($data);
        $message = ["watched"=>$content_id,"auth"=>Auth::check(),
        "message"=>"content have been watchded","status"=>"success"];
        return response()->json($message,200);
   }
}
