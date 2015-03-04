WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	List.Controller = {

		listLocations: function(){

			// Builds request url for OpenWeatherMap API
			var buildRequestUrl = function (location) {

				var urlRoot = 'http://api.openweathermap.org/data/2.5/weather';
				// Key is linked to an account created for this application
				var urlKey = '23f6177c1e3fc62a86b59f46e70a761a';
				// Recover city name
				var cityName = location.get("cityName");
				// Recover GPS coordinates
				var latitude = location.get("latitude");
				var longitude = location.get("longitude");

				// OpenWeatherMap accepts requests by city name and by GPS coordinates, but requests by city name are more effective because API can use the cache server
				if (cityName !== undefined && cityName !== "") {
					// Request by city name
					return (urlRoot + '?q=' + cityName + '&APPID=' + urlKey);
				} else if (latitude !== undefined && longitude != undefined) {
					// Request by coordinates
					return (urlRoot + '?lat=' + latitude + '&lon=' + longitude + '&APPID=' + urlKey);
				} else {
					// Unable to build a proper request url
					return undefined;
				}
			};

			var populateLocationWeather = function (location) {

				// Build the request url
					var url = buildRequestUrl(location);

					if (url !== undefined) {

						// Request the current weather
						$.getJSON(url, function (data){

							// Recover return code
							var returnCode = data.cod;

							// If request is OK
							if (returnCode !== undefined && returnCode === 200) {

								location.set({
									"latitude" : data.coord.lat,
									"longitude" : data.coord.lon,
									"cityName" : data.name,
									"temperature" : data.main.temp,
									"weather_icon_code" : data.weather[0].icon
								});

							} else {
								// No result for this request
								alert("Error : No weather data for the location " + location.get("title"));

								location.set({
									"temperature" : "??",
									"weather_icon_code" : "??"
								});

							}
						});

					} else {
						// The requested url could not be defined
						alert("Error : City name or GPS coordinates are mandatory to retrieve current weather for the location " + location.get("title"));
					}
			}

			// Locations layout view (buttons panel + locations list)
			var locationsLayoutView = new List.Layout();

			// Locations buttons panel view (Create and Sync)
			var locationsPanelView = new List.Panel();

			// Retrieve locations list
			var locations = WeatherOverviewApp.request("location:entities");
			// Locations list view
			var locationsListView = new List.Locations({
				collection: locations
			});

			// On locations panel view (creation button click), we want to access the location creation form
			locationsPanelView.on("location:create", function() {

				// Create a new location
				var newLocation = new WeatherOverviewApp.Entities.Location();

				// Create creation form view, linked to the new location model
				var view = new WeatherOverviewApp.LocationsApp.Create.Location({
					model: newLocation,
				});

				// On show, put the form view in a modal window
				view.on("show", function(){
					this.$el.dialog({
						modal: true,
						width: "auto"
					});
				});

				// On form submit
				view.on("form:submit", function(data){
					
					// Populate new location with form input
					newLocation.set(data);

					// Populate model with weather info
					populateLocationWeather(newLocation);

					// Add location to the locations list
					locations.add(newLocation);
					// Remove creation form view
					WeatherOverviewApp.dialogRegion.empty();

				});

				// Show creation form view
				WeatherOverviewApp.dialogRegion.show(view);
			});

			// On locations panel view location:sync (refresh button click) : we want to request the API to update all locations' weather data
			locationsPanelView.on("location:sync", function(){

				// For each location
				locations.forEach(function(location) {

					// Populate model with weather info
					populateLocationWeather(location);

				});

			});

			// On locations view location:delete : we want to delete the location
			locationsListView.on("childview:location:delete", function(childView, model){
				// Remove location from model
				locations.remove(model);
			});

			// On location layout view
			locationsLayoutView.on("show", function(){
				// We display button panel view and locations list view
				locationsLayoutView.panelRegion.show(locationsPanelView);
				locationsLayoutView.locationsRegion.show(locationsListView);
			});

			// Locations layout view is displayed in mainRegion
			WeatherOverviewApp.mainRegion.show(locationsLayoutView);
		}

	}

});