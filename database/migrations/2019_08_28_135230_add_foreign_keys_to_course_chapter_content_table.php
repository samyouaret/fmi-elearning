<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCourseChapterContentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('course_chapter_content', function(Blueprint $table)
		{
			$table->foreign('course_chapter_id', 'course_chapter_content_course_chapter')->references('id')->on('course_chapter')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('course_chapter_content', function(Blueprint $table)
		{
			$table->dropForeign('course_chapter_content_course_chapter');
		});
	}

}
