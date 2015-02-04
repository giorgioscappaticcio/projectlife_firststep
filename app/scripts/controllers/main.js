'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
	.controller('MainCtrl', function ($scope, mani) {

		$scope.publicholiday = [
{id:555550,start:moment('25/12/2014','DD-MM-YYYY'),end:moment('27/12/2014','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555551,start:moment('01/01/2015','DD-MM-YYYY'),end:moment('02/01/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555552,start:moment('03/04/2015','DD-MM-YYYY'),end:moment('03/04/2015','DD-MM-YYYY').add(12,'hours'),className:'P',unit:'AM',group:'PH'},
{id:55555,start:moment('06/04/2015','DD-MM-YYYY'),end:moment('07/04/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555553,start:moment('04/05/2015','DD-MM-YYYY'),end:moment('05/05/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555554,start:moment('25/05/2015','DD-MM-YYYY'),end:moment('26/05/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555555,start:moment('31/08/2015','DD-MM-YYYY'),end:moment('01/09/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555556,start:moment('25/12/2015','DD-MM-YYYY'),end:moment('26/12/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'},
{id:555557,start:moment('28/12/2015','DD-MM-YYYY'),end:moment('29/12/2015','DD-MM-YYYY'),className:'P',unit:'',group:'PH'}
		];

		

		
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
		// $scope.group = new vis.DataSet([
		// 	{id: 'AM', content:'AM'},
  //       	{id: 'PM', content:'PM'}
  //       ]);
        $scope.group = new vis.DataSet([
			{id: 'FE', content:'Frontend'},
        	{id: 'BE', content:'Backend'},
        	{id: 'M', content:'Manager'},
        	{id: 'BA', content:'Bussinest Analyst'}
        ]);

        $scope.refresh = function(filter){
        	mani.getHolidays().then(function(response){
	        	//console.log(response);
	        	var datasetta = [];
				
				for (var i in response) {
				  if (response.hasOwnProperty(i)) {
				    //console.log(i + " -> " + response[i].date);
				 	if (response[i].value != filter){
				 		var absence = {};
					 	absence.content = '<img src="'+$scope.peopleAvatar[response[i].userid]+'">';
					 	//absence.content = response[i].name + '<br>'+response[i].unit+ '<br>'+response[i].date;
					 	absence.id = i;
					 	// absence.group = response[i].unit;
					 	absence.group = $scope.skills[response[i].userid];
					 	absence.subgroupOrder = parseInt(response[i].userid);
					 	absence.className = response[i].value;
					 	//absence.subgroup = response[i].id;
					 	absence.start = moment(response[i].startdate, "DD-MM-YYYY");
					 	absence.end = moment(response[i].enddate, "DD-MM-YYYY");
					 	console.log(response[i].unit);
					 	switch(response[i].unit){
					 		case 'AM':
					 			absence.start;
					 			absence.end.add(12, 'hours');
					 			console.log(absence.start)
					 		break;
					 		case 'PM':
					 			absence.start.add(12, 'hours');
					 			absence.end.add(24, 'hours');
					 			console.log(absence.end)
					 			console.log(absence.start)
					 		break;
					 		default:
					 			absence.start;
					 			absence.end.add(24, 'hours');;
					 		break;
					 	}
					 	
					 	
					 	datasetta.push(absence)	
				 	}
				 	
				  }
				}
				$scope.items = new vis.DataSet(datasetta)
	        });
        }

        $scope.refresh('P');

        $scope.showholiday = function(){
        	if ($scope.isPubHolShown || $scope.isPubHolShown==undefined ) {
        		$scope.refresh('');
        		
        	} else {
        		$scope.refresh('P');
        	}
        	$scope.isPubHolShown = !$scope.isPubHolShown; 
        }
        


		// mani.getData().then(function(response){
			
		// 	$scope.peopleIDs = genIDsArr(response);

			

		// 	$scope.peopleHoliday = {}

		// 	for (var i=0; i<$scope.peopleIDs.length; i++){
				
		// 		// order dates inside 
		// 		//$scope.peopleHoliday{vacations:[],publicholidays:[],traing:[]}

		// 		$.grep( response, function( n, j ) {
	 //  				 if (n.userid == $scope.peopleIDs[i]){
	  				 	
	 //  				 	if ($scope.peopleHoliday[n.userid] == undefined){
	 //  				 		$scope.peopleHoliday[n.userid] = {}	
	 //  				 	}
	 //  				 	var date = moment(n.date,'DD-MM-YYYY');
	 //  				 	switch (n.value){
	 //  				 		case 'V':
	 //  				 			if ($scope.peopleHoliday[n.userid].vacation == undefined) {
		// 	  				 		$scope.peopleHoliday[n.userid].vacation = [];	
		// 	  				 	} 
	 //  				 			$scope.peopleHoliday[n.userid].vacation.push(date);
	 //  				 		break;
	 //  				 		case 'P':
	 //  				 			if ($scope.peopleHoliday[n.userid].publicholiday == undefined) {
		// 	  				 		$scope.peopleHoliday[n.userid].publicholiday = [];	
		// 	  				 	} 
	 //  				 			$scope.peopleHoliday[n.userid].publicholiday.push(date);
	 //  				 		break;
	 //  				 		case 'T':
	 //  				 			if ($scope.peopleHoliday[n.userid].training == undefined) {
		// 	  				 		$scope.peopleHoliday[n.userid].training = [];	
		// 	  				 	} 
	 //  				 			$scope.peopleHoliday[n.userid].training.push(date);
	 //  				 		break;
	 //  				 	}	
	 //  				 }
	 //  			});
				
		// 	}




		// 	//console.log(filterStore( response, filter));
		// 	//$scope.items = new vis.DataSet (response);
		// 	// $.grep( response, function( n, i ) {
  // 			// 			 n.date
		// 	// });
		// 	// var result = $.grep(response, function(e){ return e.id === id; });
		// 	var datasetta = [];
		// 	for (var i in response) {
		// 	  if (response.hasOwnProperty(i)) {
		// 	    //console.log(i + " -> " + response[i].date);
		// 	 	// if (response[i].userid == 1){
		// 	 		var absence = {};
		// 		 	absence.content = response[i].name;
		// 		 	//absence.content = response[i].name + '<br>'+response[i].unit+ '<br>'+response[i].date;
		// 		 	absence.id = i;
		// 		 	// absence.group = response[i].unit;
		// 		 	absence.group = $scope.skills[response[i].userid];
		// 		 	absence.className = response[i].value;
		// 		 	//absence.subgroup = response[i].id;
		// 		 	absence.start = moment(response[i].date, "DD-MM-YYYY");
		// 		 	datasetta.push(absence)	
		// 	 	// }
			 	
		// 	  }
		// 	}
		// 	//console.log(datasetta)
		// 	$scope.items = new vis.DataSet(datasetta)
			
		// });


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
