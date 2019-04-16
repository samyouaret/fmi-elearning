<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

   }

   public function upload(Request $request){
      $paths = [];
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
          $paths[] = str_replace("public",'storage',$file->storeAs('public/course_files',$fileNameToStore));
       }
      }
      return $paths;
   }

   public function update(Request $request,int $id){

   }

   public function delete($id){

   }
}
