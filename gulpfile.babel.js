import gulp from 'gulp';
import { getEnv } from './tasks/utils';

import { compileScripts, lintScripts, watchScripts } from './tasks/scripts';
import { compileStyles, lintStyles, watchStyles } from './tasks/styles';
import { compileMarkup, watchMarkup } from './tasks/markup';
import { processImages, getImagesData, watchImages } from './tasks/images';
import {
	generateFavicon,
	injectFaviconMarkup,
	checkFaviconUpdate,
} from './tasks/favicon';
import { compile, lint, watch as watchEverything } from './tasks/main';
import { deploy } from './tasks/deploy';
import { stat } from './tasks/stat';
import { serve as serveEverything } from './tasks/server';

export {
	deploy,
	serveEverything as serve,
	stat,
	compile,
	lint,
	watchEverything as watch,
	compileScripts,
	compileMarkup,
	compileStyles,
	lintScripts,
	lintStyles,
	watchScripts,
	watchStyles,
	watchMarkup,
	processImages,
	getImagesData,
	watchImages,
	generateFavicon,
	injectFaviconMarkup,
	checkFaviconUpdate,
};
const env = getEnv();
// NOTE:: wrapper functions necessary to get metadata for tasks as intended
const serve = cb => serveEverything(cb);
const watch = cb => watchEverything(cb);
const defaultTasks = env.deploy
	? gulp.series(deploy)
	: gulp.parallel(serve, watch);

export default defaultTasks;
