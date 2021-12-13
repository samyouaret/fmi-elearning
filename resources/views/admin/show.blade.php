@extends('layouts.app')
@section('content')
   <div id="admin"></div>
@endsection

@prepend('scripts')
<script src="{{ asset('js/admin/admin.js') }}" defer></script>
@endprepend
