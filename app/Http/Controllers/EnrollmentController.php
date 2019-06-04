<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class enrollmentController extends Controller
{
    public function show(int $id){
      return view('enrollment.index');
   }
}
