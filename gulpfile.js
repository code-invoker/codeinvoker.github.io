'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: '127.0.0.1:4000',
    open: false,
    notify: false,
    reloadOnRestart: true,
    files: [ './dist' ]
  });
});

gulp.task('watch', [ 'browser-sync' ], () => {
  gulp.watch('./dist').on('change', (e) => {
    return gulp.src(e.path)
      .pipe(browserSync.reload());
  });
});

gulp.task('default', [ 'watch' ]);
