WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	Entities.Location = Backbone.Model.extend({
		defaults: {
			title: "Default Title",
			temperature: 0
		}
	});

	Entities.LocationCollection = Backbone.Collection.extend({
		model: Entities.Location
	});

	var locations;
	var initializeLocations = function(){
		locations = new Entities.LocationCollection([
			{ title: "63000", cityName: "Clermont-Ferrand", latitude: "45.78", longitude: "3.08" },
			{ cityName: "Royat", latitude: "45.76", longitude:"3.05" },
			{ title: "02170", cityName: "Le Nouvion en Thierache", latitude: "50.02", longitude: "3.79" }
		]);
	};

	var API = {
		getLocationEntities: function(){
			
			if(locations === undefined){
				initializeLocations();
			}
			return locations;
		}
	};

	WeatherOverviewApp.reqres.setHandler("location:entities", function(){
		return API.getLocationEntities();
	});

});