<?php

namespace App\Http\Controllers\course;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class CourseExplorerController extends Controller
{
  /**
   * show a course in view mode (no auth is needed)
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function show($id){
   return "Hello in this course";
  }
  /**
   * search for a course (no auth is needed)
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function search($id){
      return "Hello in this course";
  }
  /**
   *enroll a course in (auth is needed)
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function enroll($id){
      return Response::json([
        "success" => true,
        "id" => 1517
      ]);
  }
}
/**
 */
