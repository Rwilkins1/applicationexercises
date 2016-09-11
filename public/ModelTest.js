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
			
			$scope.getdata = function() {
				console.log("The function ran");
				var display = [];
				display[0] = angular.element("#show0");
				display[1] = angular.element("#show1");
				display[2] = angular.element("#show2");
				display[3] = angular.element("#show3");
				display[4] = angular.element("#show4");
				display[5] = angular.element("#show5");
				console.log(display[0]);
				var cities = [];
				cities[0] = "New York";
				cities[1] = "Chicago";
				cities[2] = "Philadelphia";
				cities[3] = "San Antonio";
				cities[4] = "Los Angeles";
				cities[5] = "Phoenix";
				
				var url = "http://api.openweathermap.org/data/2.5/forecast/daily";
				
				for(var i = 0; i <= 5; i++) {
					console.log(i);
					$http.jsonp(url, { params: {
						APPID: "6793535174d5edec09fb58f14a9263ef",
						q: cities[i],
						cnt: 3,
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
						display[i].append(data.list[0].temp.max + " degrees</h3>");
						i++;

					}).error(function(data, status, headers, config) {
						console.log('Could not retrieve data from ' + url);
					});
				}
			}
			// $scope.getdata();
			// $scope.getdata("New York", "NYdata");
			// console.log(NYdata);
			// console.log($scope.getdata("New York", "NY"));

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