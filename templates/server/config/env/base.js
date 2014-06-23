'use strict';

var path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  public: path.join(path.join('../../../public'))
};
