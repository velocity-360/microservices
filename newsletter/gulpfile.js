var gulp = require('gulp')
var less = require('gulp-less')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var path = require('path')


gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/bootstrap.css',
                './public/css/stack-interface.css',
                './public/css/socicon.css',
                './public/css/lightbox.min.css',
                './public/css/flickity.css',
                './public/css/iconsmind.css',
                './public/css/theme.css',
                './public/css/custom.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            [
                './public/fonts/**'
            ]
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

// gulp.task('copy-entypo', function(){
//     return gulp.src(
//             ['./dist/assets/icons/entypo/fonts/**']
//         )
//         .pipe(gulp.dest('./dist/css/fonts/'))
// })

gulp.task('js', function(){
    return gulp.src(
    		[
                './public/js/jquery-3.1.1.min.js',
                './public/js/flickity.min.js',
                './public/js/easypiechart.min.js',
                './public/js/parallax.js',
                './public/js/typed.min.js',
                './public/js/datepicker.js',
                './public/js/isotope.min.js',
                './public/js/ytplayer.min.js',
                './public/js/lightbox.min.js',
                './public/js/granim.min.js',
                './public/js/countdown.min.js',
                './public/js/twitterfetcher.min.js',
                './public/js/spectragram.min.js',
                './public/js/smooth-scroll.min.js',
                './public/js/scripts.js',
                './public/js/stripe.js'
    		]
    	)
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'));
})


gulp.task('watch', function() {
    gulp.watch(
        [
            './public/less/**.less',
            './src/serverapp.js',
            './src/*/**.js',
            './src/*/*/**.js',
            './src/*/*/*/**.js'
        ], ['es6-es5'])
})

gulp.task('prod', ['js', 'css', 'copy-fonts'], function(){})
gulp.task('default', ['js', 'css', 'copy-fonts', 'watch'], function(){})

