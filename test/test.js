'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = _.extend({}, require('yeoman-generator').assert);

var run = function(components, done) {
  helpers.run(path.join( __dirname, '../app'))
    .inDir(path.join( __dirname, './tmp'))
    .withOptions({ 'skip-install': true })
    .withPrompt({ name: 'caribou-app' })
    .withPrompt({ components: components })
    .onEnd(done);
};

var projectFiles = [
  '.bowerrc',
  '.jshintrc',
  '.gitignore',
  'bower.json',
  'package.json',
  'gulpfile.js',
  'karma.conf.js'
];

var appFiles = [
  'app/media/caribou.png',
  'app/scripts/application.js',
  'app/scripts/vendor.json',
  'app/styles/application.scss',
  'app/styles/caribou.scss',
  'app/styles/vendor.scss',
  'app/index.html',
  'test/app_helper.js',
  'test/app/test.js',
  'test/fixtures/example.json'
];

var serverFiles = [
  'server/config/env/base.js',
  'server/config/env/development.js',
  'server/config/env/production.js',
  'server/config/env/staging.js',
  'server/config/index.js',
  'server/application.js',
  'test/server_helper.js',
  'test/server/test.js'
];

assert.fileMatches = function(file, fixture) {
  assert.textEqual(
    fs.readFileSync(file, 'utf8'),
    fs.readFileSync(fixture, 'utf8'));
};

describe('caribou', function() {
  describe('full-stack', function() {
    before(function(done) { run(['jquery', 'bootstrap', 'ember', 'server'], done); });

    it('creates expected files', function() {
      assert.file([].concat(projectFiles, appFiles, serverFiles));
      assert.noFile([]);
    });

    it('creates expected gulpfile.js', function() {
      assert.fileMatches('gulpfile.js', path.join(__dirname,
        'expected/gulpfile.full-stack.js'));
    });

    it('includes jquery', function() {
      assert.fileContent('bower.json', /jquery/);
      assert.fileContent('app/scripts/vendor.json', /jquery/);
    });

    it('includes bootstrap', function() {
      assert.fileContent('bower.json', /bootstrap/);
      assert.fileContent('app/scripts/vendor.json', /bootstrap/);
      assert.fileContent('app/styles/vendor.scss', /bootstrap/);
    });

    it('includes ember', function() {
      assert.fileContent('bower.json', /ember/);
      assert.fileContent('app/scripts/vendor.json', /ember/);
      assert.fileContent('test/app_helper.js', /ember/);
    });
  });

  describe('minimal', function() {
    before(function(done) { run([], done); });

    it('creates expected files', function() {
      assert.file([].concat(projectFiles, appFiles));
      assert.noFile([].concat(serverFiles));
    });

    it('does not include jquery');

    it('does not include bootstrap');

    it('does not include ember');
  });

  describe('ember-only', function() {
    before(function(done) { run(['jquery', 'ember'], done); });

    it('creates expected files', function() {
      assert.file([].concat(projectFiles, appFiles));
      assert.noFile([].concat(serverFiles));
    });

    it('does not include jquery');

    it('does not include bootstrap');

    it('does not include ember');
  });
});
