'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('serve', () => {
    gulp.watch('*.html').on('change', browserSync.reload);

    browserSync.init({
        server: './'
    });
});

gulp.task('bundle', () =>
    gulp.src(['js/app.js', 'js/map.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
);