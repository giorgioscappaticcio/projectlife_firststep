'use strict';

/**
 * @ngdoc filter
 * @name mudanoApp.filter:demoment
 * @function
 * @description
 * # demoment
 * Filter in the mudanoApp.
 */
angular.module('mudanoApp')
  .filter('demoment', function () {
    return function (date,format) {
    	switch (format){
    		case 'day':
    			var x  = moment(date).format('DD');
    		break;
    		case 'month':
    			var x  = moment(date).format('MMM');
    		break;
    		case 'year':
    			var x  = moment(date).format('YYYY');
    		break;
    		default :
    			var x  = moment(date).format('DD-MM-YYYY');
    		break;
    	}
    	return x;
  	}
  });
