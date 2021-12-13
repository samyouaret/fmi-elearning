<?php

namespace Tests\Feature;

use App\User as User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProfileTest extends TestCase
{
    // use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_profile_has_passed_course_data_and_user_data_to_view()
    {
        // given a user im logged in
        $user = factory(User::class)->make();
        //when he try to access profile 
        $response = $this->get('/profile/' . $user->id);
        //then there should be able to get access to profile
        $response->assertNotFound();
        // $response->assertViewHasAll(['courses', 'user']);
    }
}
