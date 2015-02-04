'use strict';

/**
 * @ngdoc directive
 * @name mudanoApp.directive:timeline
 * @description
 * # timeline
 */
angular.module('mudanoApp')
  .directive('timeline', function () {
    return {
      template: '<div></div>'+
      			'<button ng-click="zoom(0.2)">Zoom Out</button>'+
      			'<button ng-click="zoom(-0.2)">Zoom In</button><br><br>',
      scope: {
	      // creates a scope variable in your directive
	      // called `locations` bound to whatever was passed
	      // in via the `locations` attribute in the DOM
	      dataset: '=dataset',
	      groups: '=groups',
	      holidays: '=holidays'
	  },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var options = {
        	orientation: 'top',
        	type: 'range',
		    height: '400px',
		    min: new Date(2014, 8, 1),                // lower limit of visible range
		    max: new Date(2016, 0, 1),                // upper limit of visible range
		    zoomMin: 1000 * 60 * 60 * 24 * 7,             // one day in milliseconds
		    zoomMax: 1000 * 60 * 60 * 24 * 31 * 6     // about three months in milliseconds
		  };

		  console.log(scope.holidays);
        //element.text('this is the timeline directive');
        scope.$watch('dataset', function(dataset) {
	       	//console.log(scope.holidays);
	       	
	       	scope.timeline.setItems(dataset);
	      });

        scope.$watch('groups', function(groups) {
	       	//console.log(groups)
	      });

        // Configuration for the Timeline
  		
        scope.dataset = [];
  		// Create a Timeline
  		scope.timeline = new vis.Timeline(element[0], scope.dataSet, scope.groups, options);

  		scope.zoom = function(percentage) {
	        var range = scope.timeline.getWindow();
	        var interval = range.end - range.start;

	        scope.timeline.setWindow({
	            start: range.start.valueOf() - interval * percentage,
	            end:   range.end.valueOf()   + interval * percentage
	        });
	    }
      }
    };
  });

