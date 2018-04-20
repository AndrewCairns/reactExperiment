var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		minifyCss = require('gulp-clean-css'),
		autoPrefixer = require('gulp-autoprefixer'),
		plumber = require('gulp-plumber'),		//error handling in CSS
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		babel = require('gulp-babel'),
		del = require('del');

//Server
var	livereload	= require('gulp-livereload');

//Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');


//File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_STYLES_PATH = 'public/css/**/*.css';
var SCSS_STYLES_PATH = 'public/scss/**/*.scss';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';




//Styles - CSS
gulp.task('styles', function(){
	console.log('styles task');

	return gulp.src(['public/css/reset.css', CSS_STYLES_PATH])		//Ensures reset is called first in concat file
		.pipe(plumber(function(err){		//CSS error handling to keep gulp alive
			console.log("CSS styles task error")
			console.log(err)
			this.emit('end');							//method to stop other processes but keeps gulp alive
		}))
		.pipe(sourcemaps.init())				//creates map to allow debugging
		.pipe(autoPrefixer())						//Adds prefixes i.e. -webkit- etc
		.pipe(concat('styles.css'))			//combines all css into one file
		.pipe(minifyCss())							//minifies it
		.pipe(sourcemaps.write())				//implements map to allow debuggig (i.e. splits files into original seperate files in  console)
		.pipe(gulp.dest(DIST_PATH))			//place them back in project - (dest = destination, dist = distribution)
		.pipe(livereload());						//calls live reload when changes are made to files
})




// //Styles - SASS
// gulp.task('styles', function(){
// 	console.log('styles task');

// 	return gulp.src(['public/scss/styles.scss'])		//Ensures reset is called first in concat file
// 		.pipe(plumber(function(err){		//CSS error handling to keep gulp alive
// 			console.log("CSS styles task error")
// 			console.log(err)
// 			this.emit('end');							//method to stop other processes but keeps gulp alive
// 		}))
// 		.pipe(sourcemaps.init())				//creates map to allow debugging
// 		.pipe(autoPrefixer())						//Adds prefixes i.e. -webkit- etc
// 		.pipe(sass({
// 			outputStyle: 'compressed'
// 		}))										//concats and minifies
// 		.pipe(sourcemaps.write())				//implements map to allow debuggig (i.e. splits files into original seperate files in  console)
// 		.pipe(gulp.dest(DIST_PATH))			//place them back in project - (dest = destination, dist = distribution)
// })






//Scripts
gulp.task('scripts', function(){
	console.log('scripts task');

	return gulp.src(SCRIPTS_PATH)						//gets all js files
		.pipe(plumber(function(err){		//JS error handling to keep gulp alive
			console.log("JS task error")
			console.log(err)
			this.emit('end');							//method to stop other processes but keeps gulp alive
		}))
		.pipe(sourcemaps.init())							//creates map to allow debugging
		.pipe(babel({
			presets: ['env']
		}))												
		.pipe(uglify())												//call uglify module on these files
		.pipe(concat('scripts.js'))					//concats all js files into one
		.pipe(sourcemaps.write())				//implements map to allow debuggig (i.e. splits files into original seperate files in  console)
		.pipe(gulp.dest(DIST_PATH))						//place them back in project - (dest = destination, dist = distribution)
		.pipe(livereload());									//calls live reload when changes are made to files
})






//Images
gulp.task('images', function(){
	console.log('images task');

	return gulp.src(IMAGES_PATH)
		.pipe(imagemin(
				[
					imagemin.gifsicle(),			//lossless - default (so by name them they wont be overwritten)
					imagemin.jpegtran(),			//lossless - default (so by name them they wont be overwritten)
					imagemin.optipng(),				//lossless - default (so by name them they wont be overwritten)
					imagemin.svgo(),					//lossless - default (so by name them they wont be overwritten)
					//^^^ Small compression - Less than 10%

					imageminPngquant(),				//lossy - new plugin
					imageminJpegRecompress()	//lossy	- new plugin
					//^^^ Large compression - up tp 80%

				]
			))			//
		.pipe(gulp.dest(DIST_PATH + '/images'))		//places new images in dist folder
})




//Clears files/folder we dont need before adding new ones
gulp.task('clean', function(){
	return del.sync([
			DIST_PATH
		])
})






//Default
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], function(){
	console.log('default');
})			//iterates through tasks in order


//Watch
gulp.task('watch', ['default'], function(){  // default arg means on page load run gulp to get freshest versions of pages
	console.log('watch');
	require('./server.js');
	livereload.listen();

	gulp.watch(SCRIPTS_PATH, ['scripts']);		//if scripts files change - then run 'scripts' task
	// gulp.watch(STYLES_PATH, ['styles']);			//CSS - if css files change - then run 'styles' task
	gulp.watch(CSS_STYLES_PATH, ['styles']);			//SCSS - f css files change - then run 'styles' task

})