WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	Entities.Query = Backbone.Model.extend({
		
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Clermont-Ferrand&APPID=23f6177c1e3fc62a86b59f46e70a761a',
		
		defaults: {
			cityName: "??",
			latitude: "??",
			longitude: "??",
			temperature: "??",
			weather_icon_code: "??"
		},
		
		parse: function(response) {
			return response.results;
		},
			
		// Overwrite the sync method to pass over the Same Origin Policy
		sync: function(method, model, options) {
			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'json',
				url: that.url,
				processData: false
			}, options);

		    return $.ajax(params);
		},
		
		getQueryResult : function(){
			
			var result = $.getJSON(this.url);
			var data = JSON.parse(result.responseText);
			
			this.latitude = data.coord.lat;
			this.longitude = data.coord.lon;
			this.cityName = data.name;
			this.temperature = data.main.temp;
			this.weather_icon_code = data.weather[0].icon;
			
		}

	});

});