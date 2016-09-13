(function() {
"Use Strict";
// Start of the Module (referred to as 'Model' here)
	var app = angular.module("ModelTest", ["ngRoute", "ngResource"]);

	// The router. Uses weather.htm at the index and about.htm at /about
		app.config(function($routeProvider) {
			$routeProvider
			.when("/", {
				templateUrl : "/weather.htm"
			})
			.when("/about", {
				templateUrl : "/about.htm"
			});
		});

	// This controller makes the navbar function
		app.controller("RouteController", function($scope) {
			$scope.reroute = function($url) {
				if($url != window.location.href) {
					location.replace($url);
				}
			}
		});

	// Holds the data for the about page. 
		app.controller("AboutController", function($scope) {
			$scope.languages = [{
				name: "HTML"
			}, {
				name: "CSS"
			}, {
				name: "Twitter Bootstrap"
			}, {
				name: "JavaScript"
			}, {
				name: "jQuery"
			}, {
				name: "MySQL"
			}, {
				name: "PHP"
			}, {
				name: "Laravel"
			}];

			$scope.qualifications = [{
				heading: "I am results-oriented:",
				body: "When I take on a project, it is my goal to meet and exceed expectations and deadlines as often as I am able."
			}, {
				heading: "I am a fast learner:",
				body: "As evidenced by this project, I can learn new technologies and programming languages well enough to yield results in a timely manner. Prior to this project, the most I had ever done in Angular JavaScript was a single module."
			}, {
				heading: "I am a lifelong self-starter",
				body: "For my whole life I have been the kind of person who doesn't give up on his goals. When I was going into High School, I decided I wanted to learn to play the guitar. Over the summer of that year I taught myself to play, and I eventually went on to teach myself to play the mandolin, ukulele, and bass guitar. I am currently working on the banjo as well. When I was a student at Codeup, I would spend long hours after class continuing to learn whatever language we were learning on my own."
			}, {
				heading: "I love what I do:",
				body: "Despite the many frustrations that arose during the development of this weather app, I enjoyed having the opportunity to create an app based off of a framework I had never really delved into before."
			}];

			$scope.funfacts = [{
				fact: "I was the youngest musician to ever perform in the Northgate Music Festival in College Station"
			}, {
				fact: "I was in a band in college, and we opened up for 'Nelly's Echo' from 'The Voice' twice."
			}, {
				fact: "I have dined with Kazakstan royalty."
			}, {
				fact: "When I am not coding or playing music, I am working as an aspiring video game critic."
			}, {
				fact: "I spent three years in college volunteering at the San Antonio Children's Shelter as a tutor."
			}];
		});

	// This controller handles the data for the weather page
		app.controller("WeatherController", function($scope, $http) {
		// keeps track of the current unit the user is using
			var unit = "fahrenheit";

		// keeps track of the city the user is viewing
			var currentcity = "New York";

		// an array to be iterated through to show the temperature for each city
			var display = [];
			display[0] = angular.element("#show0");
			display[1] = angular.element("#show1");
			display[2] = angular.element("#show2");
			display[3] = angular.element("#show3");
			display[4] = angular.element("#show4");
			display[5] = angular.element("#show5");

		// City names
			var cities = [];
			cities[0] = "New York";
			cities[1] = "Chicago";
			cities[2] = "Philadelphia";
			cities[3] = "San Antonio";
			cities[4] = "Los Angeles";
			cities[5] = "Phoenix";

		// Retrieves one temperature for each city on page load
		// NOTE: There was a bug where the for loop would only run with the last possible value of "i" under ".success".
		// NOTE(cont): I got around this bug with the "k" section, but it sometimes yields the results in the wrong order. 
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
						k = 5
						console.log(data);
						if(k < i) {
							i = 0;
						}
						display[i].html(data.list[0].temp.max);
						i++;

					}).error(function(data, status, headers, config) {
						console.log('Could not retrieve data from ' + url);
					});
				}
			}

		// Called for New York on page load, whenever a user clicks on a different city, and whenever a user changes units. 
		// Retrieves the five day forecast for the city the user selects and converts the units, if necessary.
		// NOTE: There is currently a bug where some unit conversions display incorrect results until that same unit conversion button is clicked a second time. This does not occur on the left side.
			$scope.getfulldata = function($city, $currentunit, $goalunit) {
			
			// The call to the open weather map API
				var url = "http://api.openweathermap.org/data/2.5/forecast/daily";
				$http.jsonp(url, { params: {
						APPID: "6793535174d5edec09fb58f14a9263ef",
						q: $city,
						cnt: 5,
						units: "imperial",
						callback: 'JSON_CALLBACK'
				}}).success(function(data, status, headers, config) {

				// variable for the area in which the five day forecast appears
					var visual = angular.element("#fulldata");

				// Puts the city name at the top of the blue space to the right
					visual.html($city);

				// Iterates through the forecast for each day for five days
					for(var i = 0; i < data.list.length; i++) {
						var months = ["January", "February", "March", "April", "May", "June",
  						"July", "August", "September", "October", "November", "December"
						];

						var currentdate = new Date();
						var date = months[currentdate.getMonth()] + " " + (currentdate.getDate() + i);
						
					// Retrieves the min and max temperature for the forecast of the day (every iteration)
						var max = data.list[i].temp.max;
						var min = data.list[i].temp.min;

					// Checks the temperature unit being used and converts the results from the API, if necessary.
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

					// Round the final results to prevent hundreds of decimal places
						max = Math.round(max * 100)/100;
						min = Math.round(min * 100)/100;

					// Adds the date and the data to the blue space to the right
						visual.append("<h3>" + date + ": <span id='revealmax" + i + "'>" + max + "</span>/<span id='revealmin" + i + "'>" + min + "</span></h3>");
					}

				// If this function is called because the user selected a new city, changes the variable to reflect this
					currentcity = $city;
				}).error(function(data, status, headers, config) {
					console.log("Could not retrieve data from" + url);
				});
			}

		// Called when the user clicks on the fahrenheit button
			$scope.tofahrenheit = function() {
			// Iterates through each city and converts the units
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
			// Calls getfulldata() and has it convert the units to fahrenheit
				$scope.getfulldata(currentcity, unit, 'fahrenheit');
				unit = "fahrenheit";
			}

		// Called when the user clicks on the celsius button
			$scope.tocelsius = function($city) {
			// Iterates through each city and converts the units
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
			// Calls getfulldata() and has it conver the units to celsius
				$scope.getfulldata(currentcity, unit, 'celsius');
				unit = "celsius";
			}

		// Called when the user clicks on the kelvin button
			$scope.tokelvin = function($city) {
			// Iterates through each city and converts the units
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
			// Calls getfulldata() and has it convert the units to kelvin
				$scope.getfulldata(currentcity, unit, 'kelvin');	
				unit = "kelvin";
			}

		});
})();