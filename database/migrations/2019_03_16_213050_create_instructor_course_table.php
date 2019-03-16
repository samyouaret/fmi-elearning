<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInstructorCourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('instructor_course', function(Blueprint $table)
		{
			$table->bigInteger('course_id');
			$table->bigInteger('instructor_id');
			$table->boolean('is_owner');
			$table->primary(['course_id','instructor_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('instructor_course');
	}

}
