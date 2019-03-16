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
			$table->bigInteger('course_owner')->index('course_instructor');
			$table->string('title', 200);
			$table->string('description', 4000)->nullable();
			$table->integer('num_of_chapters')->nullable();
			$table->integer('course_fee')->nullable();
			$table->integer('language_id')->default(1)->index('course_language');
			$table->string('cover_image', 191)->nullable();
			$table->boolean('level')->nullable();
			$table->integer('sub_subject_id')->index('course_sub_subject');
			$table->boolean('is_published')->default(0);
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
