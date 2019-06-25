[![Build Status](https://travis-ci.org/jh3y/gulp-boilerplate.svg?branch=master)](https://travis-ci.org/jh3y/gulp-boilerplate)

# Gulp 4 boilerplate

### Version: Gulp4 - Pug - Stylus - Rollup - Bem

_Forked from [Gulp Boilerplate](https://github.com/jh3y/gulp-boilerplate)_

A boilerplate for your gulp files!

- BEM approach - code split into "blocks", representing separate components
- Uses `gulp` version 4 :sunglasses:
- Markup compilation
- Stylesheet compilation
- Script compilation
- Source linting
- Images processing
- Static server with automatic live reload/style injection

## Usage

As a prerequisite it's assumed you have `npm/yarn` installed and the `gulp-cli`.

1.  Clone the branch you need (or the whole repo if you want)

        git clone -b pug-stylus-rollup-bem --depth 1  --single-branch https://github.com/Illustrova/gulp-boilerplate.git .

2.  Install dependencies

        npm install

3.  Start `gulp`

        gulp

4.  Start hacking away with super fast livereload goodness.

## Creating blocks

There are 2 ways to create new block quickly:

1. Run: `gulp createBlock -b <blockname>`. You may also create multiple blocks at once; though each of them should havve -b flag before, like: `gulp createBlock -b <blockone> -b <blocktwo> -b <blockthree>`
2. when watch task is running,you can just create a new folder in `src/blocks` - the template files will be added automatically
   Note: there is a buggy behavior on Windows- watch task will be errored with `EPERM` in case you try to delete some folder from `src/blocks` when watch task is running.

## Structure

You could have a `gulpfile` with all your tasks in one file. But, if your task list grows and it starts becoming a case of having to hunt through the file to refactor/make changes, it might be easier to split up your file and refactor your tasks into separate modules.

Tasks live under the `tasks` folder in relevant modules. For example, script related functions live within `scripts.js`. Each module exports aptly named functions such as `compile`, `lint` and `watch`. These are invoked from the `gulpfile`.

## Tasks

You can see all available tasks with `gulp -T`. This will print out a list of available tasks and their respective metadata :sunglasses:

## License

MIT

## Authors

- Original version: [@jh3y](https://github.com/jh3y)
- Adapted by [Illustrova](https://github.com/illustrova)
