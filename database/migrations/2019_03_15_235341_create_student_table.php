<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStudentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('student', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->bigInteger('user_id')->index('user_student');
			$table->integer('num_of_courses_enrolled')->nullable();
			$table->integer('num_of_courses_completed')->nullable();
			$table->integer('year_of_study');
			$table->integer('department_id')->index('department_student');
			$table->integer('university_id')->index('student_university');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('student');
	}

}
