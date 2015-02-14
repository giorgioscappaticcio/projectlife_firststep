'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
	.controller('MainCtrl', function ($scope, mainSrvc, extrainfo, mixData,$filter) {

		// Top panel right deactivated
		$scope.showCal = false;
		// Bottom panel right deactivated
		$scope.showRight = false;
		// Show public holiday: false as default
		$scope.showPublicHol = false;

		// Added some extrainfo to original dataset 
		// like position(skills) and people picture;
		$scope.skills = extrainfo.skills;
		$scope.peopleAvatar = extrainfo.avatars;
		$scope.groups = extrainfo.groups;
		$scope.holidayTypes = extrainfo.holidayTypes;
		

		// Call the data
		mainSrvc.getHolidays().then(function(response){
        	$scope.originalResp = response;
        	
        	// Show elements on timeline without public holidays
        	$scope.refresh('P');
        	
        	// Generate an array with the name, the group and the picture of the people;
        	$scope.people = mixData.generatePeople(response,$scope.skills, $scope.peopleAvatar);
        	
        	// Generate an array with the events;
        	$scope.events = mixData.eventItems(response,$scope.skills, $scope.peopleAvatar,'');
        	//$scope.FE_events = filterGroupEvents($scope.events,'BE');
        	//$scope.FE_events.forEach(checkOverlapEvents);
		});

		mainSrvc.getData().then(function(response){
        	$scope.singleDateResponse = response;
        });


		


		// When click on timeline element
		$scope.$watch('clickedEvent',function(clickedEvent){ 
	    	if(clickedEvent){
	          	// Top panel right activated
	          	$scope.showCal = true;
	          	// Generate dates for the graph on right side
	       		$scope.holidayplan = mixData.eventDaysItems($scope.singleDateResponse,$scope.events[clickedEvent].userid);
	       		
	       		// Create object with dates to zoom the graph on right side
	       		$scope.focus = {};	
	       		$scope.focus.start = $scope.events[clickedEvent].start;
	       		$scope.focus.end = $scope.events[clickedEvent].end;
	       	}        
		});

		// When change element in "select group of people" box
		$scope.$watch('refineGroup',function(refineGroup){
        	// console.log(refineGroup)
        	$scope.showRight = false;
        	
        	if (refineGroup){
        		$scope.group = new vis.DataSet([
					{id: refineGroup.id, content: refineGroup.content}
	        	]);
	        	$scope.showInfografica = false;
	        	$scope.groupFilter = refineGroup.id;
        	} else {
        		$scope.group = new vis.DataSet(extrainfo.groups);
        		$scope.showInfografica = true;
        	}
        });

		

	
		$scope.refresh = function(filter){
        	$scope.items = mixData.eventItems($scope.originalResp,$scope.skills, $scope.peopleAvatar,filter);
		}

        $scope.showholiday = function(){
        	if (!$scope.showPublicHol){
        		$scope.refresh('');	
        	} else {
        		$scope.refresh('P');
        	}
        	
        	$scope.showPublicHol = !$scope.showPublicHol;
        }

        
        $scope.showEvent = function(user){
        	// Define person to display in bottom right sidebar
			user.position = $filter('getObjByProperty')(extrainfo.groups,'id',user.group)[0].content; 
	      	
        	$scope.personDetails = user;

        	// Show bottom right sidebar
        	$scope.showRight = true;
        }

        


        

        

        function compareDate(eventA, eventB){
            if (eventA.start <= eventB.end && eventA.end >= eventB.start){
        		return true;
        	}
        }


		function checkOverlapEvents (element, index, array){
			// console.log(element.eventid)
			var a = [];
			
			for (var i=index+1; i<array.length; i++) {
				var samePerson = array[i].name == element.name;
				

				 var overlap = compareDate(element,array[i]);
				 if (overlap){
				 	if (element.value != 'P' && array[i] != 'P'){ 
				 		
				 		//console.log('firstevent '+element.name+' ('+element.value+') '+moment(element.start).format('DD-MM-YYYY')+'==='+moment(element.end).format('DD-MM-YYYY'));
						//console.log('secondevent '+array[i].name+' ('+array[i].value+')'+moment(array[i].start).format('DD-MM-YYYY')+'==='+moment(array[i].end).format('DD-MM-YYYY'));
					}
				}
			}
		}

		
    });
