import gulp from 'gulp';
import gConfig from '../gulp-config';

const opts = gConfig.pluginOpts;
const src = gConfig.paths.sources;
const dest = gConfig.paths.destinations;

var realFavicon = require('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
const generateFavicon = done => {
	opts['real-favicon'] = Object.assign({}, opts['real-favicon'], {
		masterPicture: src.favicon,
		dest: dest.favicon,
		iconsPath: 'assets/favicon',
		markupFile: FAVICON_DATA_FILE,
	});
	return realFavicon.generateFavicon(opts['real-favicon'], function() {
		done();
	});
};
generateFavicon.description = `Generate the icons`;

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
const injectFaviconMarkup = () => {
	return gulp
		.src(['public/*.html'])
		.pipe(
			realFavicon.injectFaviconMarkups(
				JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
			)
		)
		.pipe(gulp.dest('public'));
};
injectFaviconMarkup.description = `Inject the favicon markups in HTML pages`;

export { generateFavicon, injectFaviconMarkup };
