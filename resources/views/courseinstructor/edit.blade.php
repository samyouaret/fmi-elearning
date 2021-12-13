@extends('layouts.app')

@section('content')
   <div id="course"></div>
@endsection
@prepend('scripts')
   <script src="{{ asset('js/courseinstructor/edit.js') }}" defer></script>
@endprepend
