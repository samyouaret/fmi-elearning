<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCourseChapterContentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('course_chapter_content', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->string('title', 60);
			$table->integer('course_chapter_id')->index('course_chapter_content_course_chapter');
			$table->integer('content_type');
			$table->char('is_mandatory', 1);
			$table->integer('time_required_in_sec');
			$table->boolean('is_open_for_free');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('course_chapter_content');
	}

}
