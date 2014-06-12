var yeoman = require('yeoman-generator');
var path = require('path');
var prompt = yeoman.generators.Base.prototype.prompt;

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));
  },

  prompt: function () {
    var done = this.async();
    prompt.call(this, {
      type    : "input",
      name    : "name",
      message : "Your project name",
      default : this.appname // Default to current folder name
    }, function (answers) {
      this.appname = answers.name;
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

  gulp: function() {
    this.copy('gulpfile.js');
  },

  html: function() {
    this.copy('app/index.html');
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
