<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Traits\ContentTrait as ContentTrait;

class CurriculumController extends Controller
{
   use ContentTrait;
   
   public function __construct (){
      $this->middleware('auth');
   }
   /**
    * get the curriculum of a given course
    * @var int $id
    */
   public function show(int $id){
         $course = DB::table("course_chapter")->
         select("course_chapter.id as chapter_id","chapter_title",
         "course_chapter_content.id as content_id","is_mandatory",
         "course_chapter_content.title as content_title",
         "time_required_in_sec",'is_open_for_free',"video_url")
         // "url as resource_url","resource_type")
         ->leftJoin('course_chapter_content','course_chapter.id','=','course_chapter_content.course_chapter_id')
         ->where('course_id',$id)
         // ->join('resource',"course_chapter_content.id","=","resource.course_chapter_content_id")
         ->orderBy('chapter_id')
         // ->join('resource','course_chapter_content.id','=','course_chapter_content_id')
         ->get();
          return response()->json($course);
   }
   /**
    * get the curriculum of a given course
    * @var int $id curriculum_id
    */
   public function createChapter(int $id)
   {
     $data = [
     "chapter_title"=>"new Chapter title.",
     "course_id"=>$id,
     ];
     $id = DB::table("course_chapter")->
     insertGetId($data);
   $data['chapter_id'] = $id;
   unset($data['course_id']);
   return response()->json(["data"=>$data,'status'=>'success','message'
   =>"content created."],200);
   }
   public function updateChapter(Request $request,int $id){
      $this->validate($request,[
      "chapter_title"=>"bail|required|string|max:60",
      ]);
      $data = $request->all();
      unset($data["_method"]);
      return DB::table('course_chapter')->where('id',$id)->update($data) ?
      response()->json(['status'=>'success','message' =>"title has been updated successfully"],200) :
      response()->json(['status'=>'failed','message' =>"title has not been changed"],413);
   }

   public function deleteChapter(int $id){
      $contents = DB::table('course_chapter_content')->select('id')
      ->where('course_chapter_id',$id)->get();
      // return $contents;
      foreach ($contents as $content) {
        $message = $this->deleteContent($content->id);
        if ($message['status'] != 200) {
         return response()->json($message['message'],$message['status']);
        }
      }
      return DB::table('course_chapter')->where('id',$id)->delete() ?
      response()->json(['status'=>'success','message'
      =>"chapter deleted."],200) : response()->json(['status'=>'failed','message'
      =>"chapter cannot be deleted."],413);
   }
}
