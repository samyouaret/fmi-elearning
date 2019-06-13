<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Course;


class AdminController extends Controller
{
 /**
  * function to return list of users
  *
  * @param int id the id of admin
  * @return HttpRequest
  */
 public function show()
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
   return response()->json($users,200);
 }
 public function getCourses()
 {
   $courses = Course::select("id",'title','created_at')
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
                 ->select("id",'title','created_at')
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
}
