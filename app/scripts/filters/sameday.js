'use strict';

/**
 * @ngdoc filter
 * @name mudanoApp.filter:sameday
 * @function
 * @description
 * # sameday
 * Filter in the mudanoApp.
 */
angular.module('mudanoApp')
  .filter('sameday', function () {
    return function (startdate,enddate) {
    	if (startdate.diff(enddate,'days') == 0){
			return true;
		}
    };
  });
