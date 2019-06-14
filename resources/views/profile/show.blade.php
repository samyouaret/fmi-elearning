@extends('layouts.app')
@section('content')
  <div id="profile">
  </div>
  <div class="container-fluid">
             <div class="bg-white rounded p-3 my-4">
                <div class="container">
                <div class="row">
                  <div class="col-md-5 text-center">
                   <img class="img-fluid" style="border-radius: 50%;max-width:220px"src="/storage/profile_image/{{$user->image}}" alt="user"/>
                   <h4 class="text-center my-2"><strong>{{$user->first_name}} {{$user->last_name}}</strong></h4>
                   @auth
                      @if ($user->id ==Auth::id())
                        <a href="/profile/{{$user->id}}/edit" class="my-2 btn btn-info">
                     edit</a>
                     @endif
                   @endauth
                   @if ($user->user_type==1)
                      <span><strong class="text-muted">enrolled students: {{$user->num_of_enrolled_students}}</strong></span>
                   @endif
                </div>
                <div class="col-md-7 d-flex align-items-center">
                   <div class="container rounded p-5 bg-white">
                      <h4>About :</h4>
                   <p class="lead">
                      {{$user->biography}}
                   </p>
                 </div>
                </div>
             </div>
          </div>
       </div>
       {{-- instructor courses --}}
       @if (count($courses)>0)
          <div class="container">
             <h4 class="my-4">Courses : </h4>
             @foreach ($courses as $key=>$course)
                {{-- <div class="media"> --}}
                 <a  class="media bg-white p-3 my-2 border text-secondary"
                 style="text-decoration:none" href="/enrollment/{{$course->id}}">
                 <img class="align-self-center mr-3"
                 style="max-width:200px" src="/storage/course_image/{{$course->cover_image}}" class="mr-3"/>
                 <div class="media-body">
                   <h5 class="mt-0">{{$course->title}}</h5>
                   {{substr($course->description,0,300)}}
                 </div>
                 </a>
               {{-- </div> --}}
             @endforeach
             <div class="d-flex justify-content-center my-4">
                {{$courses->links()}}
             </div>
        </div>
     @endif
  </div>
@endsection
@prepend('scripts')
     <!-- scripts -->
<script src="{{ asset('js/app.js') }}" defer></script>
<script src="{{ asset('js/profile/viewprofile.js') }}" defer></script>
@endprepend
