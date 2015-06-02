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

// Output folder for assets, relative to gulpfile.js
var destination = './dist';

// Route to your asset folder from a browser point of view
var webroot = '';

var options = {

	// Project name
	name: 'mxm-gulp',

	// Less to CSS
	less: {

		// Entry point if you don't use incremental build.
		// This can be an array of files for multiple
		// bundles:
		// main: ['src/less/main.less', 'src/less/bundle1.less'],
		main: 'src/less/main.less',

		// Files to watch for changes and glob used
		// for incremental less build
		src: 'src/less/**/*.less',

		// Autoprefixer options, see:
		// https://www.npmjs.com/package/gulp-autoprefixer
		// Default used is IE8+, Chrome 20+, Firefox 11+... see:
		// ./options/less.js for further info
		// autoprefixer: {browsers: ['last 2 versions']}
	},

/*	// Javascript bundles
	webpack: {

		// Define entry points for your scripts.
		// Use paths starting with './' (this folder)
		// or '../' (this folders parent)
		entry: {
			app: './app.js'
		},

		// See https://github.com/greypants/gulp-starter/pull/139/files
		context: require('path').resolve('src/js'),
	},*/

	jade: {

		// Jade files to watch for changes
		src: 'src/jade/**/*.jade',

		// Entry points for actual pages
		views: 'src/jade/views/**/*.jade',

		// Destination for html files
		dest: destination,

		// Local variables to pass to the compiler
		//locals: {}
	},

/*	// SVG icons to webfont
	fonticons: {

		// SVG files to watch for changes
		src: 'src/svg/** /*.svg',

		// Destination folder for the less files
		// containing the mixin
		lessDest: 'src/less/core/'
	},*/

	// Static webserver and livereload
	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		server: { baseDir: destination },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		// proxy: 'localhost:60000'
		
		// Wether to open new tab on start or not
		open: false
	},

	// These are required for the 
	// extended options, do not alter
	dest: destination,
	webroot: webroot	
};

// Export them options
module.exports = options;