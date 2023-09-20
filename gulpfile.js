const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Specify 'sass' as the compiler
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Define paths for your source files and output directories
const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  cssOutput: 'dist/css',
  jsOutput: 'dist/js',
};

// Compile SCSS to CSS, minify, and output
gulp.task('scss', function () {
  return gulp
    .src(paths.scss)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.cssOutput))
    .pipe(browserSync.stream()); // Inject changes without a page refresh
});

// Concatenate and minify JavaScript files
gulp.task('js', function () {
  return gulp
    .src(paths.js)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.jsOutput))
    .pipe(browserSync.stream()); // Inject changes without a page refresh
});

// Watch for changes in SCSS and JavaScript files
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch(paths.scss, gulp.series('scss'));
  gulp.watch(paths.js, gulp.series('js'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Default task to run 'watch' task
gulp.task('default', gulp.series('watch'));
