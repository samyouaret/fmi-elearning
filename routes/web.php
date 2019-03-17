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
Route::get('test/test', function()
{
  return view('test.test');
});
Route::get('test', function()
{
  return view('test.index');
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
Route::resource('instructor', 'course\CourseInstructorController',['parameters' => [
  'instructor' => 'course',
]])->except('show');

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
