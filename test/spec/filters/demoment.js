'use strict';

describe('Filter: demoment', function () {

  // load the filter's module
  beforeEach(module('mudanoApp'));

  // initialize a new instance of the filter before each test
  var demoment;
  beforeEach(inject(function ($filter) {
    demoment = $filter('demoment');
  }));

  it('should return the input prefixed with "demoment filter:"', function () {
    var text = 'angularjs';
    expect(demoment(text)).toBe('demoment filter: ' + text);
  });

});
