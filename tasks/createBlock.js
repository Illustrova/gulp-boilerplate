/* Adapted version of https://github.com/nicothin/NTH-start-project/blob/master/createBlock.js */
/* eslint-disable */
import gulp from 'gulp';
import gConfig from '../gulp-config';

const opts = gConfig.pluginOpts;
const src = gConfig.paths.sources;

const fs = require('fs');
const mkdirp = require('mkdirp');

const extensions = ['styl', 'pug', 'js']; // default files to create
var argv = require('minimist')(process.argv.slice(2));

function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
}

const fileTmpl = {
	pug: blockName => `mixin ${blockName}(opts, mods)\n
	//-	Parameters:
	//-	opts {object} - Object with all customizable options 
	//-	mods {string} - comma-separated list of modifiers
	//-	Call: +${blockName}({}, 'some-mod')
	-
		// modifiers list
		var allMods = '';
		if(typeof(mods) !== 'undefined' && mods) {
			var modsList = mods.split(',');
			for (var i = 0; i < modsList.length; i++) {
				allMods = allMods + '${blockName}--' + modsList[i].trim();
			}
		}\n
	.${blockName}(class=allMods)&attributes(attributes)
		.${blockName}__inner
			block`,
	styl: blockName => `// .${blockName}\n	`,
	js: () => `// const ready = require('../../js/utils/documentReady.js');\n
// ready(function() {
//
// });\n`,
};

const createBlock = done => {
	const blockName = argv.b;
	if (!blockName) {
		console.log(
			'Please provide block name after -b flag, example: "gulp createBlock -b blockname"'
		);
	}
	// if multiple arguments provided, process each of them
	else if (Array.isArray(blockName)) {
		blockName.forEach(block => makeBlock(block));
	} else {
		makeBlock(blockName);
	}
	done();
};

function makeBlock(blockName) {
	if (!blockName) return;
	const dirPath = `${src.blocks}${blockName}/`; // full path to new folder
	mkdirp(dirPath, err => {
		// Create folder/log error
		if (err) {
			console.error(`Error, block not created: ${err}`);
		} else {
			console.log(`Creating folder: ${dirPath} (if it didn't exist before)`);
			// Create files if they didn't exist before
			extensions.forEach(extension => {
				const filePath = `${dirPath + blockName}.${extension}`; // full path to file
				let fileContent = fileTmpl[extension](blockName); // contents of created file

				if (fileExist(filePath) === false) {
					fs.writeFile(filePath, fileContent, err => {
						if (err) {
							return console.log(`File NOT created: ${err}`);
						}
						console.log(`Created file: ${filePath}`);
					});
				} else {
					console.log(`File already exists: ${filePath}`);
				}
			});
		}
	});
}

const watchBlocks = () => {
	gulp.watch('**/*', { cwd: src.blocks }).on('addDir', function(blockName) {
		return makeBlock(blockName);
	});
};

export { createBlock, watchBlocks };
