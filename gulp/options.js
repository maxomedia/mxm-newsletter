var path = require('path');

/*
 *  Instructions:
 *  =============
 *  
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise. If gulpfile.js is a folder,
 *	   think of it as a file, gulp treats it the same way.
 *	   
 *	2. If you don't want a task to be running,
 *	   comment out or delete its options.
 *	   
 *	3. Modify dest and webroot to your liking and you are good
 *	   to go, if your folder structure meets the defaults set.
 */

var source = './src';

// Output folder for assets, relative to gulpfile.js
var destination = './dist';

// Route to your asset folder from a browser point of view
var webroot = '';

var options = {

	// Project name (used as the console title)
	name: 'mxm-newsletter',

	newsletter: {

		// Jade files to watch for changes
		src: 'src/newsletter/**/*.jade',

		// Entry points for actual pages
		views: 'src/newsletter/views/**/*.jade',

		// Dictionary ID
		dictURL: 'https://raw.githubusercontent.com/maxomedia/mxm-newsletter/develop/dist/json/dict.json',

		// Destination for html files
		dest: destination
	},

	sass: {
		src: source + '/sass/**/*.scss',
		main: source + '/sass/main.scss',
		dest: destination + '/css',
		
		options: {
			nodeSass: {
				includePaths: ['node_modules'],
			},
			autoprefixer: {
				browsers: ['last 2 versions']
			},
			sourcemaps: {
				sourceMappingURLPrefix: webroot + '/css'
			}
		}
	},

	// Static webserver and livereload
	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		server: { baseDir: destination },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		// proxy: 'localhost:60000'
		
		// Wether to open new tab on start or not
		open: true,
		logFileChanges: false
	},

	// These are required for the 
	// extended options, do not alter
	dest: destination,
	webroot: webroot,
	src: source
};

// Export them options
module.exports = options;