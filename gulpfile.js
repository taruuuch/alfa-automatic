var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    autoprefixer= require('gulp-autoprefixer'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    uncss       = require('gulp-uncss'),
    cleanCss    = require('gulp-clean-css'),
    print       = require('gulp-print');

// Refresh full view
gulp.task('browser-sync', ['sass','jade'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});
var autoprefixerOptions = {
  browsers: ['ie > 8','> 1%']
};
gulp.task('sass', function () {
  return gulp.src('src/sass/main.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(uncss({
            html: ['dist/**/*.html'],
            ignore: ['.collapsing','.navbar-collapse.in','.collapse.in']
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
gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
gulp.task('browser-reload',function () {
    browserSync.notify(messages.simple)
    browserSync.reload()
})
gulp.task('load-js',function () {
  gulp.src(['node_modules/jquery/dist/jquery.min.js','src/js/**/*.js'])
  .pipe(gulp.dest('dist/js'))
})
gulp.task('load-images',function(){
  gulp.src('src/images/*')
  .pipe(gulp.dest('dist/images'))
})
// gulp.task('load-fonts',function(){
//   gulp.src('src/fonts/**/*')
//   .pipe(gulp.dest('dist/fonts'))
// })
// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(['src/sass/**/*.sass','src/sass/**/*.scss'], ['sass']);
    gulp.watch('src/jade/**/*.jade',['jade']);
    gulp.watch(['dist/*.html']).on("change",browserSync.reload)
    gulp.watch(['src/images/**/*'],['load-images'])
    // gulp.watch(['*.html', '_layouts/*.html', '_posts/*','_includes/*','*.md'], ['jekyll-rebuild']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['load-js','load-images','browser-sync', 'watch']);
