var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    autoprefixer= require('gulp-autoprefixer'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    uncss       = require('gulp-uncss'),
    cleanCss    = require('gulp-clean-css'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    print       = require('gulp-print');

var autoprefixerOptions = {
  browsers: ['ie > 8','> 1%']
};

gulp.task('browser-sync', ['sass','jade'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('src/sass/main.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(uncss({
            html: ['dist/**/*.html']
        }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function(){
  gulp.src(['src/jade/**/*.jade'])
    .pipe(print())
    .pipe(jade())
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-reload',function () {
  browserSync.notify(messages.simple)
  browserSync.reload()
});

gulp.task('load-js',function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'src/js/**/*.js'
  ])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('load-images',function(){
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('images', ['clean'], function() {
  return gulp.src('dist/images')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(pngquant())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch(['src/sass/**/*.sass','src/sass/**/*.scss'], ['sass'])
  gulp.watch('src/jade/**/*.jade',['jade'])
  gulp.watch(['dist/*.html']).on("change",browserSync.reload)
  gulp.watch(['src/images/**/*'],['load-images']);
});

gulp.task('default', ['load-js','load-images','browser-sync', 'watch']);
