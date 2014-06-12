/* global $ */ 'use strict';

var Application = window.Application = (function() {
  return {
    run: function() {
      console.log('running...');
    },
    controllers: {
      posts: require('./controllers/posts')
    }
  };
})();

$(function() {
  Application.run();
});
