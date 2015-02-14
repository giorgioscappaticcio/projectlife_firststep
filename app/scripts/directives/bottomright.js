'use strict';

/**
 * @ngdoc directive
 * @name mudanoApp.directive:bottomright
 * @description
 * # bottomright
 */
angular.module('mudanoApp')
  .directive('bottomright', function ($window) {
    return {
        templateUrl: '././views/bottomright.html',
        restrict: 'E',
        replace: true,
        link: function postLink(scope, element, attrs) {
        
            scope.$watch('showRight',function(showRight){
        	   if (showRight){
        		  var bodyHeight = angular.element('body').height();
		          var windowHeight = $window.innerHeight;
		          var topSum = 400 + 60 + 20 + 20;
                    if ( bodyHeight< windowHeight){
					   angular.element(element).height(windowHeight  -topSum) ;
				    } else {
					   angular.element(element).height(bodyHeight  -topSum) ;
				    };
        	    };
            });
        }
    };
  });
