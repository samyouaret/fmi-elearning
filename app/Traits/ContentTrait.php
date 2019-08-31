<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

trait ContentTrait
{
   /**
    * delete the specified content.
    * @return \Illuminate\Http\Response
    */
   public function deleteContent(int $id)
   {
      $resources = DB::table('resource')
         ->where('course_chapter_content_id', $id)
         ->get();
      if ($resources) {
         foreach ($resources as $resource) {
            Storage::delete(str_replace("/storage", 'public', $resource->url));
         }
         DB::table("resource")->where('course_chapter_content_id', $id)->delete();
      }
      $content =  DB::table('course_chapter_content')->select("video_url")
         ->where('id', $id)->first();
      $message = [
         "message" => ['status' => 'failed', 'message' => "content is undefined."],
         "status"  => 413
      ];
      if (!$content) {
         return $message;
      }
      Storage::delete(str_replace("/storage", 'public', $content->video_url));
      $content =  DB::table('course_chapter_content')
         ->where('id', $id)->delete();
      return [
         "message" => ['status' => 'success', 'message' => "content is deleted."],
         "status"  =>  200
      ];
   }
   /**
    * return a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function resources($content_id)
   {
      $files = DB::table("resource")->select("id", "url")
         ->where('course_chapter_content_id', $content_id)
         ->get();
      return response()->json($files);
   }
}
