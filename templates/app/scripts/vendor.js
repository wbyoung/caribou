'use strict';

// this file is not automatically re-loaded during watched build because it's
// slow to do so. if you make changes, you should re-launch the build process.

// globally expose jQuery for other vendor scripts
window.jQuery = window.$ = require('../bower_components/jquery/dist/jquery.js');

// include all of bootstrap, or optionally choose specific components below.
require('../bower_components/bootstrap-sass/dist/js/bootstrap.js'); /*
require('../bower_components/bootstrap-sass/js/affix');
require('../bower_components/bootstrap-sass/js/alert');
require('../bower_components/bootstrap-sass/js/dropdown');
require('../bower_components/bootstrap-sass/js/tooltip');
require('../bower_components/bootstrap-sass/js/modal');
require('../bower_components/bootstrap-sass/js/transition');
require('../bower_components/bootstrap-sass/js/button');
require('../bower_components/bootstrap-sass/js/popover');
require('../bower_components/bootstrap-sass/js/carousel');
require('../bower_components/bootstrap-sass/js/scrollspy');
require('../bower_components/bootstrap-sass/js/collapse');
require('../bower_components/bootstrap-sass/js/tab'); */
