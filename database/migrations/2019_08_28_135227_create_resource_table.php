<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateResourceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('resource', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->string('url', 191);
			$table->bigInteger('course_chapter_content_id')->index('resource_course_chapter_content');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('resource');
	}

}
