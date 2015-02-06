'use strict';

/**
 * @ngdoc directive
 * @name mudanoApp.directive:eventbox
 * @description
 * # eventbox
 */
angular.module('mudanoApp')
  .directive('eventbox', function () {
    return {
      template: '<div></div>',
      scope: {
        dataset: '=dataset',
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        

        scope.$watch('dataset', function(dataset) {
          var data = new vis.DataSet(dataset);
          scope.graph2d.setItems(data);
          console.log(dataset)
        });

        var options = {
          height: '300px',
          zoomMin: 1000 * 60 * 60 * 24 * 7,             // one day in milliseconds
          zoomMax: 1000 * 60 * 60 * 24 * 31 * 6 ,
          min: new Date(2014, 8, 1),                // lower limit of visible range
          max: new Date(2016, 0, 1), 
          start: '2014-06-10',
          end: '2016-06-18',
          style:'points',
          drawPoints: {
            enabled: true,
            size: 14,
            style: 'circle' // square, circle
          },
          dataAxis: {
            customRange: {
                left: {
                    min: 0, max: 15
                }
            }
          },
        };

        var groups = new vis.DataSet();
        groups.add({
          id: 'V',
          content: 'Vacation',
          className: 'vacation'
        });

        groups.add({
          id: 'T',
          content: 'Training',
          className: 'training'
        });

        groups.add({
          id: 'P',
          content: 'Public Holiday',
          className: 'publicholiday',
        });


        scope.graph2d = new vis.Graph2d(element[0], scope.dataset, groups, options);
      
      
      }
    };
  });