'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
