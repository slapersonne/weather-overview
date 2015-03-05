WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	// Location Model : contains informations about a location (title, cityName, GPS coordinates, weather data)
	Entities.Location = Backbone.Model.extend({

		
		defaults: {
			// Kelvin is the defaul temperature unit
			unit : "K",
			// Weather data are unknown while they are not requested
			weather : "??",
			temperature: "??"
		}

	});

	// Location Collection
	Entities.LocationCollection = Backbone.Collection.extend({
		model: Entities.Location
	});

	var locations;
	// Init application with a little data set at start
	var initializeLocations = function(){
		locations = new Entities.LocationCollection([
			{ title: "63000", cityName: "Clermont-Ferrand", latitude: "45.78", longitude: "3.08", unit: "C" },
			{ title: "63130", cityName: "Royat", latitude: "45.76", longitude:"3.05", unit: "C" },
			{ title: "02170", cityName: "Le Nouvion en Thierache", latitude: "50.02", longitude: "3.79", unit: "C" }
		]);
	};

	var API = {
		getLocationEntities: function(){
			
			// Init locations at first iterate, then return the lcoation entities
			if(locations === undefined){
				initializeLocations();
			}
			return locations;
		}
	};

	// Define a request to recover location entities
	WeatherOverviewApp.reqres.setHandler("location:entities", function(){
		return API.getLocationEntities();
	});

});