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
			$table->bigInteger('student_id')->index('enrollment_student');
			$table->bigInteger('course_id')->index('enrollment_course');
			$table->date('enrollment_date');
			$table->char('is_paid_subscription', 1);
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
