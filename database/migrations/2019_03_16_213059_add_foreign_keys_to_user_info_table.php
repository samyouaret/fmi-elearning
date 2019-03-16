<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserInfoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_info', function(Blueprint $table)
		{
			$table->foreign('department_id', 'user_info_department')->references('id')->on('department')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('university_id', 'user_info_university')->references('id')->on('university')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('id', 'user_info_user')->references('id')->on('user')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_info', function(Blueprint $table)
		{
			$table->dropForeign('user_info_department');
			$table->dropForeign('user_info_university');
			$table->dropForeign('user_info_user');
		});
	}

}
