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
// .sass('resources/sass/app.scss', 'public/css')
.react('resources/js/profile/edit.js', 'public/js/profile')
// .react('resources/js/profile/viewpeofile.js', 'public/js/profile')
.react('resources/js/courseinstructor/index.js', 'public/js/courseinstructor')
.react('resources/js/courseinstructor/edit.js', 'public/js/courseinstructor')
.react('resources/js/formcomponents/DataProviderTest.js', 'public/js/formcomponents')
.react('resources/js/home/home.js', 'public/js/home')
.react('resources/js/enrollment/enrollment.js', 'public/js/enrollment')
.react('resources/js/admin/admin.js', 'public/js/admin');
//test
// .react('resources/js/curriculum/test.js', 'public/js/curriculum');
// .react('resources/js/formComponents/testIndex.js', 'public/js/formComponents');
