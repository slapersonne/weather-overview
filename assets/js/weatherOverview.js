var WeatherOverviewApp = new Marionette.Application();

WeatherOverviewApp.addRegions({
	mainRegion: "#main-region"
});

WeatherOverviewApp.on("start", function(){
	WeatherOverviewApp.LocationsApp.List.Controller.listLocations();
});