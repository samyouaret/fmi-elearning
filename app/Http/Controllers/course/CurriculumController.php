<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CurriculumController extends Controller
{
   /**
    * get the curriculum of a given course
    * @var int $id
    */
    protected $allowedFileExtensions = [
        'zip','rar','pdf','doc','docx','mp4','mkv','mpg'
    ];
    protected function isAllowedFile($file ) {
        return in_array(
            strtolower($file->getClientOriginalExtension()),
            $this->allowedFileExtensions
        );
    }
   public function show(int $id){
         $course = DB::table("course_chapter")->
         select("course_chapter.id as chapter_id","chapter_title",
         "course_chapter_content.id as content_id","is_mandatory",
         "course_chapter_content.title as content_title",
         "time_required_in_sec",'is_open_for_free',"video_url")
         // "url as resource_url","resource_type")
         ->join('course_chapter_content','course_chapter.id','=','course_chapter_content.course_chapter_id')
         ->where('course_id',$id)
         // ->join('resource',"course_chapter_content.id","=","resource.course_chapter_content_id")
         ->orderBy('content_id')
         // ->join('resource','course_chapter_content.id','=','course_chapter_content_id')
         ->get();
          return response()->json($course);
   }

   public function upload(Request $request){
      $uploadedFiles = [];
      // $this->validate($request,[
      //       // "file" => "required",
      //     'file.*' => 'required|mimes:doc,pdf,docx,zip|max:51200'
      // ]);
      if ($request->hasFile('file')) {
             $files = $request->file('file');
             // return var_dump($files);
         foreach ($files as $file) {
            if (!$this->isAllowedFile($file)) {
               $msg = 'file can be only of type '.join(',',$this->allowedFileExtensions);
               return response()->json(['errors'=>[
                  'file'=>[$msg]
                  ]],422);
            }
          $fileNameWithExt =$file->getClientOriginalName();
          //get filename
          $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
          //get extension
          $ext = $file->getClientOriginalExtension();
          $fileNameToStore = $fileName.'_'.time().'.'.$ext;
          $url = str_replace("public",'/storage',$file->storeAs('public/course_files',$fileNameToStore));
          if ($request->input("isVideo")) {
            DB::table('course_chapter_content') ->where('id',(int)$request->input("id"))
                ->update(
                     ['video_url' => $url]
            );
            return ["video_url"=>$url];
         }else {
            $id = DB::table('resource')->insertGetId(
               ['url' => $url, 'course_chapter_content_id' => (int)$request->input("id")]
            );
         }
          $uploadedFile = ["id"=>$id,"url"=>$url];
          $uploadedFiles[] = $uploadedFile;

       }
      }
      return $uploadedFiles;
   }
   public function update(Request $request,int $id){

   }

   public function delete($id){

   }
}
