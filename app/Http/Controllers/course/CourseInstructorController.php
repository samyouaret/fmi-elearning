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

    }

    /**
     * publish the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\ResponseJson
     *
     */
    public function publish(int $id)
    {
      $course = Course::find($id);
      if ($course->is_published == 1) {
         return response()->json(
           ['status'=>'failed','message' =>"course is already published."],422);
      }
      if (!($course->level && $course->description)) {
         return response()->json(
           ['status'=>'failed','message' =>"course must have level and a description."],422);
      }
      $chapters = DB::table('course_chapter')
      ->select('course_chapter.id as co_ch_id','video_url')
      ->leftJoin('course_chapter_content','course_chapter.id','=','course_chapter_content.course_chapter_id')
      ->where('course_id',"=",$id)->get();
      // return $chapters;
      foreach ($chapters as $chapter) {
         if (!$chapter->video_url) {
            return response()->json(
             ['status'=>'failed',
             'message' =>"chapters cannot be empty,every content must have a video."],422);
         }
      }
      $course->is_published = 1;
      if ($course->save()) {
         return response()->json(
           ['status'=>'success','message' =>"course now published."],200);
      }
    }
    public function unpublish(int $id)
    {
      $course = Course::find($id);
      if ($course->is_published == 0) {
         return response()->json(
           ['status'=>'failed','message' =>"course is already unpublished."],422);
      }
      $course->is_published = 0;
      if ($course->save()) {
         return response()->json(
           ['status'=>'success','message' =>"course now is unpublished."],200);
      }
      return response()->json(
         ['status'=>'failed','message' =>"somthing went wrong try again."],422);
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
      $cover_image = $data['image'];
      unset($data['_method']);
      unset($data['image']);
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
          $cover_image = $data['cover_image'];
      }
      return DB::table('course')->where('id',$id)->update($data) ?
      response()->json([
       "message"=>['status'=>'success','message' =>"course has been updated successfully"],
       "cover_image"=>$cover_image],200) :
      response()->json([
      "message"=>['status'=>'failed','message' =>"course has not been updated"],
      "cover_image"=>$cover_image],413);
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
