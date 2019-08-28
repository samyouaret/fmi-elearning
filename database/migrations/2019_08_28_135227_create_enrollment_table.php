<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEnrollmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('enrollment', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->bigInteger('course_id')->index('enrollment_course');
			$table->timestamp('enrollment_date')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->char('is_paid_subscription', 1)->default(0);
			$table->bigInteger('user_id')->index('enrollment_user');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('enrollment');
	}

}
