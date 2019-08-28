<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('course', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->string('title', 200);
			$table->string('description', 4000)->nullable();
			$table->integer('num_of_chapters')->nullable();
			$table->float('course_fee', 10, 0)->nullable()->default(0);
			$table->integer('language_id')->default(1)->index('course_language');
			$table->string('cover_image', 191)->nullable()->default('no_image.png');
			$table->boolean('level')->nullable()->default(1);
			$table->integer('sub_subject_id')->nullable()->default(1)->index('course_sub_subject');
			$table->boolean('is_published')->default(0);
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('update_at')->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('course');
	}

}
