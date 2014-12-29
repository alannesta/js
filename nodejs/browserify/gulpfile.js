var gulp = require('gulp');
var browserify = require('browserify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');

gulp.task('default', ['inject'], function() {
	return browserify('./app/demo.js')
	.bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'));

});

gulp.task('inject', function(){
	var jsfile = gulp.src('./dist/*.js');
	var target = gulp.src('./demo.html');
	return target.pipe(inject(gulp.src('./dist/*.js')), {addRootSlash: false}).
			pipe(gulp.dest('./'));
})