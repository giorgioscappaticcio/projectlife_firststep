'use strict';

/**
 * @ngdoc service
 * @name mudanoApp.generateVisItems
 * @description
 * # generateVisItems
 * Factory in the mudanoApp.
 */
angular.module('mudanoApp')
  .factory('mixData', function () {
    // This service is to combine the data from the response
    // with people group data and people pictures
    // to generate an array compatible with Timeline Vis JS 
    // ...

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

    // Public API here
    return {
      
      eventItems: function (data, group, avatars, filter) {
        var a = [];
        for (var i in data){
          if (data.hasOwnProperty(i)) {
            
            var obj = data[i];
            
            obj.id = i;
            obj.start = moment(obj.startdate,'DD-MM-YYYY');
            obj.end = moment(obj.enddate,'DD-MM-YYYY');
            obj.group = group[obj.userid];
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
      },

      eventDaysItems : function(events, eventid){
        var a = []
        for (var i in events){
          if (events.hasOwnProperty(i)){
            if (events[i].userid == eventid){
              var obj = {};
              obj.x = moment(events[i].date,'DD-MM-YYYY');
              obj.unit = events[i].unit;
              switch(events[i].value){
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
        a.forEach(orderDates);
        return a
      },

      generatePeople: function(data,group,avatars){
        var a = [];
          
        for (var i in data){
          if (data.hasOwnProperty(i)) {
            var person = {};    
            person.name = data[i].name;
            person.userid = data[i].userid;
            person.group = group[person.userid];
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
      
    };
  });
