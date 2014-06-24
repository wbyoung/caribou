'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

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

describe('jquery-bootstrap-ember-server', function() {
  beforeEach(function(done) { run(['jquery', 'bootstrap', 'ember', 'server'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles, serverFiles));
    assert.noFile([]);
  });
});

describe('jquery-bootstrap-ember', function() {
  beforeEach(function(done) { run(['jquery', 'bootstrap', 'ember'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles));
    assert.noFile([].concat(serverFiles));
  });
});

describe('jquery-ember-server', function() {
  beforeEach(function(done) { run(['jquery', 'ember', 'server'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles, serverFiles));
    assert.noFile([]);
  });
});

describe('jquery-ember', function() {
  beforeEach(function(done) { run(['jquery', 'ember'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles));
    assert.noFile([].concat(serverFiles));
  });
});

describe('jquery-bootstrap-server', function() {
  beforeEach(function(done) { run(['jquery', 'bootstrap', 'server'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles, serverFiles));
    assert.noFile([]);
  });
});

describe('jquery-server', function() {
  beforeEach(function(done) { run(['jquery', 'server'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles, serverFiles));
    assert.noFile([]);
  });
});

describe('jquery', function() {
  beforeEach(function(done) { run(['jquery'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles));
    assert.noFile([].concat(serverFiles));
  });
});

describe('bootstrap', function() {
  beforeEach(function(done) { run(['bootstrap'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles));
    assert.noFile([].concat(serverFiles));
  });
});

describe('bootstrap-server', function() {
  beforeEach(function(done) { run(['bootstrap'], done); });

  it('creates expected files', function() {
    assert.file([].concat(projectFiles, appFiles));
    assert.noFile([].concat(serverFiles));
  });
});
