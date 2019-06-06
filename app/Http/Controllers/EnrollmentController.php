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
          $courseInf = DB::table("course")->select("title","cover_image")->
          where('id',$id)->first();
          return response()->json(["cover_image"=>$courseInf->cover_image,
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
   public function enrollcontent(Request $request)
   {
     $this->validate($request,['content_id'=>"bail|required|integer"]);
     $content_id  = $request->input("content_id");
        $data = ["content_id"=>$content_id,"user_id"=>
     Auth::id()];
        DB::table('user_content')->insert($data);
        $message = ["watched"=>$content_id,"auth"=>Auth::check(),
        "message"=>"content have been watchded","status"=>"success"];
        return response()->json($message,200);
   }
}
