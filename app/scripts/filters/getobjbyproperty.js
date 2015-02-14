'use strict';

/**
 * @ngdoc filter
 * @name mudanoApp.filter:getObjByProperty
 * @function
 * @description
 * # getObjByProperty
 * Filter in the mudanoApp.
 */
angular.module('mudanoApp')
  .filter('getObjByProperty', function () {
    // this filter is useful to find object in an array passing the value of the property
    // returns an array with the objects that has specified value for specified property 
    return function (obj,prop,val) {
		var a = [];
		for (var i = 0, l = obj.length; i < l; i++) {
		    // check the obj has the property before comparing it
		    if (typeof obj[i][prop] === 'undefined') continue;

		    // if the obj property equals our obj value, return the obj
		    if (obj[i][prop] === val) a.push(obj[i]);

		}

		// didn't find an object with the property
		if (a.length > 0) {
			return a;
		} else {
			return false;	
		}
		
	};
  });
