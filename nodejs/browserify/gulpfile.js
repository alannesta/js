var gulp = require('gulp');
var browserify = require('browserify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var server = require('./lib/gulp_util');

gulp.task('default', ['serve'], function() {
	console.log('all done');
});

gulp.task('build', ['concat'], function() {
	return browserify('./tmp/all.js')
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./dist/'));
});

gulp.task('concat', function() {
	return gulp.src('./app/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./tmp'))
});

gulp.task('serve', ['inject'], function() {
	server.create();
});

gulp.task('inject', ['build'], function(){
	return gulp.src('./app.html')
		.pipe(inject(gulp.src('./dist/bundle.js'), {read:false}), {
			addRootSlash: false,
			ignorePath: 'dist'
		})
		.pipe(gulp.dest('./dist'));
});