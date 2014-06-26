var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));
  },

  promptProjectName: function () {
    var done = this.async();
    this.prompt({
      type    : "input",
      name    : "name",
      message : "Your project name",
      default : this.appname.replace(/[\W]+/g, '-')
    }, function (answers) {
      this.appname = answers.name;
      done();
    }.bind(this));
  },

  promptComponents: function() {
    var done = this.async();
    this.prompt({
      type: 'checkbox',
      name: 'components',
      message: 'What tools do you want to use?',
      choices: [
        { name: 'jQuery', value: 'jquery', checked: true },
        { name: 'Bootstrap', value: 'bootstrap', checked: true },
        { name: 'Ember', value: 'ember' },
        { name: 'Node.js Server', value: 'server' }
      ]
    }, function(answers) {
      this.components = answers.components.reduce(function(h, v) {
        h[v] = true; return h;
      }, {});
      done();
    }.bind(this));
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  packages: function() {
    this.template('package.json');
    this.template('bower.json');
    this.copy('bowerrc', '.bowerrc');
  },

  jshint: function() {
    this.template('jshintrc', '.jshintrc');
    this.template('test/jshintrc', 'test/.jshintrc');
  },

  gulp: function() {
    this.template('gulpfile.js');
  },

  html: function() {
    this.template('app/index.html');
    this.write('app/favicon.ico', '');
  },

  staticAssets: function() {
    this.copy('app/media/caribou.png');
  },

  scripts: function() {
    this.copy('app/scripts/application.js');
    this.template('app/scripts/vendor.json');
    if (this.components.ember) {
      this.copy('app/templates/application.hbs');
    }
  },

  styles: function() {
    this.copy('app/styles/application.scss');
    this.template('app/styles/vendor.scss');
    this.copy('app/styles/caribou.scss');
  },

  server: function() {
    if (this.components.server) {
      this.copy('server/application.js');
      this.copy('server/config/index.js');
      this.copy('server/config/env/base.js');
      this.copy('server/config/env/development.js');
      this.copy('server/config/env/production.js');
      this.copy('server/config/env/staging.js');
    }
  },

  tests: function() {
    this.copy('karma.conf.js');
    this.copy('test/fixtures/example.json');
    this.template('test/app/test.js');
    this.template('test/app_helper.js');
    if (this.components.server) {
      this.copy('test/server/test.js');
      this.copy('test/server_helper.js');
    }
  },

  install: function() {
    if (this.options['skip-install']) { return; }
    this.installDependencies();
  }
});
