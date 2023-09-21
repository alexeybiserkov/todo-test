const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Specify 'sass' as the compiler
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('rollup-plugin-babel');

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

// Rollup configuration
const rollupConfig = {
  input: 'src/js/app.js',
  output: {
    file: 'dist/js/app.min.js',
    format: 'iife', // Change this to 'es' if you want ES6 module output
  },
  plugins: [
    babel({
      presets: ['@babel/preset-env'],
    }),
    nodeResolve(),
    commonjs(),
  ],
};

gulp.task('js', async function () {
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write(rollupConfig.output);
  browserSync.reload();
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
