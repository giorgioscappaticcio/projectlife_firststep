'use strict';

describe('Filter: getObjByProperty', function () {

  // load the filter's module
  beforeEach(module('mudanoApp'));

  // initialize a new instance of the filter before each test
  var getObjByProperty;
  beforeEach(inject(function ($filter) {
    getObjByProperty = $filter('getObjByProperty');
  }));

  it('should return the input prefixed with "getObjByProperty filter:"', function () {
    var text = 'angularjs';
    expect(getObjByProperty(text)).toBe('getObjByProperty filter: ' + text);
  });

});
