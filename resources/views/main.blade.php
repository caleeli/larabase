<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="favicon.ico">
    <title>{{config('app.name')}}</title>
    <!-- if valid session -->
    @if (Auth::check())
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>

<body>
    <noscript>
        <strong>Lo sentimos pero <b>{{config('app.name')}}</b> no funciona correctamente sin habilitado JavaScript.
            Por favor, activelo para continuar.</strong>
    </noscript>
    @if (Auth::check())
    <div id="app"></div>
    @endif
</body>

</html>