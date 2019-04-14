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
   public function show(int $id){

   }

   public function upload(Request $request){
      if ($request->hasFile('file')) {
             $files = $request->file('file');
         foreach ($files as $file) {
          $fileNameWithExt =$file->getClientOriginalName();
          //get filename
          $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
          //get extension
          $ext = $file->getClientOriginalExtension();
          $fileNameToStore = $fileName.'_'.time().'.'.$ext;
          $path = $file->storeAs('public/course_files',$fileNameToStore);
       }
      }
   }

   public function update(Request $request,int $id){

   }

   public function delete($id){

   }
}
