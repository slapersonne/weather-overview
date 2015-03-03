WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	List.Location = Marionette.ItemView.extend({
		tagName: "li",
		template: "#location-list-item-template"
	});

	List.Locations = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: List.Location
	});

});