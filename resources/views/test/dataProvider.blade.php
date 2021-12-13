@extends('layouts.app')

@section('content')
   <div id="app"></div>
@endsection
@prepend('scripts')
   <script src="{{ asset('js/formComponents/DataProviderTest.js') }}" defer></script>
@endprepend
