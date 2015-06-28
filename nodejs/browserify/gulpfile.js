var gulp = require('gulp');
var browserify = require('browserify');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var server = require('./lib/gulp_util');
var tinylr = require('tiny-lr')();	// the livereload server implementation
var path = require('path');

var liveReloadPort = 12722;

gulp.task('default', ['serve'], function() {

	gulp.watch('./dist/*', function(event) {
		var fileName = path.relative(__dirname, event.path);
		console.log('file change, livereload ---> ' + fileName);
		tinylr.changed({
			body: {
				files: [fileName]
			}
		});
	});

	console.log('all done, current __dirname: ' + __dirname);
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
	// tinylr will start the actual livereload server.
	tinylr.listen(liveReloadPort);
});

gulp.task('inject', ['build'], function(){
	return gulp.src('./app.html')
		.pipe(inject(gulp.src('./dist/bundle.js'), {read:false}), {
			addRootSlash: false
		})
		.pipe(gulp.dest('./dist'));
});