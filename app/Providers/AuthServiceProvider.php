<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Course;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    const USER_STUDENT = 0;
    const USER_INSTRUCTOR = 1;
    const USER_ADMIN = 2;
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

        Gate::define('isAdmin', function ($user) {
          return $user->user_type == self::USER_ADMIN;
        });
        Gate::define('isStudent', function ($user) {
          return $user->user_type == self::USER_STUDENT;
        });
        Gate::define('isInstructor', function ($user) {
          return $user->user_type == self::USER_INSTRUCTOR;
        });
        Gate::define('editProfile', function ($user,$id) {
           return $user->id == $id;
        });
        Gate::define('editCourse', function ($user,$id) {
           $instructor = DB::table('instructor_course')
           ->select('instructor_id as id')->where('course_id',$id)->first();
           return $instructor->id == $user->id;
        });
        //
    }
}
