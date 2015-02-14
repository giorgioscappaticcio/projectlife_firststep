'use strict';

/**
 * @ngdoc service
 * @name mudanoApp.extrainfo
 * @description
 * # extrainfo
 * Constant in the mudanoApp.
 */
angular.module('mudanoApp')
  .constant('extrainfo', {
  	
  	holidayTypes : [
  		{id:'V',content:'Vacation'},
  		{id:'T',content:'Training'},
  		{id:'P',content:'Public Holidays'}
	],

  	groups : [
  		{ id:'FE', content : 'Frontend developers'},
  		{ id:'BE', content : 'Backend developers'},
  		{ id:'M', content : 'Project Managers'},
  		{ id:'BA', content : 'Business Analyst'}
  	],

  	skills : 
  	{
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
	},
	avatars : 
	{
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
		23:'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg'
	}
  });
