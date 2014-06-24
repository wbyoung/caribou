'use strict';

var path = require('path');

// development configuration overrides
module.exports = {
  public: path.resolve(path.join(__dirname, '../../../tmp/public'))
};
