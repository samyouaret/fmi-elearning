@extends('layouts.app')
@section('content')

@endsection
{{-- <script src="{{asset('js/app.js')}}" charset="utf-8"></script> --}}
@prepend('scripts')
     <!-- scripts -->
<script src="{{ asset('js/app.js') }}" defer></script>
@endprepend
