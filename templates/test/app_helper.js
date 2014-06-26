'use strict';

<% if (components.ember) { %>
Ember.LOG_VERSION = false;
Ember.testing = true;
Ember.Application.reopen({
  init: function() {
    this._super();
    this._setupTestApplication();
  },

  _setupTestApplication: function() {
    var testingElementID = 'ember-test-application';
    this.rootElement = '#' + testingElementID;
    this.setupForTesting();
    this.injectTestHelpers();
    Ember.$('body').append(Ember.$('<div id="' + testingElementID + '"/>'));
  }
});
<% } %>

// expose fixtures property (stored in __html__ via karma preprocessor)
window.__fixture = function(name) {
  var fixture = window.__html__['test/fixtures/' + name + '.json'];
  if (!fixture) { throw new Error('Missing fixture ' + name); }
  return JSON.parse(fixture);
};
