/* global Application, describe, it, expect */ 'use strict';

describe('app', function() {
  it('passes tests', function() {
    var post = Application.controllers.posts.create();
    expect(post).to.to.have.property('id');
    expect(post).to.to.have.property('title');
    expect(post).to.to.have.property('body');
  });
});
