(function() {
"Use Strict";
	var app = angular.module("ModelTest", ["ngRoute", "ngResource"]);

		app.config(function($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl : "/weather.htm"
		})
		.when("/about", {
			templateUrl : "/about.htm"
		});
	});
		app.controller("WeatherController", function($scope) {

			$scope.locations = [{
				name: "New York, NY"
			}, {
				name: "Chicago, IL"
			}, {
				name: "Philadelphia, PA"
			}, {
				name: "San Antonio, TX"
			}, {
				name: "Los Angeles, CA"
			}, {
				name: "Phoenix, AZ"
			}];

			this.getdata = function() {
				$.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
					APPID: "2255408d7aca211f7f864daeee1e71f9",
					q: locations[i],
					cnt: 3,
					units: "imperial"
				}).done(function(data) {
					console.log("Hello!!!!");
					console.log("Current Temp: " + data.list[0].main.temp);
					for(var i = 0; i < data.list.length; i++) {
						// var icon = data.list[]
					}
				});
			}
		});
})();