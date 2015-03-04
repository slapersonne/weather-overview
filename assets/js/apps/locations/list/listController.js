WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	List.Controller = {

		listLocations: function(){

			var locationsLayoutView = new List.Layout();

			var locationsPanelView = new List.Panel();

			var locations = WeatherOverviewApp.request("location:entities");
			var locationsListView = new List.Locations({
				collection: locations
			});

			locationsPanelView.on("location:create", function() {

				var newLocation = new WeatherOverviewApp.Entities.Location();

				var view = new WeatherOverviewApp.LocationsApp.Create.Location({
					model: newLocation,
				});

				view.on("show", function(){
					this.$el.dialog({
						modal: true,
						width: "auto"
					});
				});

				view.on("form:submit", function(data){
					
					if(locations.length > 0){
						var highestId = locations.max(function(c){ return c.id; }).get("id");
						data.id = highestId + 1;
					}
					else{
						data.id = 1;
					}
					
					newLocation.set(data);
					locations.add(newLocation);
					WeatherOverviewApp.dialogRegion.empty();

				});

				WeatherOverviewApp.dialogRegion.show(view);
			});

			locationsListView.on("childview:location:delete", function(childView, model){
				locations.remove(model);
			});

			locationsLayoutView.on("show", function(){
				locationsLayoutView.panelRegion.show(locationsPanelView);
				locationsLayoutView.locationsRegion.show(locationsListView);
			});

			WeatherOverviewApp.mainRegion.show(locationsLayoutView);
		}

	}

});