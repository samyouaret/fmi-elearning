<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
use Illuminate\Support\Facades\Storage;

class CourseInstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return view('courseinstructor.index');
    }
    public function courses()
    {
         $courses = Course::all();
         return $courses->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       return view('courseinstructor.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * publish the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\ResponseJson
     *
     */
    public function publish($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('courseinstructor.edit');
    }
    /**
     * Show the the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $course = Course::select("course.id as id","language_name","label","subject_id",
        "description","title","course_fee","is_published","level","language_id","sub_subject_id",
        "cover_image")
       ->join('sub_subject','sub_subject_id','=','sub_subject.id')
       ->where('course.id',$id)
       ->join('language','language_id','=','language.id')
       ->first();
        return response()->json($course);
    }

    public function courseinfo($id)
    {
      $course = Course::select("course.id as id","language_name","label","subject_id",
       "description","title","course_fee","is_published","level","language_id","sub_subject_id",
       "cover_image as image")
      ->join('sub_subject','sub_subject_id','=','sub_subject.id')
      ->where('course.id',$id)
      ->join('language','language_id','=','language.id')
      ->first();
      $subjects =DB::table('subject')
      ->get();
       $sub_subjects = DB::table('sub_subject')
       ->where('subject_id',$course->subject_id)
       ->get();
       $languages = DB::table('language')
       ->get();
       $result = [
          'course'=>$course,
                 'subjects'=>$subjects,
                 'sub_subjects'=>$sub_subjects,
                 'languages' =>$languages
              ];
      return response()->json($result);
    }

    public function subSubjects($subjectId)
    {
       $items = DB::table('sub_subject')
       ->where('subject_id',$subjectId)
       ->get();
       // var_dump($course);
      return response()->json($items);
    }
    public function subjects()
    {
       $items = DB::table('subject')
       ->get();
    //    return response()->json([
    //  'message' => 'Record not found',
    //  ], 404);
     return response()->json($items);
    }
    public function languages()
    {
       $items = DB::table('language')
       ->get();
      return response()->json($items);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      // return $request->all();
         $this->validate($request,[
         "title"=>"required|string|max:60",
         "description"=>"required|string|max:2000",
         "course_fee"=>'required|numeric',
         "sub_subject_id"=>'required|integer',
         "language_id"=>'required|integer',
         "cover_image"=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         "level"=>"required|nullable|integer|max:3",
      ]);
      $data = $request->all();
      unset($data['_method']);
      if ($request->hasFile('cover_image')) {
          $fileNameWithExt = $request->file('cover_image')->getClientOriginalName();
          //get filename
          $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
          //get extension
          $ext = $request->file('cover_image')->getClientOriginalExtension();
          $fileNameToStore = $fileName.'_'.time().'.'.$ext;
          $path = $request->file('cover_image')->storeAs('public/course_image',$fileNameToStore);
          $data['cover_image'] = $fileNameToStore;
          $course =  Course::find($id);
          if ($course->cover_image !== 'no_image.png')
            Storage::delete('public/course_image/' . $course->cover_image);
      }
      return DB::table('course')->where('id',$id)->update($data) ?
      response()->json([
       "message"=>['status'=>'success','message' =>"course has been updated successfully"],
       "cover_image"=>$data['cover_image']],200) :
      response()->json([
      "message"=>['status'=>'failed','message' =>"course has not been updated"],
      "cover_image"=>NULL],413);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
