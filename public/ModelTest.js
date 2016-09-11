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
		app.controller("WeatherController", function($scope, $http) {
			var unit = "fahrenheit";
			var display = [];
			display[0] = angular.element("#show0");
			display[1] = angular.element("#show1");
			display[2] = angular.element("#show2");
			display[3] = angular.element("#show3");
			display[4] = angular.element("#show4");
			display[5] = angular.element("#show5");
			
			var cities = [];
			cities[0] = "New York";
			cities[1] = "Chicago";
			cities[2] = "Philadelphia";
			cities[3] = "San Antonio";
			cities[4] = "Los Angeles";
			cities[5] = "Phoenix";

			$scope.getdata = function() {
				
				var url = "http://api.openweathermap.org/data/2.5/forecast/daily";
				
				for(var i = 0; i <= 5; i++) {
					$http.jsonp(url, { params: {
						APPID: "6793535174d5edec09fb58f14a9263ef",
						q: cities[i],
						cnt: 5,
						units: "imperial",
						callback: 'JSON_CALLBACK'
					}}).success(function(data, status, headers, config) {
						// console.log(data.list[0].temp.max);
						console.log(data);
						console.log(i);
						k = 5
						if(k < i) {
							console.log("Doing the loop");
							i = 0;
						}
						display[i].html(data.list[0].temp.max);
						i++;

					}).error(function(data, status, headers, config) {
						console.log('Could not retrieve data from ' + url);
					});
				}
			}
			$scope.tofahrenheit = function() {
				if(unit == "celsius") {
					for(var i = 0; i < display.length; i++) {
						var content = display[i].html();
						var converted = (content * (9/5)) + 32;
						var rounded = Math.round(converted * 100)/100;
						display[i].html(rounded);
					}
				}
				unit = "fahrenheit";
			}

			$scope.tocelsius = function() {
				console.log(unit);
				if(unit == "fahrenheit") {
					for(var i = 0; i < display.length; i++) {
						var content = display[i].html();
						var converted = (content - 32) * (5/9);
						var rounded = Math.round(converted * 100)/100;
						display[i].html(rounded);
					}
				}
				unit = "celsius";
			}

			$scope.tokelvin = function() {
				console.log(unit)
				if(unit == "fahrenheit") {
					for(var i = 0; i < display.length; i++) {
						var content = display[i].html();
						var converted = (parseInt(content) + 459.67) * (5/9);
						var rounded = Math.round(converted * 100)/100;
						display[i].html(rounded);
					}
				}
				unit = "kelvin";
			}

			$scope.locations = [{
				name: "New York",
				state: "NY",
				// temp: $scope.getdata("New York", "NY")
			}, {
				name: "Chicago",
				state: "IL",
				// temp: $scope.getdata("Chicago")
			}, {
				name: "Philadelphia",
				state: "PA",
				// temp: $scope.getdata("Philadelphia")
			}, {
				name: "San Antonio",
				state: "TX",
				// temp: $scope.getdata("San Antonio")
			}, {
				name: "Los Angeles",
				state: "CA",
				// temp: $scope.getdata("Los Angeles")
			}, {
				name: "Phoenix",
				state: "AZ",
				// temp: $scope.getdata("Phoenix")
			}];

		});
})();