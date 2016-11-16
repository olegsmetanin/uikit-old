'use strict';

var gulp = require('gulp'),
    webpack = require('webpack'),
    gutil = require('gutil'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    eslint = require('gulp-eslint'),
    tslint = require('gulp-tslint');

process.env.NODE_ENV = 'development';

gulp.task('clean', function() {
    return gulp.src(['dist']).pipe(clean());
});

gulp.task('jshint', function() {
    return gulp.src(['*.js', './tools/webpack/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
    return gulp.src(['*.js', './tools/webpack/**/*.js'])
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('eslint', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('jslint', function(done) {
    runSequence('eslint', 'jshint', 'jscs', done);
});

gulp.task('tslint', function() {
    return gulp.src([
            'src/**/*.ts',
            'src/**/*.tsx',
            'test/**/*.ts',
            'test/**/*.tsx'
        ])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

gulp.task('lint', function(done) {
    runSequence('tslint', /*'jslint',*/ done);
});

gulp.task('copy', function() {
    return gulp.src(['webpublic/**/*']).pipe(gulp.dest('dist'));
});

gulp.task('compile', function(done) {
    process.env.NODE_ENV = 'production';
    var webpackConfig = require('./webpack.config.js');
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        done();
    });
});

gulp.task('rundevserver', function() {
    require('./devserver.js');
});

gulp.task('run', function(done) {
    runSequence('clean', ['copy', 'rundevserver'], done);
});

gulp.task('build', function(done) {
    runSequence('clean', ['copy', 'compile'], done);
});

gulp.task('default', ['build']);