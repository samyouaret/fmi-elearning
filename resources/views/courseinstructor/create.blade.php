@extends('layouts.app')

@section('content')
   <div id="course"></div>
@endsection
@prepend('scripts')
   <script src="{{ asset('js/courseinstructor/create.js') }}" defer></script>
@endprepend
