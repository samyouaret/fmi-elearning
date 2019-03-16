<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInstructorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('instructor', function(Blueprint $table)
		{
			$table->bigInteger('id')->primary();
			$table->string('qualification', 200)->nullable();
			$table->string('introduction_brief', 1000)->nullable();
			$table->integer('num_of_published_courses')->nullable();
			$table->integer('num_of_enrolled_students')->nullable();
			$table->integer('num_of_reviews')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('instructor');
	}

}
