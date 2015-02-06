'use strict';

describe('Directive: eventbox', function () {

  // load the directive's module
  beforeEach(module('mudanoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<eventbox></eventbox>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the eventbox directive');
  }));
});
