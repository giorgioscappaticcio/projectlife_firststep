'use strict';

describe('Filter: sameday', function () {

  // load the filter's module
  beforeEach(module('mudanoApp'));

  // initialize a new instance of the filter before each test
  var sameday;
  beforeEach(inject(function ($filter) {
    sameday = $filter('sameday');
  }));

  it('should return the input prefixed with "sameday filter:"', function () {
    var text = 'angularjs';
    expect(sameday(text)).toBe('sameday filter: ' + text);
  });

});
