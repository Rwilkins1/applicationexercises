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
		app.controller("RouteController", function($scope) {
			$scope.reroute = function($url) {
				if($url != window.location.href) {
					location.replace($url);
				}
			}
		});
		app.controller("WeatherController", function($scope, $http) {
			var unit = "fahrenheit";
			var currentcity = "New York";
			var display = [];
			display[0] = angular.element("#show0");
			display[1] = angular.element("#show1");
			display[2] = angular.element("#show2");
			display[3] = angular.element("#show3");
			display[4] = angular.element("#show4");
			display[5] = angular.element("#show5");

			var fullmaxdisplay = [];
			fullmaxdisplay[0] = $("#revealmax0");
			fullmaxdisplay[1] = angular.element("#revealmax1");
			fullmaxdisplay[2] = angular.element("#revealmax2");
			fullmaxdisplay[3] = angular.element("#revealmax3");
			fullmaxdisplay[4] = angular.element("#revealmax4");
			console.log(fullmaxdisplay[0].html());
			var fullmindisplay = [];
			fullmindisplay[0] = angular.element("#revealmin0");
			fullmindisplay[1] = angular.element("#revealmin1");
			fullmindisplay[2] = angular.element("#revealmin2");
			fullmindisplay[3] = angular.element("#revealmin3");
			fullmindisplay[4] = angular.element("#revealmin4");

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

			$scope.getfulldata = function($city, $currentunit, $goalunit) {
				var url = "http://api.openweathermap.org/data/2.5/forecast/daily";
				$http.jsonp(url, { params: {
						APPID: "6793535174d5edec09fb58f14a9263ef",
						q: $city,
						cnt: 5,
						units: "imperial",
						callback: 'JSON_CALLBACK'
				}}).success(function(data, status, headers, config) {
					var visual = angular.element("#fulldata");
					visual.html($city);
					for(var i = 0; i < data.list.length; i++) {
						var months = ["January", "February", "March", "April", "May", "June",
  						"July", "August", "September", "October", "November", "December"
						];
						var currentdate = new Date();
						var date = months[currentdate.getMonth()] + " " + (currentdate.getDate() + i);
						var max = data.list[i].temp.max;
						var min = data.list[i].temp.min;
						if($currentunit == "fahrenheit") {

							if($goalunit == "celsius") {
								max = (max - 32) * (5/9);
								min = (min - 32) * (5/9);
							} else if($goalunit == "kelvin") {
								max = (parseInt(max) + 459.67) * (5/9);
								min = (parseInt(min) + 459.67) * (5/9);
							} else {
								max = max;
								min = min;
							}

						} else if($currentunit == "celsius") {
							if($goalunit == "fahrenheit") {
								max = (max * (9/5)) + 32;
								min = (min * (9/5)) + 32;
							} else if($goalunit == "kelvin") {
								max = (parseInt(max) + 273.15);
								min = (parseInt(min) + 273.15);
							} else {
								max = (max - 32) * (5/9);
								min = (min - 32) * (5/9);
							}
						} else if($currentunit == "kelvin") {
							if($goalunit == "fahrenheit") {
								max = (max * (9/5)) - 459.67;
								min = (min * (9/5)) - 459.67;
							} else if($goalunit == "celsius") {
								max = max - 273.15;
								min = min - 273.15;
							} else {
								max = (parseInt(max) + 459.67) * (5/9);
								min = (parseInt(min) + 459.67) * (5/9);
							}
						}
						max = Math.round(max * 100)/100;
						min = Math.round(min * 100)/100;
						visual.append("<h3>" + date + ": <span id='revealmax" + i + "'>" + max + "</span>/<span id='revealmin" + i + "'>" + min + "</span></h3>");
					}
					currentcity = $city;
				}).error(function(data, status, headers, config) {
					console.log("Could not retrieve data from" + url);
				});
			}

			$scope.checksettings = function($city) {

			}
			$scope.tofahrenheit = function() {
				for(var i = 0; i < display.length; i++) {
					var content = display[i].html();
					if(unit == "celsius") {
						var converted = (content * (9/5)) + 32;
					} else if(unit == "kelvin") {
						var converted = (content * (9/5)) - 459.67;
					} else {
						var converted = content;
					}
					var rounded = Math.round(converted * 100)/100;
					display[i].html(rounded);
				}
				$scope.getfulldata(currentcity, unit, 'fahrenheit');
				// for(var k = 0; k < fullmaxdisplay.length; k++) {
				// 	var maxcontent = fullmaxdisplay[k].html();
				// 	var mincontent = fullmindisplay[k].html();
				// 	if(unit == "celsius") {
				// 		var maxconverted = (maxcontent * (9/5)) + 32;
				// 		var minconverted = (mincontent * (9/5)) + 32;
				// 	} else if(unit == "kelvin") {
				// 		var maxconverted = (maxcontent * (9/5)) - 459.67;
				// 		var minconverted = (mincontent * (9/5)) - 459.67;
				// 	} else {
				// 		var maxconverted = maxcontent;
				// 		var minconverted = mincontent;
				// 	}
				// 	var maxrounded = Math.round(maxconverted * 100)/100;
				// 	var minrounded = Math.round(minconverted * 100)/100;
				// 	fullmaxdisplay[k].html(maxrounded);
				// 	fullmindisplay[k].html(minrounded);
				// }
					unit = "fahrenheit";
				}

			$scope.tocelsius = function($city) {
				// console.log(unit);
				for(var i = 0; i < display.length; i++) {
					var content = display[i].html();
					if(unit == "fahrenheit") {
						var converted = (content - 32) * (5/9);
					} else if(unit == "kelvin") {
						var converted = content - 273.15;
					} else {
						var converted = content;
					}
					var rounded = Math.round(converted * 100)/100;
					display[i].html(rounded);
				}
				$scope.getfulldata(currentcity, unit, 'celsius');
				// for(var k = 0; k < fullmaxdisplay.length; k++) {
				// 	var maxcontent = fullmaxdisplay[k].html();
				// 	var mincontent = fullmindisplay[k].html();
				// 	if(unit == "fahrenheit") {
				// 		var maxconverted = (maxcontent - 32) * (5/9);
				// 		var minconverted = (mincontent - 32) * (5/9);
				// 	} else if(unit == "kelvin") {
				// 		var maxconverted = maxcontent - 273.15;
				// 		var minconverted = mincontent - 273.15;
				// 	} else {
				// 		var maxconverted = maxcontent;
				// 		var minconverted = mincontent;
				// 	}
				// 	var maxrounded = Math.round(maxconverted * 100)/100;
				// 	var minrounded = Math.round(minconverted * 100)/100;
				// 	fullmaxdisplay[k].html(maxrounded);
				// 	// console.log(k);
				// 	// console.log(fullmaxdisplay[k]);
				// 	fullmindisplay[k].html(minrounded);
				// }
				unit = "celsius";
			}

			$scope.tokelvin = function($city) {
				console.log(unit);
				for(var i = 0; i < display.length; i++) {
					var content = display[i].html();
					if(unit == "fahrenheit") {
						var converted = (parseInt(content) + 459.67) * (5/9);
					} else if(unit == "celsius") {
						var converted = (parseInt(content) + 273.15);
					} else {
						var converted = content;
					}
						var rounded = Math.round(converted * 100)/100;
						display[i].html(rounded);
				}
				$scope.getfulldata(currentcity, unit, 'kelvin');	
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