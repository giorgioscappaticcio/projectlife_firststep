'use strict';

describe('Service: mani', function () {

  // load the service's module
  beforeEach(module('mudanoApp'));

  // instantiate service
  var mani;
  beforeEach(inject(function (_mani_) {
    mani = _mani_;
  }));

  it('should do something', function () {
    expect(!!mani).toBe(true);
  });

});
