<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEnrollementInfoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('enrollement_info', function(Blueprint $table)
		{
			$table->bigInteger('id')->primary();
			$table->integer('num_of_courses_enrolled')->nullable();
			$table->integer('num_of_courses_completed')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('enrollement_info');
	}

}
