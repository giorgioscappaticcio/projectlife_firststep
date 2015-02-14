'use strict';

describe('Service: generateVisItems', function () {

  // load the service's module
  beforeEach(module('mudanoApp'));

  // instantiate service
  var generateVisItems;
  beforeEach(inject(function (_generateVisItems_) {
    generateVisItems = _generateVisItems_;
  }));

  it('should do something', function () {
    expect(!!generateVisItems).toBe(true);
  });

});
