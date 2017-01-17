var gulp        = require('gulp');
var pug         = require('gulp-pug');
var browserSync = require('./browser-sync').server;
var plumber     = require('gulp-plumber');
var options     = require('../options').pug;
var errorHandler = require('../utils/errorHandler');
var helpers = require('../utils/merge-styles');
var inlineCSS = require('gulp-inline-css');

options.options.locals = {
	mergeAttributes: function (a, b) {

		// Merge styles, if any
		if (a.style && b.style) {
			b.style = helpers.mergeStyles(a.style, b.style);
			delete a.style;
		}

		// Merge the rest of the attributes
		return Object.assign({}, a, b);
	},
	helpers,
}

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