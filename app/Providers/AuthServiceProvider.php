<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Course;
use App\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
  const USER_STUDENT = 0;
  const USER_INSTRUCTOR = 1;
  const USER_ADMIN = 2;
  const SUPER_ADMIN = 3;
  /**
   * The policy mappings for the application.
   *
   * @var array
   */
  protected $policies = [
    // 'App\Model' => 'App\Policies\ModelPolicy',
  ];

  /**
   * Register any authentication / authorization services.
   *
   * @return void
   */
  public function boot()
  {
    $this->registerPolicies();

    Gate::define('isSuperAdmin', function ($user) {
      return $user->user_type == self::SUPER_ADMIN;
    });

    Gate::define('isAdmin', function ($user) {
      return $user->user_type >= self::USER_ADMIN;
    });

    Gate::define('isStudent', function ($user) {
      return $user->user_type == self::USER_STUDENT;
    });

    Gate::define('isInstructor', function ($user) {
      // dd($user);
      return $user->user_type >= self::USER_INSTRUCTOR;
    });

    Gate::define('instructor_can_edit_course', function ($user, $courseId) {
      $instructor = DB::table('instructor_course')
        ->select('instructor_id as id')->where('course_id', $courseId)->first();
      return $user->user_type >= self::USER_INSTRUCTOR && !is_null($instructor);
    });

    Gate::define('editProfile', function ($user, $id) {
      return $user->id == $id;
    });
  }
}
