WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	// Location Model : contains informations about a location (title, cityName, GPS coordinates, weather data)
	Entities.Location = Backbone.Model.extend({

		
		defaults: {
			// Kelvin is the defaul temperature unit
			unit : "K",
			// Weather data are unknown while they are not requested
			weather : "??",
			temperature: "??"
		}/*,

		// Location validator
		validate: function (attrs, options) {

			var errors = {};

			if (!attrs.title) {
				errors.title = "is mandatory";
			}

			var latitude = parseFloat(attrs.latitude);
			var longitude = parseFloat(attrs.latitude);

			if (latitude == NaN || latitude < -90 || latitude > 90) {
				errors.latitude = "must be a number between -90 and 90";
			}

			if (longitude == NaN || longitude < -180 || longitude > 180) {
				errors.longitude = "must be a number between -180 and 180";
			}

			// User cannot select city name AND GPS coordinates : the application could not use the two entries to get weather data (so GPS coordinates would be overrided by those returned by the API)
			if ((!attrs.cityName && !(attrs.latitude && attrs.longitude))
				||
				(attrs.cityName && (attrs.latitude && attrs.longitude))) 
			{
				errors.cityName = "city name OR GPS coordinates must be selected";
				errors.latitude = "city name OR GPS coordinates must be selected";
				errors.longitude = "city name OR GPS coordinates must be selected";
			}

			// If there are errors, return errors
			if (! _.isEmpty(errors)) {
				return errors;
			}

		}*/
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