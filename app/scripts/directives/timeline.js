'use strict';

/**
 * @ngdoc directive
 * @name mudanoApp.directive:timeline
 * @description
 * # timeline
 */
angular.module('mudanoApp')
  .directive('timeline', function ($rootScope) {
    return {
      template: '<div></div>'+
      			'<button ng-click="zoom(1)">Zoom Out</button>'+
      			'<button ng-click="zoom(-1)">Zoom In</button><br><br>',
      scope: {
	      dataset: '=dataset',
	      groups: '=groups',
	      holidays: '=holidays',
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
		    zoomMax: 1000 * 60 * 60 * 24 * 31 * 12     // about three months in milliseconds
		  };

	
        scope.$watch('dataset', function(response) {
	       	//console.log(dataset);
	       	var data = new vis.DataSet(response);
	       	scope.timeline.setItems(data);
	      });

        scope.$watch('groups', function(groups) {
	       	//console.log(groups)
	       	if (groups){
	       		// scope.timeline.destroy();
	       		// var data = new vis.DataSet(scope.dataSet);
	       		// scope.timeline = new vis.Timeline(element[0], data, groups, options);
	       		scope.timeline.setGroups(groups);	
	       	}
	       	
	      });

        // Configuration for the Timeline
  		var group = new vis.DataSet([
			{id: 'FE', content:'Frontend Developers'},
        	{id: 'BE', content:'Backend Developers'},
        	{id: 'M', content:'Project Managers'},
        	{id: 'BA', content:'Bussinest Analyst'}
        ]);
        // scope.dataset = [];
  		// Create a Timeline
  		scope.timeline = new vis.Timeline(element[0], scope.dataSet, group, options);

  		scope.timeline.on('select', function (properties) {
		  console.log(properties)
		  $rootScope.clickedEvent = properties.items[0];
		  scope.$apply();
		});

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

