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
			"click button.js-create": "createClicked",
			"click button.js-sync": "syncClicked"
		},

		createClicked: function(e){
			e.stopPropagation();
			this.trigger("location:create");
		},

		syncClicked: function(e){
			e.stopPropagation();
			this.trigger("location:sync");
		}
	});

	List.Location = Marionette.ItemView.extend({
		template: "#location-list-item-template",

		events: {
			"click a.js-delete": "deleteClicked"
		}, 

		modelEvents: {
            'change': "modelChanged"
        },

        modelChanged: function() {
            this.render();
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

	List.Locations = Marionette.CollectionView.extend({
		childView: List.Location,
		className: "container"
	});

});