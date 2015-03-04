WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	Entities.Location = Backbone.Model.extend({
		defaults: {
			title: "Default Title"
		}
	});

	Entities.LocationCollection = Backbone.Collection.extend({
		model: Entities.Location
	});

	var locations;
	var initializeLocations = function(){
		locations = new Entities.LocationCollection([
			{ id: "1", title: "63000", name: "Clermont-Ferrand", latitude: "45.78", longitude: "3.08" },
			{ id: "2", name: "Royat", latitude: "45.76", longitude:"3.05" },
			{ id: "3", title: "02170", name: "Le Nouvion en Thiérache", latitude: "50.02", longitude: "3.79" }
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