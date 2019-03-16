<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLearningProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('learning_progress', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->bigInteger('enrollment_id')->index('learning_progress_enrollment');
			$table->bigInteger('course_chapter_content_id')->index('learning_prgs_crs_chapter_cnt');
			$table->integer('begin_timestamp');
			$table->timestamp('completion_timestamp')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->char('status', 1)->comment('“P” for in progress
“C” for complete');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('learning_progress');
	}

}
