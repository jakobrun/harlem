'use strict';
var gulp = require('gulp'),
	replace = require('gulp-replace'),
	browserify = require('gulp-browserify');

// browserify scripts
gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./client/js/game.js')
        .pipe(browserify({
          insertGlobals : true
        }))
    	.pipe(replace('***PEERJS_API_KEY***', process.env.PEERJS_API_KEY))
        .pipe(gulp.dest('./client/bin'));
});

gulp.task('remotescripts', function () {
    gulp.src('./client/remote/js/remote.js')
        .pipe(replace('***PEERJS_API_KEY***', process.env.PEERJS_API_KEY))
        .pipe(gulp.dest('./client/remote/bin'));
});

gulp.task('server', function () {
	require('./server/');
});

gulp.task('default', ['scripts', 'remotescripts', 'server'], function () {
	gulp.watch('./client/js/**/*.js', ['scripts']);
    gulp.watch('./client/remote/js/**/*.js', ['remotescripts']);
});