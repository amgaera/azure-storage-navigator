"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');
var jsonTransform = require('gulp-json-transform');
var rename = require('gulp-rename');
var runElectron = require('gulp-run-electron');

var config = {
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    fonts: 'node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    images: './src/images/*',
    sass: './src/**/*.scss',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    electronInitJs: './src/electron-init.js',
    mainJs: './src/main.js'
  }
}

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))

  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('sass', function() {
  gulp.src(config.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('fonts', function() {
  gulp.src(config.paths.fonts)
    .pipe(gulp.dest(config.paths.dist + '/fonts'))
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
});

gulp.task('electron-config', function() {
  gulp.src(config.paths.electronInitJs)
    .pipe(rename('init.js'))
    .pipe(gulp.dest(config.paths.dist))

  var simplifyPackageJson = function(packageJson) {
    delete packageJson.dependencies;
    delete packageJson.devDependencies;
    delete packageJson.scripts;

    return packageJson;
  };

  gulp.src('package.json')
    .pipe(jsonTransform(simplifyPackageJson, 2))
    .pipe(gulp.dest(config.paths.dist))
});

gulp.task('content', ['html', 'js', 'sass', 'css', 'fonts', 'images', 'electron-config']);

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('open', ['content'], function() {
  gulp.src('dist').pipe(runElectron());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.sass, ['sass']);
});

gulp.task('default', ['content', 'lint', 'open', 'watch']);
