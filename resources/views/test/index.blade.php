@section('title',"the parent page")
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>@yield('title')</title>
  </head>
  <body>

  </body>
</html>
@section('content')
  <h2>parent content</h2>
@endsection
@yield('content')
@stack('scripts')
