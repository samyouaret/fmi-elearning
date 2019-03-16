<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCourseChapterTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('course_chapter', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->bigInteger('course_id')->index('course_chapter_course');
			$table->string('chapter_title', 60);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('course_chapter');
	}

}
