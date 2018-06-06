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
    gulp.src("js/*.js")
         .pipe(babel({
             presets: ['env']
         }))
         .pipe(uglify())
         .pipe(gulp.dest('dist/js/'))
);