'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
	.controller('MainCtrl', function ($scope, mani, extrainfo, $window) {

		// Top panel right deactivated
		$scope.showCal = false;
		// Bottom panel right deactivated
		$scope.showRight = false;

		// Call the data
		mani.getHolidays().then(function(response){
        	$scope.originalResp = response;
        	// Show elements on timeline without public holidays
        	$scope.refresh('P');
        	$scope.showPublicHol = false;
        	// Generate an array with the name, the group and the picture of the people;
        	$scope.people = generatePeople(response,$scope.skills, $scope.peopleAvatar);
        	// Generate an array with the events;
        	var res = [];
        	angular.copy(response, res);
        	$scope.events = genVisJsItems(res,$scope.skills, $scope.peopleAvatar,'');
        	//$scope.FE_events = filterGroupEvents($scope.events,'BE');
        	//$scope.FE_events.forEach(checkOverlapEvents);
		});

		mani.getData().then(function(response){
        	$scope.singleDateResponse = response;
        });


		// Added some extrainfo to original dataset 
		// like position(skills) and people picture;
		$scope.skills = extrainfo.skills;
		$scope.peopleAvatar = extrainfo.avatars;

		// When click on timeline element
		$scope.$watch('clickedEvent',function(clickedEvent){ 
	    	if(clickedEvent){
	          	// Top panel right activated
	          	$scope.showCal = true;
	          	// Generate dates for the graph on right side
	       		$scope.holidayplan = generateHolidayPlan($scope.singleDateResponse,$scope.events[clickedEvent].userid);
	       		$scope.holidayplan.forEach(orderDates);
	       		// Create object with dates to zoom the graph on right side
	       		$scope.focus = {};	
	       		$scope.focus.start = $scope.events[clickedEvent].start;
	       		$scope.focus.end = $scope.events[clickedEvent].end;
	       	}        
		});

		// When change element in "select group of people" box
		$scope.$watch('refineGroup',function(refineGroup){
        	console.log(refineGroup)
        	$scope.showRight = false;
        	filterGroup(refineGroup);
        	if (refineGroup){
        		
        		if (refineGroup != 'All'){
        			$scope.groupFilter = refineGroup;
        		} else {
        			$scope.groupFilter = '';
        		}
        	}
        });

	
		$scope.refresh = function(filter){
        	var response = [];
        	angular.copy($scope.originalResp, response);
        	response = genVisJsItems(response,$scope.skills, $scope.peopleAvatar,filter);
			//console.log(response);
			$scope.items = response;
        }

        $scope.showholiday = function(){
        	if (!$scope.showPublicHol){
        		$scope.refresh('');	
        	} else {
        		$scope.refresh('P');
        	}
        	
        	$scope.showPublicHol = !$scope.showPublicHol;
        }

        $scope.sameDay = function(start,end){
			if (start.diff(end,'days') == 0){
				return true;
			}
		}
        
        $scope.showEvent = function(user){
        	// Define person to display in bottom right sidebar
        	user.position = extrainfo.groups[user.group];
        	$scope.personDetails = user;

        	// Show bottom right sidebar
        	$scope.showRight = true;
        	// Assign right height to the bottom right sidebar
        	var bodyHeight = angular.element('body').height();
        	var windowHeight = $window.innerHeight;
        	var topSum = 400 + 60 + 20 + 20;
        	if ( bodyHeight< windowHeight){
    			$scope.rightHeight = windowHeight  -topSum;
    		} else {
    			$scope.rightHeight = bodyHeight  -topSum;
    		};
        }

        $scope.demoment = function(date,format){
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

        $scope.showInfografica = function (){
        	if ($scope.refineGroup==undefined || $scope.refineGroup==''){
        		return true;
        	} else {
        		return false;
        	}
        }

        

        function genVisJsItems (response,skills,avatars,filter){
        	var a = [];
        	for (var i in response){
        		if (response.hasOwnProperty(i)) {
        			var obj = response[i];
					obj.id = i;
					obj.start = moment(obj.startdate,'DD-MM-YYYY');
					obj.end = moment(obj.enddate,'DD-MM-YYYY');
					obj.group = skills[obj.userid];
					obj.content = '<img src="'+avatars[obj.userid]+'" />';
					obj.className = obj.value;
					switch(obj.unit){
				 		case 'AM':
				 			obj.end.add(12, 'hours');
				 		break;
				 		case 'PM':
				 			obj.start.add(12, 'hours');
				 			obj.end.add(24, 'hours');
				 		break;
				 		default:
				 			obj.end.add(24, 'hours');
				 		break;
				 	}
					obj.startdate = moment(obj.startdate,'DD-MM-YYYY');
					obj.enddate = moment(obj.enddate,'DD-MM-YYYY');

					if (obj.value != filter){
        				a.push(obj);
        			}
					
        		}
        	}
        	return a;
        }

        function generatePeople(response,skills,avatars){
        	var a = [];
        	
        	for (var i in response){
        		if (response.hasOwnProperty(i)) {
        			var person = {};		
        			person.name = response[i].name;
        			person.userid = response[i].userid;
        			person.group = skills[person.userid];
					person.image = '<img src="'+avatars[person.userid]+'" />';

        			
        			if (a.length < 1 ){a.push(person)} else {
        				//console.log (a[a.length-1]);
        				if (parseInt(a[a.length-1].userid)!=parseInt(person.userid)){
        					a.push(person)
        				}
        			}
        		}
        	}
        	return a;
        }

        function compareDate(eventA, eventB){
            if (eventA.start <= eventB.end && eventA.end >= eventB.start){
        		return true;
        	}
        }

        function filterGroupEvents(events,groupfilter){
        	var a = [];
        	for (var i in events) {
        		if(events.hasOwnProperty(i)){
        			if (events[i].group == groupfilter) {
        				a.push(events[i]);
        			} 
        		}
        	}
        	return	a; 
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

		function orderDates(element,index,array){
			var a = [];
			
			for (var i=index+1; i<array.length; i++) {
				//obj = {}
				if (element.date != array[i].date ){
					a.push(element)
				} else {
					// console.log(element.unit)
				}
			}
			return a;
		}

		function generateHolidayPlan(response, id){
			var a = []
			for (var i in response){
				if (response.hasOwnProperty(i)){
					if (response[i].userid == id){
						var obj = {};
						obj.x = moment(response[i].date,'DD-MM-YYYY');
						obj.unit = response[i].unit;
						switch(response[i].value){
							case 'V':
							obj.y = 8;
							obj.group = 'V';
							break;
							case 'P' : 
							obj.y = 6;
							obj.group = 'P';
							break;
							case 'T':
							obj.y = 4;
							obj.group = 'T';
							break;
						}
						a.push(obj)
					}
				}
			}
			return a;
		}
        
		function filterGroup (filter){
        	if (filter != 'All' && filter != '' && filter != undefined) {
        		$scope.group = new vis.DataSet([
					{id: filter, content: extrainfo.groups[filter]}
	        	]);
        	} else {
        		$scope.group = new vis.DataSet([
					{id: 'FE', content:'Frontend Developers'},
		        	{id: 'BE', content:'Backend Developers'},
		        	{id: 'M', content:'Project Managers'},
		        	{id: 'BA', content:'Bussiness Analyst'}
		        ]);
        	}
        }

		function genIDsArr(response){
			var arrPeopleId = [];
			var peopleandtype = {};
			
			$.each(response, function(i) {
			  arrPeopleId.push(response[i].userid)
			});
			//console.log(arrPeopleId);
			var uniqPeopleId = [];
				$.each(arrPeopleId, function(i, el){
					if($.inArray(el, uniqPeopleId) === -1) uniqPeopleId.push(el);
				});
			return uniqPeopleId;
		}





		

	});
