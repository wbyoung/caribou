'use strict';

var gulp = require('gulp');
var path = require('path');
var es = require('event-stream');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var SERVER_PORT = process.env.PORT || 9000;
var LIVERELOAD_PORT = process.env.LIVERELOAD_PORT || 35729;
var lr = require('tiny-lr')();

/*
 * Path reference
 */

var paths = (function() {
  var table = {
    'src.project.scripts': ['./*.js'],
    'src.app.html': ['app/**/*.html', '!app/bower_components/**/*'],
    'src.app.scripts': ['app/scripts/**/*.js'],
    'src.app.scripts.entry': ['app/scripts/application.js'],
    'src.app.scripts.vendor': ['app/scripts/vendor.js'],
    'src.app.styles': ['app/styles/**/*.scss'],
    'src.app.styles.entry': ['app/styles/application.scss'],
    'src.app.styles.vendor': ['app/styles/vendor.scss'],
    'src.app.tests': ['test/app_helper.js', 'test/app/**/*.js'],
    'dest.root': '<%= dist %>',
    'dest.app.html': '<%= dist %>/public',
    'dest.app.scripts': '<%= dist %>/public/scripts',
    'dest.app.styles': '<%= dist %>/public/styles'
  };

  return function(name, options) {
    var opts = options || {};
    var env = opts.env || 'development';
    var distribution = (env === 'distribution');
    var data = {
      'dist': (distribution ? 'dist' : 'tmp'),
    };
    var result = table[name];
    if (typeof result === 'string') { result = _.template(result, data); }
    else if (result instanceof Array) {
      result = _.map(result, function(value) {
        return _.template(value, data);
      });
    }
    else if (!result) { throw new Error('Could not find path for ' + name); }
    return result;
  };
})();


/*
 * Utility
 */

var environment = (function() {
  var set = false;
  var current = null;
  return function(value) {
    if (set && current !== value) {
      throw new Error('Environment already set to ' +
        current + ', cannot change to ' + value);
    }
    set = true;
    current = value;
    return { env: value };
  };
})();


/*
 * Browserify helper
 */

var browserify = function() {
  return es.through(function(file) {
    var browserifier = require('browserify')(file.path);
    var chunks = [];
    var bundle = browserifier.bundle();
    bundle.on('data', chunks.push.bind(chunks));
    bundle.on('end', function() {
      file.contents = Buffer.concat(chunks);
      this.queue(file);
      this.resume();
    }.bind(this));
    this.pause();
  });
};


/*
 * Configurable Tasks
 */

var tasks = {};

tasks['.serve'] = function(options) {
  var opts = options || {};

  var connect = require('connect');
  var http = require('http');
  var app = connect()
    .use(require('connect-livereload')({ port: LIVERELOAD_PORT }))
    .use(require('serve-static')(path.resolve(paths('dest.app.html', opts))));

  http.createServer(app).listen(SERVER_PORT, function() {
    setTimeout(function() {
      require('open')('http://localhost:' + SERVER_PORT + '/');
    }, 500);
  });

  lr.listen(LIVERELOAD_PORT);
};

tasks['.watch'] = function(options) {
  var opts = options || {};

  if (opts.app) {
    gulp.watch(paths('src.app.scripts', opts), ['lint', '.scripts:app:dev:update']);
    gulp.watch(paths('src.app.styles', opts), ['.styles:app:dev:update']);
    gulp.watch(paths('src.app.html', opts), ['.html:app:dev']);
  }
};

tasks['.scripts:app'] = function(options) {
  var opts = options || {};
  var env = opts.env || 'development';
  var distribution = (env === 'distribution');

  if (opts.all) {
    opts.vendor = true;
    opts.scripts = true;
  }

  var src = [];
  if (opts.vendor) {
    src = src.concat(paths('src.app.scripts.vendor', opts));
  }
  if (opts.scripts) {
    src = src.concat(paths('src.app.scripts.entry', opts));
  }

  var stream = gulp.src(src)
    .pipe($.plumber())
    .pipe(browserify());

  if (distribution) {
    stream = stream
      .pipe($.concat('application.js', { newLine: ';' }))
      .pipe($.uglify());
  }

  stream = stream
    .pipe(gulp.dest(paths('dest.app.scripts', opts)))
    .pipe($.livereload(lr));

  return stream;
};

tasks['.styles:app'] = function(options) {
  var opts = options || {};
  var env = opts.env || 'development';
  var distribution = (env === 'distribution');

  if (opts.all) {
    opts.vendor = true;
    opts.styles = true;
  }

  var src = [];
  if (opts.vendor) {
    src = src.concat(paths('src.app.styles.vendor', opts));
  }
  if (opts.styles) {
    src = src.concat(paths('src.app.styles.entry', opts));
  }

  var stream = gulp.src(src)
    .pipe($.sass());

  if (distribution) {
    stream = stream
      .pipe($.concat('application.css'))
      .pipe($.minifyCss());
  }

  stream = stream
    .pipe(gulp.dest(paths('dest.app.styles', opts)))
    .pipe($.livereload(lr));

  return stream;
};

tasks['.html:app'] = function(options) {
  var opts = options || {};
  var env = opts.env || 'development';
  var context = { GULP_ENVIRONMENT: env };
  return gulp.src(paths('src.app.html', opts))
    .pipe($.preprocess({ context: context }))
    .pipe(gulp.dest(paths('dest.app.html', opts)))
    .pipe($.livereload(lr));
};

tasks['.test:app'] = function(options) {
  var opts = options || {};
  var env = opts.env || 'development';
  var distribution = (env === 'distribution');
  var dir = paths('dest.app.scripts', opts);
  var app = [
    path.join(dir, 'vendor.js'),
    path.join(dir, 'application.js')
  ];
  var sources = [].concat(app, paths('src.app.tests', opts));
  return gulp.src(sources)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: (distribution ? 'run' : 'watch')
    }));
};

tasks['.clean'] = function(options) {
  var opts = options || {};
  return gulp.src(paths('dest.root', opts), { read: false })
    .pipe($.clean());
};


/*
 * Private Tasks
 */

gulp.task('.html:app:dev', function() {
  return tasks['.html:app'](environment('development'));
});

gulp.task('.html:app:dist', function() {
  return tasks['.html:app'](environment('distribution'));
});

gulp.task('.styles:app:dev', function() {
  return tasks['.styles:app'](_.merge(environment('development'), { all: true }));
});

gulp.task('.styles:app:dev:update', function() {
  return tasks['.styles:app'](_.merge(environment('development'), { styles: true }));
});

gulp.task('.styles:app:dist', function() {
  return tasks['.styles:app'](_.merge(environment('distribution'), { all: true }));
});

gulp.task('.scripts:app:dev', function() {
  return tasks['.scripts:app'](_.merge(environment('development'), { all: true }));
});

gulp.task('.scripts:app:dev:update', function() {
  return tasks['.scripts:app'](_.merge(environment('development'), { scripts: true }));
});

gulp.task('.scripts:app:dist', function() {
  return tasks['.scripts:app'](_.merge(environment('distribution'), { all: true }));
});

gulp.task('.build:app:dev', ['.html:app:dev', '.styles:app:dev', '.scripts:app:dev']);
gulp.task('.build:app:dist', ['.html:app:dist', '.styles:app:dist', '.scripts:app:dist']);

gulp.task('.watch:app:dev', function() {
  return tasks['.watch']({ app: true });
});

gulp.task('.watch:test', function() {
  return tasks['.watch']({ app: true, testing: true });
});

gulp.task('.test:app:dev', ['.build:app:dev', '.watch:test'], function() {
  return tasks['.test:app'](environment('development'));
});

gulp.task('.test:app:dist', ['.build:app:dist'], function() {
  return tasks['.test:app'](environment('distribution'));
});

gulp.task('.serve:dev', ['.build:app:dev', '.watch:app:dev'], function() {
  return tasks['.serve'](environment('development'));
});

gulp.task('.serve:dist', ['.build:app:dist'], function() {
  return tasks['.serve'](environment('distribution'));
});

gulp.task('.clean:dev', function() {
  return tasks['.clean'](environment('development'));
});

gulp.task('.clean:dist', function() {
  return tasks['.clean'](environment('distribution'));
});


/*
 * Public Tasks
 */

gulp.task('default', ['.clean:dist'], function() {
  gulp.start('lint', '.build:app:dist', '.test:app:dist');
});

gulp.task('serve', ['.clean:dev'], function() {
  gulp.start('lint', '.serve:dev');
});

gulp.task('serve:dist', ['.clean:dist'], function() {
  gulp.start('lint', '.serve:dist');
});

gulp.task('test', ['.clean:dev'], function() {
  gulp.start('lint', '.test:app:dev');
});

gulp.task('build', ['.clean:dist'], function() {
  gulp.start('lint', '.build:app:dist');
});

gulp.task('lint', function() {
  var src = [].concat(
    paths('src.project.scripts'),
    paths('src.app.scripts'),
    paths('src.app.tests'));
  return gulp.src(src)
    .pipe($.cached('linting'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('clean', ['.clean:dev']);
gulp.task('clean:dist', ['.clean:dist']);
