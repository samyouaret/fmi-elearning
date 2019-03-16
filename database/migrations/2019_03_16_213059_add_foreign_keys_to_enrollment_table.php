<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEnrollmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('enrollment', function(Blueprint $table)
		{
			$table->foreign('course_id', 'enrollment_course')->references('id')->on('course')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('user_id', 'enrollment_user')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('enrollment', function(Blueprint $table)
		{
			$table->dropForeign('enrollment_course');
			$table->dropForeign('enrollment_user');
		});
	}

}
