# Caribou Generator

[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Code Climate][codeclimate-image]][codeclimate-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][david-image]][david-url] [![devDependencies][david-dev-image]][david-dev-url]

Yeoman generator for projects that want a simple path to set up the following
tools for front-end development:

<img align="right" src="templates/app/media/caribou-small.png" alt="Caribou">

 - [gulp][gulp] task runner
 - [Sass][sass] for stylesheets
 - [Browserify][browserify] for combining JavaScript
 - [JSHint][jshint] for linting JavaScript
 - [UglifyJS][uglifyjs] for minifying JavaScript
 - [Connect][connect] server with [LiveReload][livereload]
 - [Bower][bower] with [jQuery][jquery] and [Bootstrap][bootstrap]
 - Testing with [Karma][karma], [Mocha][mocha], [Chai][chai], and
   [Sinon.JS][sinon]

## Install

```
npm install -g yeoman generator-caribou
mkdir my-app
cd my-app
yo caribou
```

## Usage

Caribou uses `gulp` as a task runner. The following tasks are available:

 - `default` cleans, runs linter, builds, and tests for distribution
 - `serve` cleans, runs linter, builds, serves, and watches for development
 - `serve:dist` cleans, runs linter, builds, and serves for distribution
 - `test` cleans, runs linter, builds, tests, and watches for development
 - `build` cleans, runs linter and builds for distribution
 - `lint` cleans, runs linter
 - `clean` cleans for development
 - `clean:dist` cleans for distribution


## License

This project is distributed under the MIT license.


[travis-url]: http://travis-ci.org/wbyoung/caribou
[travis-image]: https://secure.travis-ci.org/wbyoung/caribou.png?branch=master
[npm-url]: https://npmjs.org/package/generator-caribou
[npm-image]: https://badge.fury.io/js/generator-caribou.png
[codeclimate-image]: https://codeclimate.com/github/wbyoung/caribou.png
[codeclimate-url]: https://codeclimate.com/github/wbyoung/caribou
[coverage-image]: https://coveralls.io/repos/wbyoung/caribou/badge.png
[coverage-url]: https://coveralls.io/r/wbyoung/caribou
[david-image]: https://david-dm.org/wbyoung/caribou.png?theme=shields.io
[david-url]: https://david-dm.org/wbyoung/caribou
[david-dev-image]: https://david-dm.org/wbyoung/caribou/dev-status.png?theme=shields.io
[david-dev-url]: https://david-dm.org/wbyoung/caribou#info=devDependencies

[caribou-image]: ./templates/app/media/caribou-small.png
[gulp]: http://gulpjs.com
[sass]: http://sass-lang.com
[browserify]: http://browserify.org
[jshint]: http://www.jshint.com
[uglifyjs]: https://github.com/mishoo/UglifyJS
[connect]: https://github.com/senchalabs/connect
[livereload]: http://livereload.com
[bower]: http://bower.io
[jquery]: http://jquery.com
[bootstrap]: http://getbootstrap.com
[karma]: http://karma-runner.github.io/
[mocha]: http://visionmedia.github.io/mocha/
[chai]: http://chaijs.com
[sinon]: http://sinonjs.org
