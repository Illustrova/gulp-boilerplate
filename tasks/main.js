import gulp from 'gulp';
import { compileScripts, lintScripts, watchScripts } from './scripts';
import { compileStyles, lintStyles, watchStyles } from './styles';
import { compileMarkup, watchMarkup } from './markup';
import { processImages, getImagesData, watchImages } from './images';
import { generateFavicon, injectFaviconMarkup } from './favicon';
import { watchBlocks } from './createBlock';

const lint = gulp.parallel(lintStyles, lintScripts);
lint.description = 'lint all source';

const compile = gulp.parallel(
	compileMarkup,
	compileStyles,
	compileScripts,
	gulp.series(processImages, getImagesData),
	gulp.series(generateFavicon, injectFaviconMarkup)
);
compile.description = 'compile all source';

const watch = gulp.parallel(
	watchMarkup,
	watchStyles,
	watchScripts,
	watchImages,
	watchBlocks,
	injectFaviconMarkup
);
watch.description = 'watch for changes to all source';

export { compile, lint, watch };
