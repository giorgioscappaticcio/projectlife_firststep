'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
	.controller('MainCtrl', function ($scope, mani, $window) {

		$scope.showCal = false;
		$scope.showRight = false;

		$scope.$watch('clickedEvent',function(clickedEvent){ 
	    	if(clickedEvent){
	          
	          console.log($scope.events[clickedEvent])
	          
	       		$scope.showCal = true;
	       		
	       		$scope.holidayplan = generateHolidayPlan($scope.singleDateResponse,$scope.events[clickedEvent].userid);
	       		$scope.holidayplan.forEach(orderDates);
	       		$scope.focus = {};	
	       		$scope.focus.start = $scope.events[clickedEvent].start;
	       		$scope.focus.end = $scope.events[clickedEvent].end;
	       		
	       		
	       		console.log(clickedEvent);
	       }        
		});

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

	
		$scope.skills = {
				1 : 'FE',
				2: 'M',
				3: 'FE',
				4: 'BE',
				5: 'FE',
				6: 'M',
				7: 'BA',
				8: 'FE',
				9: 'BA',
				10: 'BE',
				11: 'BE',
				12: 'BE',
				13: 'M',
				14: 'BE',
				15: 'BE',
				16: 'BE',
				17: 'BE',
				18: 'FE',
				19: 'FE',
				20: 'BE',
				21: 'BE',
				22: 'FE',
				23: 'M',
			}

		$scope.peopleAvatar = {
			1:'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg',
			2:'https://s3.amazonaws.com/uifaces/faces/twitter/mizko/128.jpg',
			3:'https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg',
			4:'https://s3.amazonaws.com/uifaces/faces/twitter/tonypeterson/128.jpg',
			5:'https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/128.jpg',
			6:'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
			7:'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
			8:'https://s3.amazonaws.com/uifaces/faces/twitter/vocino/128.jpg',
			9:'https://s3.amazonaws.com/uifaces/faces/twitter/jina/128.jpg',
			10:'https://s3.amazonaws.com/uifaces/faces/twitter/sortino/128.jpg',
			11:'https://s3.amazonaws.com/uifaces/faces/twitter/pixeliris/128.jpg',
			12:'https://s3.amazonaws.com/uifaces/faces/twitter/uxceo/128.jpg',
			13:'https://s3.amazonaws.com/uifaces/faces/twitter/th3ya0vi/128.jpg',
			14:'https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg',
			15:'https://s3.amazonaws.com/uifaces/faces/twitter/boheme/128.jpg',
			16:'https://s3.amazonaws.com/uifaces/faces/twitter/motherfuton/128.jpg',
			17:'https://s3.amazonaws.com/uifaces/faces/twitter/lobanovskiy/128.jpg',
			18:'https://s3.amazonaws.com/uifaces/faces/twitter/motherfuton/128.jpg',
			19:'https://s3.amazonaws.com/uifaces/faces/twitter/_arashasghari/128.jpg',
			20:'https://s3.amazonaws.com/uifaces/faces/twitter/flashmurphy/128.jpg',
			21:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
			22:'https://s3.amazonaws.com/uifaces/faces/twitter/nettatheninja/128.jpg',
			23:'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
		}

        

        mani.getHolidays().then(function(response){
        	$scope.originalResp = response;
        	$scope.refresh('P');
        	$scope.showPublicHol = false;
        	$scope.people = generatePeople(response,$scope.skills, $scope.peopleAvatar);
        	var res = [];
        	angular.copy(response, res);
        	$scope.events = genVisJsItems(res,$scope.skills, $scope.peopleAvatar,'');
        	$scope.FE_events = filterGroupEvents($scope.events,'BE');
        	$scope.FE_events.forEach(checkOverlapEvents);
		});

		mani.getData().then(function(response){
        	$scope.singleDateResponse = response;
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
        	$scope.showRight = true;
        	var bodyHeight = angular.element('body').height();
        	var windowHeight = $window.innerHeight;
        	var topSum = 400 + 60 + 20 + 20;
        	if ( bodyHeight< windowHeight){
    			$scope.rightHeight = windowHeight  -topSum;
    		} else {
    			$scope.rightHeight = bodyHeight  -topSum;
    		};
        	
        	switch(user.group){
        		case 'BA':
        		user.position = 'Bussiness Analyst';
        		break;
        		case 'M':
        		user.position = 'Project Managers';
        		break;
        		case 'FE':
        		user.position = 'Frontend Developers';
        		break;
        		case 'BE':
        		user.position = 'Backend Developers';
        		break;
        		default:
        	}
        	$scope.personDetails = user;
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
        	switch(filter){
        		case 'FE':
        			$scope.group = new vis.DataSet([
						{id: 'FE', content:'Frontend Developers'}
		        	]);
		        break;
		        case 'BE':
        			$scope.group = new vis.DataSet([
						{id: 'BE', content:'Backend Developers'}
		        	]);
		        break;
		        case 'M':
        			$scope.group = new vis.DataSet([
						{id: 'M', content:'Project Managers'}
		        	]);
		        break;
		        case 'BA':
        			$scope.group = new vis.DataSet([
						{id: 'BA', content:'Bussiness Analyst'}
		        	]);
		        break; 
		        default :
		        $scope.group = new vis.DataSet([
					{id: 'FE', content:'Frontend Developers'},
		        	{id: 'BE', content:'Backend Developers'},
		        	{id: 'M', content:'Project Managers'},
		        	{id: 'BA', content:'Bussiness Analyst'}
		        ]);
		        break;
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
