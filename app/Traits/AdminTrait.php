<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

trait AdminTrait
{

  public function addSubject(Request $request)
  {
    $this->validate($request, ['subject' => "bail|required|string"]);
    $subject  = $request->input("subject");
    $id = DB::table('subject')->insertGetId(['label' => $subject]);

    return $id ? response()->json(
      ["id" => $id, 'status' => 'success', 'message' => "subject added."],
      200
    ) : response()->json(
      ['status' => 'failed', 'message' => "somthing went wrong try again."],
      422
    );
  }

  public function deleteSubject(int $id)
  {
    DB::table('subject')->where('id', $id)
      ->delete();
    return response()->json(['status' => 'success', 'message' => "subject deleted."], 200);
  }

  public function getSubjects()
  {
    $subjects = DB::table('subject')->orderBy('id', 'desc')
      ->paginate(5);
    return response()->json($subjects, 200);
  }

  public function getSubSubjects()
  {
    $subjects = DB::table('sub_subject')
      ->select(
        'sub_subject.id as sub_id',
        'sub_subject.id as id',
        'sub_subject.label as sub_label',
        'subject.label as label'
      )
      ->join('subject', 'subject.id', 'sub_subject.subject_id')
      ->orderBy('sub_subject.id', 'desc')
      ->paginate(5);
    return response()->json($subjects, 200);
  }

  public function addSubSubject(Request $request)
  {
    $this->validate($request, [
      'sub_subject' => "bail|required|string",
      'subject_id' => 'bail|required|integer'
    ]);
    $sub_subject  = $request->input("sub_subject");
    $subject_id  = $request->input("subject_id");
    return DB::table('sub_subject')->insert([
      'label' => $sub_subject,
      'subject_id' => $subject_id
    ]) ? response()->json(
      ['status' => 'success', 'message' => "sub subject added."],
      200
    ) : response()->json(
      ['status' => 'failed', 'message' => "somthing went wrong try again."],
      422
    );
  }
}
