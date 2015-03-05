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

		// Log validation errors
		onFormDataInvalid: function(errors) {

			var $view = this.$el;

			// Clear old errors displayed on the form
			var clearFormErrors = function(){
				var $form = $view.find("form");
				$form.find(".help-inline.error").each(function(){
					$(this).remove();
				});
				$form.find(".control-group.error").each(function(){
					$(this).removeClass("error");
				});
			}

			// Mark error in the form with addition of the class error
			var markErrors = function(value, key){
				var $controlGroup = $view.find("#contact-"+ key).parent();
				var $errorEl = $("<span>", {class: "help-inline error", text: value});
				$controlGroup.append($errorEl).addClass("error");
			}
			clearFormErrors();
			// Mark each error from the list
			_.each(errors, markErrors);
		}

	});

});