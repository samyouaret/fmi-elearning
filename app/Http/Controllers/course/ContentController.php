<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
   protected $allowedFileExtensions = [
      'zip','rar','pdf','doc','docx'
   ];
   protected $allowedVideoExtensions = [
      'mp4','mkv','mpg'
   ];
   protected function isAllowedFile($file) {
      return in_array(
           strtolower($file->getClientOriginalExtension()),
           $this->allowedFileExtensions
      );
   }

   protected function isAllowedVideo($file) {
      return in_array(
           strtolower($file->getClientOriginalExtension()),
           $this->allowedVideoExtensions
      );
   }
    /**
     * return a resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function resource(int $id)
    {
      $files = DB::table("resource")->
      select("id","url")
      ->where('id',$id)
      ->first();
      return response()->json($files);
    }
    /**
     * return a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function resources($content_id)
      {
         $files = DB::table("resource")->
         select("id","url")
         ->where('course_chapter_content_id',$content_id)
         ->get();
         return response()->json($files);
      }

    /**
     * create a new content.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }
    /**
     * update the specified content.
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id)
    {
      // return $request->all();
          $this->validate($request,[
          "content_title"=>"bail|required|string|max:60",
          "is_mandatory"=>'bail|required|integer',
          "time_required_in_sec"=>'bail|required|numeric',
          "is_open_for_free"=>'required|integer',
        ]);
      $data = $request->all();
      $data['title'] = $data['content_title'];
      unset($data['_method']);
      unset($data['content_id']);
      unset($data['content_title']);
          $content =  DB::table('course_chapter_content')->where('id',$id)->first();
          if (!$content){
             response()->json(['status'=>'failed','message' =>"content is undefined."],413);
          }
      return DB::table('course_chapter_content')->where('id',$id)->update($data) ?
      response()->json(['status'=>'success','message' =>"content has been updated successfully"],200) :
      response()->json(['status'=>'failed','message' =>"content cannot be updated"],413);
    }
    /**
     * delete the specified content.
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id)
    {
        //
    }

    protected function storeFile($file){
      $fileNameWithExt =$file->getClientOriginalName();
      //get filename
      $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
      //get extension
      $ext = $file->getClientOriginalExtension();
      $fileNameToStore = $fileName.'_'.time().'.'.$ext;
      return $file->storeAs('public/course_files',$fileNameToStore);
    }

    protected function uploadVideo($file,$id){
      $content = DB::table("course_chapter_content")
      ->select("video_url")
      ->where('id',$id)
      ->first();
      if ($content->video_url!=null) {
         return response()->json(['status'=>'failed','message'
         =>"this content has already a video."],413);
      }
      if (!$this->isAllowedVideo($file)) {
          $msg = 'video can be only of type '.join(',',$this->allowedVideoExtensions);
          return response()->json(['status'=>"failed","message"=>$msg],422);
      }
       $url = str_replace("public",'/storage',$this->storeFile($file));
      DB::table('course_chapter_content')->where('id',$id)
      ->update(['video_url' => $url]);
      return response()->json(["data"=>["video_url"=>$url],'status'=>'success','message'
      =>"video uploaded."],200);
    }

    public function upload(Request $request){
       if($request->hasFile('file')) {
             $files = $request->file('file');
             $id = (int)$request->input("id");
             $isVideo = $request->input("isVideo") === 'true'? true: false;
             return $isVideo ? $this->uploadVideo($files[0],$id) :
             $this->uploadFiles($files,$id);
       }
       return response()->json(['status'=>'failed','message'
       =>"unauthorized"],413);
   }

   public function uploadFiles($files,$id){
            $uploadedFiles = [];
             $counts = DB::table('resource')
              ->where('course_chapter_content_id',$id)
              ->count();
            if ($counts + count($files) >5) {
                 return response()->json(['status'=>'failed','message'
                 =>"max file numbers is 5"],413);
            }
         foreach ($files as $file) {
            if (!$this->isAllowedFile($file)) {
               $msg = 'file can be only of type '.join(',',$this->allowedFileExtensions);
               return response()->json(['status'=>'failed','message'
               =>"$msg"],422);
            }
         }
         foreach ($files as $file) {
           $url = str_replace("public",'/storage',$this->storeFile($file));
           $res_id = DB::table('resource')->insertGetId(
               ['url' => $url, 'course_chapter_content_id'=>$id]
           );
           $uploadedFile = ["id"=>$res_id,"url"=>$url];
           $uploadedFiles[] = $uploadedFile;
       }
      return response()->json(["files"=>$uploadedFiles,
      'status'=>'success','message' =>"files has been uploaded."],200);
   }

    /**
     * delete the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function deleteResource(int $id)
      {
        $resource = DB::table("resource")
          ->select("id","url")
          ->where('id',$id)->first();
        if ($resource) {
           DB::table("resource")->where('id',$id)->delete();
           $path =str_replace("/storage",'public',$resource->url);
           Storage::delete($path);
           return response()->json(['status'=>'success','message' =>"resource deleted."],200);
        }else {
           return response()->json(['status'=>'failed','message' =>"undefind resource."],422);
        }
      }

      public function deleteVideo($content_id)
       {
         $resource = DB::table("course_chapter_content")
           ->select("id","video_url")
           ->where('id',$content_id)->first();
         if ($resource) {
            DB::table("course_chapter_content")->where('id',$content_id)
            ->update(["video_url"=>null]);
            $path = str_replace("/storage",'public',$resource->video_url);
            Storage::delete($path);
            return response()->json(['status'=>'success','message' =>"video deleted."],200);
         }else {
           return response()->json(['status'=>'failed','message' =>"undefind video."],422);
        }
     }

}
