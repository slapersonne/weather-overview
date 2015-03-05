WeatherOverviewApp.module("LocationsApp.Create", function(Create, WeatherOverviewApp, Backbone, Marionette, $, _){
	
	// Location creation form view
	Create.Location = Marionette.ItemView.extend({
		template: "#location-creation-form-template",
		events: {
			"click button.js-submit": "submitClicked"	// Submit button is clicked
		},

		// Trigger event for the controller
		submitClicked: function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		},

	});

});