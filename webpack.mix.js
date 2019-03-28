const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
.react('resources/js/profile/edit.js', 'public/js/profile')
.react('resources/js/courseinstructor/index.js', 'public/js/courseinstructor')
.react('resources/js/courseinstructor/edit.js', 'public/js/courseinstructor');
// .sass('resources/sass/app.scss', 'public/css');
