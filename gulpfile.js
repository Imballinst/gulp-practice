// Dependencies

var gulp = require('gulp');
var scss = require('gulp-scss');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// Variables

var basePaths = {
  dev: 'dev/assets/',
  dst: 'dist/assets/'
};

var paths = {
  src: {
    scss: basePaths.dev + 'scss/[^_]*.scss',
    js: basePaths.dev + 'js/**/*.js',
    img: basePaths.dev + 'img/**/*.+(png|jpg|gif|svg)',
    font: basePaths.dev + 'fonts/**/*'
  },
  dst: {
    css: basePaths.dev + 'css',
    img: basePaths.dst + 'img',
    font: basePaths.dst + 'fonts',
  },
  html: 'dev/*.html'
};

// Precompile and Watch

gulp.task('scss', function(){
  return gulp.src(paths.src.scss)
    .pipe(scss({
      noCache: true
    })) // Using gulp-scss
    .pipe(gulp.dest(paths.dst.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

gulp.task('watch', function (){
  gulp.watch(paths.src.scss, ['scss']);
  gulp.watch(paths.html, browserSync.reload);
  gulp.watch(paths.src.js, browserSync.reload);
  // Other watchers
});

// Minify Javascript and Stylesheets

gulp.task('useref', function(){
  return gulp.src(paths.html)
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Minify Images

gulp.task('images', function(){
  return gulp.src(paths.src.img)
  .pipe(imagemin({
    interlaced: true
  }))
  .pipe(gulp.dest(paths.dst.img))
});

// Clear Folder Dist
gulp.task('clean:dist', function() {
  return del.sync('dist/');
});

// Clear Image Cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// Copy

gulp.task('fonts', function() {
  return gulp.src(paths.src.font)
  .pipe(gulp.dest(paths.dst.font))
});

gulp.task('copyjson', function() {
  return gulp
    .src('dev/file.json')
    .pipe(gulp.dest('dist'));
});

// Build Dist and Run Development

gulp.task('build', function(callback) {
  runSequence('clean:dist', 
    ['scss', 'useref', 'images', 'fonts', 'copyjson'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['scss','browserSync', 'watch'],
    callback
  )
})