'use strict';

/**
 * @ngdoc service
 * @name mudanoApp.mani
 * @description
 * # mani
 * Service in the mudanoApp.
 */
angular.module('mudanoApp')
  .service('mani', function mani($http, $q) {
    
    var dataJson = '././data/data.json';
  	var holidaysJson = '././data/holidays.json';

  	
    this.getHolidays = function(){
      var deferred = $q.defer();

      $http.get(holidaysJson).success (function(data){
          deferred.resolve(data);
      });

    return deferred.promise;
    }

  	this.getData = function(){
  		var deferred = $q.defer();

	    $http.get(dataJson).success (function(data){
	        deferred.resolve(data);
	    });

    return deferred.promise;
  	}


  });
