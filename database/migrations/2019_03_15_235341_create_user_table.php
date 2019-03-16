<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user', function(Blueprint $table)
		{
			$table->bigInteger('id', true);
			$table->string('first_name', 100);
			$table->string('last_name', 100);
			$table->string('email', 191);
			$table->string('remember_token', 100)->nullable();
			$table->dateTime('email_verified_at')->nullable();
			$table->string('password', 100);
			$table->timestamps();
			$table->string('image', 191)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user');
	}

}
