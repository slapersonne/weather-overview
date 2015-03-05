WeatherOverviewApp.module("LocationsApp.Create", function(Create, WeatherOverviewApp, Backbone, Marionette, $, _){

	// Creation form controller
	Create.Controller = {

		// Just handles the creation button click : creates a new view to display the form
		createLocation: function(){
			
			var createView = new Create.Location({
					model: location
				});

			WeatherOverviewApp.mainRegion.show(view);
		}
	};

});