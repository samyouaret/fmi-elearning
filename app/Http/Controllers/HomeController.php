<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        $message = [
            "auth" => Auth::check(),
            "data" => $data
        ];
        return response()->json($message, 200);
    }

    public function getEnrolledcourses()
    {
        $courses = Course::select("course.id as id", 'cover_image', 'title', 'enrollment_date')
            ->join("enrollment", 'enrollment.course_id', 'course.id')
            ->where('enrollment.user_id', Auth::id())
            ->paginate(5);
        return response()->json($courses, 200);
    }
    public function search(Request $request)
    {
        $this->validate($request, ['search_term' => "bail|required|string"]);
        $search  = $request->input("search_term");

        $data = DB::table('course')
            ->where('title', 'like', "%$search%")
            ->orWhere('description', 'like', "%$search%")
            ->paginate(3);
        $message = [
            "count" => count($data), "auth" => Auth::check(),
            "data" => $data
        ];
        return response()->json($message, 200);
    }


    public function index()
    {
        // return var_dump(Gate::allows("isInstructor"));
        // echo Hash::make('somepass');
        return view('home.index');
    }
}
