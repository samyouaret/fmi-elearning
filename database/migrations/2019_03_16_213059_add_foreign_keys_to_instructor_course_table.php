<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInstructorCourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('instructor_course', function(Blueprint $table)
		{
			$table->foreign('course_id', 'instructor_course_course')->references('id')->on('course')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('course_id', 'instructor_course_instructor')->references('id')->on('instructor')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('instructor_course', function(Blueprint $table)
		{
			$table->dropForeign('instructor_course_course');
			$table->dropForeign('instructor_course_instructor');
		});
	}

}
