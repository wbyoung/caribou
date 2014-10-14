'use strict';
<% if (components.ember) { %>
var <%= _.classify(appname) %> = Ember.Application.create();
<% if (components.server) { %>
<%= _.classify(appname) %>.Router.reopen({
  location: 'history'
});

<%= _.classify(appname) %>.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});
<% } %>
// expose <%= _.classify(appname) %> globally
window.<%= _.classify(appname) %> = <%= _.classify(appname) %>;
<% } else { %>
$(function() {
  // your code here
});
<% } %>