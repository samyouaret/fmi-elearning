<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSubSubjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('sub_subject', function(Blueprint $table)
		{
			$table->foreign('subject_id', 'sub_subject_subject')->references('id')->on('subject')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('sub_subject', function(Blueprint $table)
		{
			$table->dropForeign('sub_subject_subject');
		});
	}

}
