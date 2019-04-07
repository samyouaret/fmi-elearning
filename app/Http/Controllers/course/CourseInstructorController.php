<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Course;
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
     //   return response()->json([
     // 'message' => 'Record not found',
     // ], 404);
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
         $this->validate($request,[
         "title"=>"required|string|max:60",
         "description"=>"nullable|string|max:2000",
         "course_fee"=>'numeric',
         "sub_subject_id"=>'integer',
         "language_id"=>'integer',
         "cover_image"=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         "num_of_chapters"=>'nullable|integer',
         "level"=>"nullable|integer|max:3",
      ]);
      $data = $request->all();
      // $resp = DB::table('course')->updateOrInsert(['id'=>$id],$data) ? ['status'=>'success','msg' =>"course has been updated successfully"] : ['status'=>'failed','msg' =>"oops something went wrong"];
      $resp = DB::table('course')->where('id',$id)->update($data) ?
      ['status'=>'success','msg' =>"course has been updated successfully"] :
      ['status'=>'failed','msg' =>"oops something went wrong"];
      // return response()->json($request->all());
      return response()->json($resp);
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
