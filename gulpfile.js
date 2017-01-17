var gulp          = require('gulp');
var childProcess  = require('child_process');
var package       = require('./package.json');
var options       = require('./gulp/options');
var browserSync   = require('./gulp/tasks/browser-sync');
var pugTask       = require('./gulp/tasks/pug');
var staticTask    = require('./gulp/tasks/static');
var sassTask      = require('./gulp/tasks/sass');

gulp.task('default', ['watch']);
gulp.task('build', ['static', 'sass', 'pug']);

gulp.task('watch', ['build', 'serve'], function () {
	gulp.watch(options.pug.src, ['pug']);
	gulp.watch(options.sass.src, ['sass']);
	gulp.watch(options.static.src, ['static']);
});

gulp.task('serve', ['build'], browserSync.task);
gulp.task('pug', pugTask);
gulp.task('sass', sassTask);
gulp.task('static', staticTask);

// Set console title to package name
childProcess.exec('title ' + package.name);