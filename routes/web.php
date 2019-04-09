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
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/dashboard', 'HomeController@dashboard')->middleware('auth')
->name('dashboard');

/**
 * course builder (instructor routes)
 */
// Route::match(['get','head'],'instructor/{courses}','course\CourseInstructorController');

Route::post('instructor/{course}','course\CourseInstructorController@publish');
Route::get('instructor/subSubjects/{subject}','course\CourseInstructorController@subSubjects');
Route::get('instructor/subjects','course\CourseInstructorController@subjects');
Route::get('instructor/languages','course\CourseInstructorController@languages');
Route::get('instructor/courseinfo/{course}','course\CourseInstructorController@courseinfo');
Route::get('instructor/courses', 'course\CourseInstructorController@courses');
Route::resource('instructor', 'course\CourseInstructorController',['parameters' => [
  'instructor' => 'course',
]]);

/**
 * course explorer
 */

Route::prefix('course')->group(function()
{
  Route::get('{id}','course\CourseExplorerController@show');
  Route::get('search/{id}','course\CourseExplorerController@search');
  Route::post('enroll/{id}','course\CourseExplorerController@enroll')
  ->middleware('auth');
});

/**
 * Profile routes
 */

Route::resource('profile',"User\ProfileController");
