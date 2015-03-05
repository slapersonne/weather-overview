var WeatherOverviewApp = new Marionette.Application();

// Add two regions to the application :
WeatherOverviewApp.addRegions({
	mainRegion: "#main-region", // Region for locations display
	dialogRegion: "#dialog-region" // Region for dialog (modal) windows
});

WeatherOverviewApp.on("start", function(){
	// On application start, recover locations
	WeatherOverviewApp.LocationsApp.List.Controller.listLocations();
});