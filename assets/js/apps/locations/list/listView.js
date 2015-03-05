WeatherOverviewApp.module("LocationsApp.List", function(List, WeatherOverviewApp, Backbone, Marionette, $, _){

	// Locations layout view
	List.Layout = Marionette.LayoutView.extend({
		
		template: "#location-layout-template",	
		
		regions: {
			panelRegion: "#panel-region", 			// Buttons panel region
			locationsRegion: "#locations-region" 	// Locations list region
		}
	});

	List.Panel = Marionette.ItemView.extend({
		
		template: "#location-panel-template",

		events: {
			"click button.js-create": "createClicked", 	// Create button click
			"click button.js-sync": "syncClicked"		// Sync (refresh) button click
		},

		// Trigger event for the controller
		createClicked: function(e){
			e.stopPropagation();
			this.trigger("location:create");
		},

		// Trigger event for the controller
		syncClicked: function(e){
			e.stopPropagation();
			this.trigger("location:sync");
		}
	});

	// Location view
	List.Location = Marionette.ItemView.extend({

		// Template is a list item, displayed in a Bootstrap row divided into multiple columns
		template: "#location-list-item-template",

		events: {
			"click a.js-delete": "deleteClicked"	// Delete button clicked
		}, 

		modelEvents: {
            'change': "modelChanged"
        },

        modelChanged: function() {
            this.render();	// Renders view on model changes (for refresh purpose, not rendered otherwise)
        },

		deleteClicked: function(e){
			e.stopPropagation();
			// Trigger event for the controller
			this.trigger("location:delete", this.model);
		},

		// Removes the line slowly
		remove: function(){
			var self = this;
			this.$el.fadeOut(function() {
				Marionette.ItemView.prototype.remove.call(self);
			});
		},

	});

	// Location list view (is just a container)
	List.Locations = Marionette.CollectionView.extend({
		childView: List.Location,
		className: "container"
	});

});