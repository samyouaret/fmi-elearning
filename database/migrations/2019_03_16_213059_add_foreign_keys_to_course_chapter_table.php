<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCourseChapterTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('course_chapter', function(Blueprint $table)
		{
			$table->foreign('course_id', 'course_chapter_course')->references('id')->on('course')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('course_chapter', function(Blueprint $table)
		{
			$table->dropForeign('course_chapter_course');
		});
	}

}
