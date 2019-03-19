@navbar
<div id="app">
  @include('inc.messages')
        <main class=" container py-4">
            @yield('content')
        </main>
</div>
@stack('scripts')
</body>
</html>
