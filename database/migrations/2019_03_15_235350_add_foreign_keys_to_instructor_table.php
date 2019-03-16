<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInstructorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('instructor', function(Blueprint $table)
		{
			$table->foreign('department_id', 'instructor_department')->references('id')->on('department')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('university_id', 'university_instructor')->references('id')->on('university')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('user_id', 'user_instructor')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('instructor', function(Blueprint $table)
		{
			$table->dropForeign('instructor_department');
			$table->dropForeign('university_instructor');
			$table->dropForeign('user_instructor');
		});
	}

}
