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
Route::get('/', function () {
    return view('home');
})->middleware('auth');
// echo Hash::make('james1995');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

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
