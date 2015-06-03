var gulp         = require('gulp');
var jade         = require('gulp-jade');
var browserSync  = require('browser-sync');
var options      = require('../options').jade;
var handleErrors = require('../utils/handleErrors');
var kickstarter  = require('../utils/kickstarter');


/**
 * Compile jade files in the views directory
 * @return {Object} Gulp stream
 */
function compileJade () {

	// Define source files
	return gulp.src( options.views )

	// Compile files
	.pipe( jade({
		pretty: !options.minify,
		locals: options.locals
	}))

	// Handle them errors
	.on( 'error', handleErrors)

	// Save to destination
	.pipe( gulp.dest( options.dest ) )

	// Reolad page
	.pipe(browserSync.reload({stream: true}));
}

// Register task
gulp.task('jade', ['xml2js'], compileJade);

// Register event handler
kickstarter.on('gulp.dev', function () {
	gulp.watch(options.src, ['jade']);
});
kickstarter.on('gulp.stage', compileJade);

// Export task
module.exports = compileJade;


var through 	= require('through2');
var xml2json 	= require('gulp-xml2json');

function convert() {
	return gulp.src('src/jade/_dict/dict.xml')
		.pipe(xml2json())
		.pipe(test());
};

function test() {
	return through.obj(function (file, enc, cb) {
		console.log(String(file.contents));
		/*var full =
			'\n' +
			(file.cwd ? 'cwd:   ' + prop(tildify(file.cwd)) : '') +
			(file.base ? '\nbase:  ' + prop(tildify(file.base)) : '') +
			(file.path ? '\npath:  ' + prop(tildify(file.path)) : '') +
			(file.stat && opts.verbose ? '\nstat:' + prop(stringifyObject(file.stat, {indent: '       '}).replace(/[{}]/g, '').trimRight()) : '') +
			'\n';

		var output = opts.minimal ? prop(tildify(path.relative(process.cwd(), file.path))) : full;

		count++;

		gutil.log(opts.title + ' ' + output);

		cb(null, file);*/
	}, function (cb) {
		//gutil.log(opts.title + ' ' + chalk.green(count + ' items'));
		cb();
	});
};

/*var xml2js	= require('xml2js');
var fs			= require('fs');
var parser	= new xml2js.Parser();

parser.addListener('end', function(result) {

	fs.writeFile(__dirname + '../../../src/jade/_dict/dict.json', JSON.stringify(result));
	console.log('done');
});

fs.readFile(__dirname + '../../../src/jade/_dict/dict.xml', function(err, data) {
	parser.parseString(data);
});*/

gulp.task('xml2json', convert);