WeatherOverviewApp.module("LocationsApp.Create", function(Create, WeatherOverviewApp, Backbone, Marionette, $, _){

	Create.Controller = {

		createLocation: function(){
			
			var createView = new Create.Location({
					model: location
				});

			WeatherOverviewApp.mainRegion.show(view);
		}
	};

});