@extends('layouts.app')
@section('content')
   <div id="enrollment"></div>
@endsection

@prepend('scripts')
<script src="{{ asset('js/enrollment/enrollment.js') }}" defer></script>
@endprepend
