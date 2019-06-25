import { getEnv } from './tasks/utils';

const envVar = getEnv();
const env = envVar.dist ? 'dist/' : 'public/';
const pkg = require('./package.json');

const vars = require('./src/data/variables.json');
const img = require('./src/data/images.json');

const pugIncludeGlob = require('pug-include-glob');
module.exports = {
	pkg: {
		name: pkg.name,
	},
	pluginOpts: {
		browserSync: {
			port: 1987,
			server: {
				baseDir: env,
			},
		},
		gSize: {
			showFiles: true,
		},
		pug: {
			pretty: true,
			data: {
				description: pkg.description,
				name: pkg.name,
				version: pkg.version,
				vars: vars,
				img: img,
			},
			plugins: [pugIncludeGlob()],
		},
		load: {
			rename: {
				'gulp-gh-pages': 'deploy',
				'gulp-cssnano': 'minify',
				'gulp-autoprefixer': 'prefix',
			},
		},
		prefix: ['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4'],
		rename: {
			suffix: '.min',
		},
		stylint: {
			reporter: 'stylint-stylish',
		},

		responsive: {
			global: {
				quality: 70,
				progressive: true,
				withMetadata: false,
				withoutEnlargement: true,
				skipOnEnlargement: false,
				errorOnEnlargement: false,
				silent: true,
				stats: true,
				errorOnUnusedImage: false,
				errorOnUnusedConfig: false,
			},
			breakpoints: {
				'**': Object.values(vars.breakpoints)
					.concat([vars.defaultImageWidth])
					.map(bp => ({
						width: bp,
						rename: bp === vars.defaultImageWidth ? null : { suffix: `_${bp}` },
					})),
			},
			docs: {
				'**/docs/**': {
					height: 1500,
				},
			},
		},
		'real-favicon': {
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin',
					backgroundColor: '#ffffff',
					margin: '25%',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true,
					},
				},
				desktopBrowser: {},
				windows: {
					pictureAspect: 'whiteSilhouette',
					backgroundColor: '#da532c',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false,
						},
					},
				},
				androidChrome: {
					pictureAspect: 'shadow',
					themeColor: '#ffffff',
					manifest: {
						name: 'Illustrova',
						display: 'browser',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true,
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false,
					},
				},
				safariPinnedTab: {
					pictureAspect: 'silhouette',
					themeColor: '#ff724c',
				},
			},
			settings: {
				compression: 1,
				scalingAlgorithm: 'Cubic',
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false,
			},
		},
	},
	paths: {
		base: env,
		sources: {
			pages: 'src/pages/*.pug',
			markup: ['src/pages/*.pug', 'src/pug/**/*.pug', 'src/blocks/**/*.pug'],
			overwatch: env + '**/*',
			blocks: 'src/blocks/',
			scripts: {
				root: 'src/js/scripts.js',
				all: ['src/js/**/*.js', 'src/blocks/**/*.js'],
			},
			styles: {
				root: 'src/stylus/style.styl',
				all: ['src/stylus/**/*.styl', 'src/blocks/**/*.styl'],
			},
			images: 'src/assets/img/**/*.!(svg|gif)',
			data: {
				images: 'src/data/images.json',
			},
			favicon: 'src/assets/favicon/favicon.png',
		},
		destinations: {
			css: env + 'css/',
			html: env,
			js: env + 'js/',
			images: env + 'assets/img',
			favicon: 'public/assets/favicon',
		},
	},
};
