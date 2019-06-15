@extends('layouts.app')
@section('content')
<div class="container">
      <div class="card">
         <div class="card-header">Enrolled Courses</div>
         <div class="card-body">
            <div id="dashboard"></div>
         </div>
   </div>
      <div class="card my-3">
         <h4 class="card-header">Courses you may enroll</h4>
         <div class="card-body">
            <div id="home"></div>
         </div>
      </div>
    <div class="row justify-content-center">
    </div>
</div>
@endsection
@prepend('scripts')
     <!-- scripts -->
<script src="{{ asset('js/home/dashboard.js') }}" defer></script>
