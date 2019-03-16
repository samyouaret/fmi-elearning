<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToResourceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('resource', function(Blueprint $table)
		{
			$table->foreign('course_chapter_content_id', 'resource_course_chapter_content')->references('id')->on('course_chapter_content')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('resource', function(Blueprint $table)
		{
			$table->dropForeign('resource_course_chapter_content');
		});
	}

}
