<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
           // return var_dump(Gate::allows("isInstructor"));
        return view('dashboard');
    }
    public function index()
    {
           // return var_dump(Gate::allows("isInstructor"));
        return view('index');
    }
}
