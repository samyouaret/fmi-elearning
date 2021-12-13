<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
  protected $table = "user_info";
  public $timestamps = false;
}
