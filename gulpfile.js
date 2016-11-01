'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imageop = require('gulp-image-optimization');
var imagemin = require('gulp-imagemin');
var image = require('gulp-image');

gulp.task('sass', function () {
  return gulp.src('css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('images', function(cb) {
    gulp.src(['img/**/*.png','img/**/*.jpg','img/**/*.gif','img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(imagemin([imagemin.jpegtran()]))
    .pipe(image())
    .pipe(gulp.dest('images')).on('end', cb).on('error', cb);
});
