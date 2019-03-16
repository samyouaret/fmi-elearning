<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTagCourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tag_course', function(Blueprint $table)
		{
			$table->foreign('course_id', 'tag_course_joiner_course')->references('id')->on('course')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('tag_id', 'tag_course_joiner_tag')->references('id')->on('tag')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tag_course', function(Blueprint $table)
		{
			$table->dropForeign('tag_course_joiner_course');
			$table->dropForeign('tag_course_joiner_tag');
		});
	}

}
