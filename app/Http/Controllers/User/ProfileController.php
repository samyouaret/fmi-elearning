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
      $query = User::select('user.id as id','first_name','last_name','user_type','image','biography')
      ->leftjoin('user_info','user.id','user_info.id');
      $courses = [];
      $user = User::find($id);
      if (!$user) {
         return false;
      }
      if ($user->user_type>0) {
        $query->addSelect('qualification',
        'num_of_enrolled_students');
       $query->leftjoin('instructor','user.id','instructor.id');
       $courses = Course::select("id","description","title","course_fee","level","cover_image")
       ->join('instructor_course','instructor_course.course_id','course.id')
        // ->where(['instructor_course.instructor_id'=>$id,'is_published'=>1])
        ->where(['instructor_course.instructor_id'=>$id])
        ->paginate(3);
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
      $this->authorize('editProfile',$id);
      // if (Auth::id() != $id)
      //     return abort(404,"forbidden");
        return view('profile.edit');
    }
    public function editprofile(int $id)
    {
      $this->authorize('editProfile',$id);
      // if (Auth::id() != $id)
      //     return abort(404,"forbidden");
      $profile = Profile::select("user.id as id",'first_name','last_name',
      'university_id','image as cover_image','biography',"department_id")
      ->join('user','user.id','user_info.id')
      ->where('user_info.id',$id)
      ->first();
      $universities =  DB::table('university')->select('id','name')->get();
      $departments =  DB::table('department')->select('id','name')->get();
        return [
          'values'=>$profile,
          'id'=>$id,
          'departments'=>$departments,
          'universities' =>$universities
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id)
    {
      // if (!$request->user()->id==$id) {
      //    return response()->json(['message'=>"not found",
      //    "status"=>"error"],404);
      // }
        $this->authorize('editProfile',$id);
        $this->validate($request,[
           'first_name' => 'bail|required|string',
           'last_name' => 'bail|required|string',
           'biography' => 'bail|required|string',
          'university_id' => 'bail|required|integer',
          'department_id' => 'bail|required|integer',
        ]);
        $profile = Profile::find($id) ?? new Profile;
        $profile->id = $id;
        $profile->university_id = $request->input('university_id');
        $profile->department_id = $request->input('department_id');
        $profile->biography = $request->input('biography');
        $user = User::find($id);
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->save();
        $profile->save();
        return response()->json(['message'=>"profile updated","status"=>"success"],200);
    }

    public function uploadImage(Request $request)
    {
        $this->validate($request,[
          'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($request->hasFile('cover_image')) {
            $fileNameWithExt = $request->file('cover_image')->getClientOriginalName();
            //get filename
            $fileName = pathinfo($fileNameWithExt,PATHINFO_FILENAME);
            //get extension
            $ext = $request->file('cover_image')->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$ext;
            $path = $request->file('cover_image')->storeAs('public/profile_image',$fileNameToStore);
            // '/storage/profile_image/'.$fileNameToStore);
            // echo "yeeeeeeeeeeees";
            $user =  User::find(Auth::id());
            $user->image = $fileNameToStore;
            $user->save();
            if ($user->image !=='no_image.jpg')
              Storage::delete('public/profile_image' . $user->image);
            return response()->json(['cover_image'=>$fileNameToStore,
            'message'=>"image uploaded","status"=>"success"],200);
        }
        return response()->json(['message'=>"image cannot be uploaded","status"=>"error"],422);
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
