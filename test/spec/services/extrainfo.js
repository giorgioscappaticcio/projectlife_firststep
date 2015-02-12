'use strict';

describe('Service: extrainfo', function () {

  // load the service's module
  beforeEach(module('mudanoApp'));

  // instantiate service
  var extrainfo;
  beforeEach(inject(function (_extrainfo_) {
    extrainfo = _extrainfo_;
  }));

  it('should do something', function () {
    expect(!!extrainfo).toBe(true);
  });

});
