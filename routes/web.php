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
Route::prefix('test')->group(function()
{
   Route::get('test', function()
   {
      return view('test.test');
   });
   Route::get('', function()
   {
      return view('test.index');
   });
   Route::get('form', function()
   {
      return view('test.form');
   });
   Route::get('dataprovider', function()
   {
      return view('test.dataprovider');
   });
   Route::get('resource', function()
   {
      return view('test.resource');
   });
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/dashboard', 'HomeController@dashboard')->middleware('auth')
->name('dashboard');
Route::get('/courses', 'HomeController@courses');
Route::post('/search', 'HomeController@search');

/**
 * course builder (instructor routes)
 */
// Route::match(['get','head'],'instructor/{courses}','course\CourseInstructorController');
Route::prefix('instructor')->group(function()
{
   Route::post('{course}','course\CourseInstructorController@publish')->middleware('can:isInstructor');
   Route::put('unpublish/{course}','course\CourseInstructorController@unpublish')->middleware('can:isInstructor');
   Route::get('subSubjects/{subject}','course\CourseInstructorController@subSubjects')->middleware('can:isInstructor');
   Route::get('subjects','course\CourseInstructorController@subjects')->middleware('can:isInstructor');
   Route::get('languages','course\CourseInstructorController@languages')->middleware('can:isInstructor');
   Route::get('course/{course}','course\CourseInstructorController@getCourse')->middleware('can:isInstructor');
   Route::get('courses', 'course\CourseInstructorController@courses')->middleware('can:isInstructor');
});
Route::resource('instructor', 'course\CourseInstructorController',['parameters' => [
   'instructor' => 'course',
   ]])->middleware('can:isInstructor');
/**
 * curriculum routes
*/
Route::prefix('curriculum')->group(function()
{
  Route::get('{id}','course\CurriculumController@show')->middleware('can:isInstructor');
  Route::delete('chapter/{id}','course\CurriculumController@deleteChapter')->middleware('can:isInstructor');
  Route::post('chapter/create/{id}','course\CurriculumController@createChapter')->middleware('can:isInstructor');
  Route::put('chapter/update/{id}','course\CurriculumController@updateChapter')->middleware('can:isInstructor');
  /**
   * curriculum_content routes
  */
  Route::post('content/create/{chapter_id}','course\ContentController@create')->middleware('can:isInstructor');
  Route::put('content/update/{id}','course\ContentController@update')->middleware('can:isInstructor');
  Route::delete('content/{id}','course\ContentController@delete')->middleware('can:isInstructor');
  /**
   * curriculum_content resources routes
  */
  Route::get('content/resource/{id}','course\ContentController@resource');
  Route::get('content/resources/{id}','course\ContentController@resources');
  Route::post('content/resource/upload','course\ContentController@upload')->middleware('can:isInstructor');
  Route::delete('content/resource/remove/{id}','course\ContentController@deleteResource')->middleware('can:isInstructor');
  Route::delete('content/removevideo/{content_id}','course\ContentController@deleteVideo')->middleware('can:isInstructor');
});
/**
 * course explorer
 */
Route::prefix('enrollment')->group(function()
{
  Route::get('{id}','EnrollmentController@show');
  Route::get('/course/{id}','EnrollmentController@getCourse');
  Route::get('/relatedcourses/{id}','EnrollmentController@getRelatedCourse');
  Route::post('/enrollcontent/{id}','EnrollmentController@enrollcontent');
});
/**
 * Profile routes
 */
Route::get('profile/edit/{id}',"User\ProfileController@editprofile");
Route::post('profile/image/upload',"User\ProfileController@uploadImage");
Route::resource('profile',"User\ProfileController")->only(['show',"edit","index",'update']);
