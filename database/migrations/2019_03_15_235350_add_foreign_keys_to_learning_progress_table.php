<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToLearningProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('learning_progress', function(Blueprint $table)
		{
			$table->foreign('course_chapter_content_id', 'learning_prgs_crs_chapter_cnt')->references('id')->on('course_chapter_content')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('enrollment_id', 'learning_progress_enrollment')->references('id')->on('enrollment')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('learning_progress', function(Blueprint $table)
		{
			$table->dropForeign('learning_prgs_crs_chapter_cnt');
			$table->dropForeign('learning_progress_enrollment');
		});
	}

}
