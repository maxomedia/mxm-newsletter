var gulp         = require('gulp');
var pug         = require('pug');
var request      = require('request');
var through      = require('through2');
var path         = require('path');
var File         = require('vinyl');
var browserSync  = require('browser-sync');
var options      = require('../options').newsletter;
var errorHandler = require('../utils/errorHandler');
var data         = require('gulp-data');
var ext          = require('gulp-util').replaceExtension;
var plumber      = require('gulp-plumber');

/**
 * Compile pug files in the newsletter/views directory
 * @return {Object} Gulp stream
 */
function compileNewsletter (gulpCallback) {
	getDict(function(dict,langs) {

		// Define source files
		return gulp.src( options.views )

		.pipe(plumber(errorHandler))
		
		// Compile files
		.pipe(through.obj(function(file,enc,callback) {
			for(var lang in dict) {
				var dictionary = JSON.stringify(dict[lang]);
				var template   = file.contents.toString('utf8');
				var base       = file.base;
				var name       = path.basename(file.history).replace(/\.pug$/,'-' + lang) + '.html';
				var filePath   = path.join(base, name);

				console.log(ext(file.path, '-' + lang + '.html'));
				var compileFn = pug.compile(template, {
					filename: filePath
				});

				var html = compileFn({
					dict: dict[lang]
				});

				this.push(new File({
					base: base,
					path: filePath,
					contents: new Buffer(html)
				}));
			}

			callback(null, null);
		}))

		// Save to destination
		.pipe(gulp.dest(options.dest))

		// Reolad page
		.pipe(browserSync.reload({stream: true}));
	});
};

// Load Dictionary
function getDict(callback) {
	request({
		url: options.dictURL,
		json: true
	}, function(error, response, body) {
		if(error)
			console.log(error);

		var dict = body || {};
		callback(dict, getLangs(dict));
	});
};

// Get Languages
function getLangs(dict) {
	if(dict === {})
		return false;

	var langs = [];
	for(var lang in dict) {
		langs.push(lang);
	}

	return langs;
};

function dev () {
	if (!options) return;

	return watch(options.src, function () {
		gulp.start('newsletter');
	});
}

// Export task
module.exports = compileNewsletter;
