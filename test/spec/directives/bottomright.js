'use strict';

describe('Directive: bottomright', function () {

  // load the directive's module
  beforeEach(module('mudanoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bottomright></bottomright>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bottomright directive');
  }));
});
