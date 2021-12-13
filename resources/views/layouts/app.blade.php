@navbar
<div id="app">
        <main class=" container py-4" style="min-height:550px">
           @include('inc.messages')
            @yield('content')
        </main>
</div>
@stack('scripts')
@footer
</body>
</html>
