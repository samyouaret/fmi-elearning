<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('course', function(Blueprint $table)
		{
			$table->foreign('language_id', 'course_language')->references('id')->on('language')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('sub_subject_id', 'course_sub_subject')->references('id')->on('sub_subject')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('course', function(Blueprint $table)
		{
			$table->dropForeign('course_language');
			$table->dropForeign('course_sub_subject');
		});
	}

}
