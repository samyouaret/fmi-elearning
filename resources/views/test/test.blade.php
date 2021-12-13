@extends('test.index')

@section('title',"the test page")
@section('content')
  @parent
  @component('components.alert')
    @slot('title')
      warning
    @endslot
    watch out ?? using show will duplicate your section
  @endcomponent
  <h2>child content</h2>
@endsection
@push('scripts')
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" charset="utf-8"></script>
@endpush
@prepend('scripts')
  <script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>
@endprepend
