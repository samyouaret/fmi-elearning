@extends('layouts.app')
@section('content')
  <div id="profile">
  </div>
@endsection
@prepend('scripts')
     <!-- scripts -->
<script src="{{ asset('js/app.js') }}" defer></script>
<script src="{{ asset('js/profile/edit.js') }}" defer></script>
@endprepend
