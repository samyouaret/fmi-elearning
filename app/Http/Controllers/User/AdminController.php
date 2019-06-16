<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Course;
use App\Traits\AdminTrait as AdminTrait;

class AdminController extends Controller
{
   use AdminTrait;
 /**
  * function to return list of users
  *
  * @param int id the id of admin
  * @return HttpRequest
  */
 public function show($id)
 {
   return view('admin.show');
 }
 /**
  * function to return list of users
  * @return HttpRequest
  */
    public function getUsers()
    {
      $users = User::select("id",'first_name','last_name','email','user_type')
      ->paginate(3);
      $admin_type = Auth::user()->user_type;
      // extract(get_object_vars($users));
      // return var_dump($users);
      // $users->append('admin_type',$admin_type);
      $custom = collect(["admin_type"=>$admin_type]);

      $data = $custom->merge($users);

      return response()->json($data,200);
      // return response()->json(["data"=>$users,"admin_type"=>$admin_type],200);
    }
    public function getCourses()
    {
      $courses = Course::select("id",'cover_image','title','created_at')
      ->where('is_published',1)
      ->paginate(5);
      return response()->json($courses,200);
    }
    public function search(Request $request,string $type)
    {
       $result = [];
       $status = 200;
       $this->validate($request,['search_term'=>"bail|required|string"]);
       $search  = $request->input("search_term");
       switch ($type) {
          case 'user':
            $result = $this->searchUser($search);
             break;
          case 'course':
             $result = $this->searchCourse($search);
             break;
          default:
             $result = 404;
             break;
       }
      return response()->json($result,$status);
    }
    public function searchCourse(string $search)
    {
         return DB::table("course")
                    ->select("id",'cover_image','title','created_at')
                    ->where([['title','like',"%$search%"],'is_published'=>1])
                    ->paginate(5);
    }
    public function searchUser($email)
    {
         return DB::table("user")
                    ->select("id",'first_name','last_name','email','user_type')
                    ->where('email','like',"%$email%")
                    ->paginate(1);
    }

    public function authorizeUser(Request $request,int $id)
    {
      /**
       * 2 admin
       *   make instructor
       *   delete roles from instrucor
       *   3 can do evething
       */
       $this->authorize('isAdmin');
       $this->validate($request,['type'=>"bail|required|integer",
       "user_id"=>"bail|required|integer"]);
       $type = $request->input("type");
       $user_id = $request->input("user_id");
       $user = User::find($user_id);
       //cannot change his own state
       if ($user->id == $id) {
          return response()->json(["message"=>"unauthorized","status"=>"error"],405);
       }
       $admin = User::find($id);
       if ($admin->user_type == 2 && $user->user_type>1) {
          return response()->json(["message"=>"unauthorized","status"=>"error"],405);
       }
      switch ($type) {
         case 0:
            if ($admin->user_type == 2 && $user->user_type>1) {
            return response()->json(["message"=>"unauthorized","status"=>"error"],405);
            }
            $label = "basic user";
            break;
         case 1:
            $label = "instructor";
            break;
         case 2:
            $label = "admin";
            break;
         default:
            return response()->json(["message"=>"unauthorized","status"=>"error"],405);
            break;
      }
       $user->user_type = $type;
       $user->save();
       return response()->json(["message"=>"user role has been changed to ".$label,"status"=>"success"]
       ,200);
    }

    public function unpublish(int $id)
    {
      $course = Course::find($id);
      $course->is_published = 0;
      if ($course->save()) {
         return response()->json(
           ['status'=>'warning','message' =>"course now is unpublished."],200);
      }
      return response()->json(
         ['status'=>'failed','message' =>"somthing went wrong try again."],422);
    }
}
