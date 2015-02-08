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
        focus : '=focus'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        

        scope.$watch('dataset', function(dataset) {
          if (dataset){
            var data = new vis.DataSet(dataset);
            scope.graph2d.destroy();
            scope.graph2d = new vis.Graph2d(element[0], data, groups, options);
            //scope.graph2d.setItems(dataset);
            scope.graph2d.setWindow(scope.focus.start,scope.focus.end);
            // console.log(dataset)
          }
          
        });

        

        var options = {
          height: '400px',
          orientation: 'top',
          zoomMin: 1000 * 60 * 60 * 24 * 7,             // one day in milliseconds
          zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 ,
          min: new Date(2014, 8, 1),                // lower limit of visible range
          max: new Date(2016, 0, 1), 
          start: '2014-06-10',
          end: '2016-06-18',
          style:'points',
          drawPoints: {
            enabled: true,
            size: 30,
            style: 'circle' // square, circle
          },
          dataAxis: {
            customRange: {
                left: {
                    min: 2, max: 10
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
