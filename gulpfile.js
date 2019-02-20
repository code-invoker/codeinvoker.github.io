const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');

gulp.task('styles:dev', () => {
    return gulp.src('./src/assets/styles/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/public'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles:prod', () => {
    return gulp.src('./src/assets/styles/app.css')
        .pipe(postcss())
        .pipe(gulp.dest('./src/public'));
});

gulp.task('scripts:dev', () => {
    return gulp.src('./src/assets/scripts/app.js')
        .pipe(sourcemaps.init())
        .pipe(webpack({
            mode: 'development',
            devtool: 'source-map',
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/public'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts:prod', () => {
    return gulp.src('./src/assets/scripts/app.js')
        .pipe(webpack({
            mode: 'production',
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

    gulp.watch('./src/assets/styles/**/*.css', gulp.series('styles:dev'));
    gulp.watch('./src/assets/scripts/**/*.js', gulp.series('scripts:dev'));
}));

gulp.task('prod', gulp.series('styles:prod', 'scripts:prod'));

gulp.task('default', gulp.series('dev'));
