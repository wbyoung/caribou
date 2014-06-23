'use strict';

var _ = require('lodash');
var base = require('./env/base');
var overrides = require('./env/' + base.env);

module.exports = _.extend({}, base, overrides);
