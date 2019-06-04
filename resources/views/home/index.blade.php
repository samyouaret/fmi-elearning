@extends('layouts.app')
@section('content')
   <div id="home"></div>
@endsection

@prepend('scripts')
<script src="{{ asset('js/home/home.js') }}" defer></script>
@endprepend
