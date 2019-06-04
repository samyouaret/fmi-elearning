<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Course;
use Gate;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function dashboard()
    {
        return view('home.dashboard');
    }
    public function courses()
    {
         $data = Course::simplePaginate(3);
         $message = ["auth"=>Auth::check(),
         "data"=>$data];
         return response()->json($message,200);
    }

    public function search(Request $request)
    {
      $search  = $request->input("search_term");
         $data = DB::table('course')
                    ->where('title','like',"%$search%")
                    ->orWhere('description','like',"%$search%")
                    ->simplePaginate(3);
         $message = ["count"=>count($data),"auth"=>Auth::check(),
         "data"=>$data];
         return response()->json($message,200);
    }

    public function index()
    {
           // return var_dump(Gate::allows("isInstructor"));
        return view('home.index');
    }
}
