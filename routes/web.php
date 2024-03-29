<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//
// echo Hash::make('james1995');
// test route
Route::prefix('test')->group(function () {
   Route::get('test', function () {
      return view('test.test');
   });
   Route::get('', function () {
      return view('test.index');
   });
   Route::get('form', function () {
      return view('test.form');
   });
   Route::get('dataprovider', function () {
      return view('test.dataprovider');
   });
   Route::get('resource', function () {
      return view('test.resource');
   });
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/dashboard', 'HomeController@dashboard')
   ->middleware('auth')
   ->name('dashboard');
Route::get('/dashboard/enrolledcourses', 'HomeController@getEnrolledcourses')
   ->middleware('auth');

Route::get('/courses', 'HomeController@courses');
Route::post('/search', 'HomeController@search');

/**
 * course builder (instructor routes)
 */
// Route::match(['get','head'],'instructor/{courses}','course\CourseInstructorController');
Route::prefix('instructor')->group(function () {
   Route::post('{course}', 'course\CourseInstructorController@publish');
   Route::put('unpublish/{course}', 'course\CourseInstructorController@unpublish');
   Route::get('subSubjects/{subject}', 'course\CourseInstructorController@subSubjects');
   Route::get('subjects', 'course\CourseInstructorController@subjects');
   Route::get('languages', 'course\CourseInstructorController@languages');
   Route::get('course/{course}', 'course\CourseInstructorController@getCourse');
   Route::get('courses', 'course\CourseInstructorController@courses');
});

Route::resource('instructor', 'course\CourseInstructorController', ['parameters' => [
   'instructor' => 'course',
]]);
/**
 * curriculum routes
 */
Route::prefix('curriculum')->group(function () {
      Route::get('{id}', 'course\CurriculumController@show');
      Route::delete('chapter/{id}', 'course\CurriculumController@deleteChapter');
      Route::post('chapter/create/{id}', 'course\CurriculumController@createChapter');
      Route::put('chapter/update/{id}', 'course\CurriculumController@updateChapter');
      /**
       * curriculum_content routes
       */
      Route::post('content/create/{chapter_id}', 'course\ContentController@create');
      Route::put('content/update/{id}', 'course\ContentController@update');
      Route::delete('content/{id}', 'course\ContentController@delete');
      /**
       * curriculum_content resources routes
       */
      Route::get('content/resource/{id}', 'course\ContentController@resource');
      Route::get('content/resources/{id}', 'course\ContentController@resources');
      Route::post('content/resource/upload', 'course\ContentController@upload');
      Route::delete('content/resource/remove/{id}', 'course\ContentController@deleteResource');
      Route::delete('content/removevideo/{content_id}', 'course\ContentController@deleteVideo');
   });
/**
 * course explorer
 */
Route::prefix('enrollment')->group(function () {
   Route::get('{id}', 'EnrollmentController@show');
   Route::get('/course/{id}', 'EnrollmentController@getCourse');
   Route::get('/relatedcourses/{id}', 'EnrollmentController@getRelatedCourse');
   Route::post('/enrollcontent/{id}', 'EnrollmentController@enrollcontent');
});
/**
 * Profile routes
 */
Route::prefix('profile')->group(function () {
   Route::get('/edit/{id}', "User\ProfileController@editprofile");
   Route::post('/image/upload', "User\ProfileController@uploadImage");
});
Route::resource('profile', "User\ProfileController")->only(['show', "edit", "index", 'update']);
/*
** Admin routes
*/
Route::prefix('admin')->group(function () {
   Route::get('/{id}/manage', "User\AdminController@show");
   Route::post('/search/{type}', "User\AdminController@search");

   Route::get('/users', "User\AdminController@getUsers");
   Route::put('/users/authorize/{id}', "User\AdminController@authorizeUser");
   Route::put('/users/block/{id}', "User\AdminController@blockUser");
   Route::get('subjects', "User\AdminController@getSubjects");
   Route::delete('subjects/{id}', "User\AdminController@deleteSubject");
   Route::post('/addsubject', "User\AdminController@addSubject");
   Route::post('/addsubsubject', "User\AdminController@addSubSubject");
   Route::get('subsubjects', "User\AdminController@getSubSubjects");

   Route::get('/courses', "User\AdminController@getCourses");
   Route::put('/courses/unpublish/{id}', "User\AdminController@unpublishCourse");
});
