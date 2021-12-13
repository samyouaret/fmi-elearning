@extends('layouts.app')

@section('content')
   <div id="dashboard"></div>
@endsection
@prepend('scripts')
   <script src="{{ asset('js/courseinstructor/index.js') }}" defer></script>
@endprepend
