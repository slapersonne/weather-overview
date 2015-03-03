WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	List.Controller = {

		listLocations: function(){
			var locations = WeatherOverviewApp.request("location:entities");
			var locationsListView = new List.Locations({
				collection: locations
			});
		WeatherOverviewApp.mainRegion.show(locationsListView);
		}
		
	}

});