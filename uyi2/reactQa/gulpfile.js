var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	port = process.env.port || 5000;

gulp.task('browserify',function(){
	gulp.src('./app/js/main.js')
	.pipe(browserify({
		transform: 'reactify',
	}))
	.pipe(gulp.dest('./dist/js'))
});

// live reload 
gulp.task('connect',function(){
	connect.server({
		// root:'./',
		port: port,
		livereload: true,
	})
})

// reload Js 
gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
	.pipe( connect.reload() )
})

gulp.task('html',function(){
	gulp.src('./app/**/*.html')
	.pipe( connect.reload() )
});

gulp.task('watch',function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./app/**/*.html',['html']);
	gulp.watch('./app/js/**/*.js',['browserify']);
})

gulp.task('default',['browserify']);

gulp.task('serve',['browserify','connect','watch']);
