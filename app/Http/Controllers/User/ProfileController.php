<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Profile;
use Illuminate\Support\Facades\DB;

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
    public function index()
    {
      return view('profile.show');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('profile.create');
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
          'gender'=>'required'
        ]);
        if (!$request->user()->id==$id) {
          App::abort(404, 'Unauthorized');
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
