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
    this.copy('jshintrc', '.jshintrc');
  },

  gulp: function() {
    this.copy('gulpfile.js');
  },

  html: function() {
    this.copy('app/index.html');
  },

  staticAssets: function() {
    this.copy('app/media/caribou.png');
  },

  scripts: function() {
    this.copy('app/scripts/application.js');
    this.copy('app/scripts/vendor.js');
    this.copy('app/scripts/controllers/posts.js');
    this.mkdir('app/scripts/controllers');
  },

  styles: function() {
    this.copy('app/styles/application.scss');
    this.copy('app/styles/vendor.scss');
    this.copy('app/styles/posts.scss');
  },

  tests: function() {
    this.copy('karma.conf.js');
    this.copy('test/app/test.js');
    this.copy('test/app_helper.js');
  },

  install: function() {
    this.installDependencies();
  }
});
