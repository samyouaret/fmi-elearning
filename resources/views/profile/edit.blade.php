@extends('layouts.app')
@section('content')
  <div class="card">
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title text-center">
          your information
        </h3>
      </div>
      <form class="form" action="/profile/{{$id}}" method="post" enctype="multipart/form-data">
        @method('PUT')
        @csrf
        <div class="card border-0 mb-3">
          <img class="card-img  rounded-circle my-2 mx-auto w-25 h-25" src="/storage/profile_image/{{Auth::user()->image}}" alt="user profile image"/>
          <div class="form-group">
            <div class="custom-file">
              <input type="file" name="profile_image" class="custom-file-input"
              id="profile_image">
              <label class="custom-file-label" for="profile_image">Choose profile image...</label>
              <div class="invalid-feedback">Example invalid custom file feedback</div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="university" class="form-control-label m-2">university</label>
         <select class="form-control" name="university">
           @foreach ($universities as $univ)
            <option value="{{$univ->id}}" @if (isset($profile) && $profile->university_id == $univ->id)
              selected
            @endif>{{$univ->name}}</option>
           @endforeach
         </select>
        </div>
        <div class="form-group">
          <label for="department" class="form-control-label m-2">department</label>
          <select class="form-control" name="department">
           @foreach ($departments as $dep)
             <option value="{{$dep->id}}" @if (isset($profile) && $profile->department_id == $dep->id)
              selected
             @endif>{{$dep->name}}</option>
           @endforeach
         </select>
       </div>
       <div class="form-group">
        <label for="gender" class="form-control-label m-2">gender</label>
        <select class="form-control" name="gender">
          <option value="1">male</option>
          <option value="2">female</option>
        </select>
      </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-light btn-block btn-lg" name="submit">setting and continue</button>
        </div>
      </form>
    </div>
  </div>
  <div id="test">
  </div>
@endsection
@push('scripts')
  <!-- Scripts -->
<script src="{{ asset('js/profile/edit.js') }}" defer></script>
@endpush
