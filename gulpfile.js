const gulp = require('gulp');
const postcss = require('gulp-postcss');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');

gulp.task('styles', () => {
  return gulp.src('./src/assets/styles/app.css')
    .pipe(postcss())
    .pipe(gulp.dest('./src/public'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () => {
  return gulp.src('./src/assets/scripts/app.js')
    .pipe(webpack({
      mode: 'development',
      devtool: 'inline-source-map',
      output: {
        filename: 'app.js'
      },
      module: {
        rules: [{
          exclude: /node_modules/,
          loader: 'babel-loader'
        }]
      }
    }))
    .pipe(gulp.dest('./src/public'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    injectChanges: true,
    open: false,
    notify: false,
    reloadOnRestart: true,
    logLevel: 'warn'
  });
});

gulp.task('dev', gulp.parallel('serve', () => {
  gulp.watch([ './dist/**/*.html' ]).on('change', (path) => {
    return gulp.src(path)
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.watch('./src/assets/styles/**/*.css', gulp.series('styles'));
  gulp.watch('./src/assets/scripts/**/*.js', gulp.series('scripts'));
}));

gulp.task('prod', gulp.series('styles', 'scripts'));

gulp.task('default', gulp.series('dev'));
