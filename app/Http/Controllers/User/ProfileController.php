<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Profile;
use App\User;
use App\Course;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
      // $this->middleware("auth")->except;
      // $this->middleware('profile',['only' => ['create']]);
    }
    public function getprofileData(int $id){
      $query = User::select('user.id as id','first_name','last_name','user_type','image')
      ->leftjoin('user_info','user.id','user_info.id');
      $courses = [];
      $user = User::find($id);
      if (!$user) {
         return false;
      }
      if ($user->user_type>0) {
        $query->addSelect('qualification',"introduction_brief",
        'num_of_enrolled_students');
       $query->leftjoin('instructor','user.id','instructor.id');
       $courses = Course::select("id","description","title","course_fee","level","cover_image")
       ->join('instructor_course','instructor_course.course_id','course.id')
        // ->where(['instructor_course.instructor_id'=>$id,'is_published'=>1])
        ->where(['instructor_course.instructor_id'=>$id])
        ->get();
      }
      $query->where('user.id',$id);
      return ["user"=>$query->first(),'courses'=>$courses];
   }
    public function show(int $id)
    {
      $data = $this->getprofileData($id);
      if (!$data) {
         return redirect('/');
      }
      $user = $data['user'];
      $courses = $data['courses'];
      return view('profile.show')->with(["user"=>$user,
      'courses'=>$courses]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
      $profile = Profile::find($id);
      $universities =  DB::table('university')->select('id','name')->get();
      $departments =  DB::table('department')->select('id','name')->get();
        return view('profile.edit')->with([
          'profile'=>$profile,
          'id'=>$id,
          'departments'=>$departments,
          'universities' =>$universities
        ]);
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
          'university' => 'required',
          'department' => 'required',
          'gender'=>'required',
          'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        echo "<pre>";
        print_r($request->all());
        var_dump($request->has('profile_image'));
        if (!$request->user()->id==$id) {
          App::abort(404, 'Unauthorized');
        }
        if ($request->hasFile('profile_image')) {
            $fileNameWithExt = $request->file('profile_image')->getClientOriginalName();
            //get filename
            $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
            //get extension
            $ext = $request->file('profile_image')->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$ext;
            $path = $request->file('profile_image')->storeAs('public/profile_image',$fileNameToStore);
            // echo "yeeeeeeeeeeees";
            $user =  User::find($id);
            $user->image = $fileNameToStore;
            $user->save();
            if ($user->image !=='no_image.jpg')
              Storage::delete('public/profile_image' . $user->image);
        }
        $profile = Profile::find($id) ?? new Profile;
        $profile->id = $id;
        $profile->university_id = $request->input('university');
        $profile->department_id = $request->input('department');
        $profile->gender = $request->input('gender');
        $profile->save();
        return redirect('/dashboard')->with('success',"Profile updated successfully");
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
