'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('static', function () {
  return gulp.src('./src/scss/static.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass'])
})
