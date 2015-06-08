var gulp         = require('gulp');
var jade         = require('jade');
var request 		 = require('request');
var through 		 = require('through2');
var path 				 = require('path');
var File 				 = require('vinyl');
var browserSync  = require('browser-sync');
var options      = require('../options').newsletter;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');

/**
 * Compile jade files in the newsletter/views directory
 * @return {Object} Gulp stream
 */
function compileNewsletter (gulpCallback) {
	getDict(function(dict,langs) {
		// Define source files
		gulp.src( options.views )
		
		// Compile files
		.pipe(through.obj(function(file,enc,callback) {
			for(var lang in dict) {
				var dictionary 	= JSON.stringify(dict[lang]);
				var template 		= file.contents.toString('utf8');
				var base 				= file.base;
				var name 				= path.basename(file.history).replace(/\.jade$/,'-' + lang) + '.html';
				var filePath 		= path.join(base, name);

				var compileFn 	= jade.compile(template, {
					filename: filePath
				});

				var html 				= compileFn({
					dict: dict[lang]
				});

				this.push(new File({
					base: base,
					path: filePath,
					contents: new Buffer(html)
				}));
			}

			callback();
		}))

		// Handle them errors
		.on( 'error', handleErrors)

		// Save to destination
		.pipe( gulp.dest( options.dest ) )

		// Notify Gulptask has ended
		.on('end', function() {
			gulpCallback();
		})

		// Reolad page
		.pipe(browserSync.reload({stream: true}));

	});
};

// Load Dictionary
function getDict(callback) {
	request({
		url: 'http://nldict.mxm.ch/Get/' + options.dictID,
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

// Register task
gulp.task('newsletter', compileNewsletter);

// Register event handler
kickstarter.on('gulp.dev', function () {
	gulp.watch(options.src, ['newsletter']);
});
kickstarter.on('gulp.stage', compileNewsletter);

// Export task
module.exports = compileNewsletter;
