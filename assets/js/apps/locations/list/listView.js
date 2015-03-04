WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	List.Layout = Marionette.LayoutView.extend({
		template: "#location-layout-template",
		
		regions: {
			panelRegion: "#panel-region",
			locationsRegion: "#locations-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#location-panel-template",

		events: {
			"click a.js-create": "createClicked"
		},

		createClicked: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger("location:create");
		}
	});

	List.Location = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#location-list-item-template",

		events: {
			"click a.js-delete": "deleteClicked"
		}, 

		deleteClicked: function(e){
			e.stopPropagation();
			this.trigger("location:delete", this.model);
		},

		remove: function(){
			var self = this;
			this.$el.fadeOut(function() {
				Marionette.ItemView.prototype.remove.call(self);
			});
		}

	});

	List.Locations = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "#location-list-template",
		childView: List.Location
	});

});