"use strict";

var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');


gulp.task('default', function () {
    gulp.watch("*.html").on('change', browserSync.reload);

    browserSync.init({
        server: './'
    });
});

gulp.task('imagemin', () =>
    gulp.src(['img/**/*', "views/images/**"])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('scripts', function () {
    gulp.src('js/**/*.js')
        .pipe(babel())
        .pipe(concat(app.js))
        .pipe(gulp.dest('dist/js'));
});