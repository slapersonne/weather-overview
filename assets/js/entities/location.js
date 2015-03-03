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
			{ id: "1", title: "63000", name: "Clermont-Ferrand" },
			{ id: "2", name: "Royat" },
			{ id: "3", title: "02170", name: "Le Nouvion en Thiérache" }
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