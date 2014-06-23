'use strict';

process.env.NODE_ENV = 'test';

require('chai').use(require('sinon-chai'));

GLOBAL.__fixture = function(name) {
  var _ = require('lodash');
  var path = require('path');
  return _.cloneDeep(require(path.join(__dirname, 'fixtures', name)));
};
