var WeatherOverviewApp = new Marionette.Application();

WeatherOverviewApp.addRegions({
	mainRegion: "#main-region",
	dialogRegion: "#dialog-region"
});

WeatherOverviewApp.on("start", function(){
	WeatherOverviewApp.LocationsApp.List.Controller.listLocations();
});