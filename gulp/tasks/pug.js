var gulp         = require('gulp');
var pug          = require('gulp-pug');
var plumber      = require('gulp-plumber');
var inlineCSS    = require('gulp-inline-css');
var options      = require('../options').pug;
var browserSync  = require('./browser-sync').server;
var errorHandler = require('../utils/errorHandler');


/**
 * Compile pug files in the views directory
 * @return {Object} Gulp stream
 */
function compilePug () {

	// Exit criteria
	if (!options) return;

	// Define source files
	return gulp.src(options.views)

	// Catch and log errors
	.pipe(plumber(errorHandler))

	// Compile files
	.pipe(pug(options.options))

	// Inline CSS
	.pipe(inlineCSS({
		applyStyleTags: true,
  	applyLinkTags: true,
  	removeStyleTags: false,
  	removeLinkTags: false
	}))

	// Save to destination
	.pipe(gulp.dest(options.dest))

	// Reolad page
	.pipe(browserSync.stream());
}

// Export task
module.exports = compilePug;