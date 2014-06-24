'use strict';

var path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  public: path.resolve(path.join(__dirname, '../../../public'))
};
