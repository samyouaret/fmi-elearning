<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStudentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('student', function(Blueprint $table)
		{
			$table->foreign('department_id', 'department_student')->references('id')->on('department')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('university_id', 'student_university')->references('id')->on('university')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('user_id', 'user_student')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('student', function(Blueprint $table)
		{
			$table->dropForeign('department_student');
			$table->dropForeign('student_university');
			$table->dropForeign('user_student');
		});
	}

}
