WeatherOverviewApp.module("Entities", function(Entities, WeatherOverviewApp, Backbone, Marionette, $, _){

	// Returns the storage key of a given entity
	var findStorageKey = function(entity){
	
		// use the model's urlRoot value for collection item
		if(entity.urlRoot){
			return _.result(entity, "urlRoot"); // Use _ result in case of urlRoot defined as a function
		}

		// use the model's url value for collection
		if(entity.url){
			return _.result(entity, "url"); // Use _ result in case of url defined as a function
		}

		// Throw an error if the entity has no storage key
		throw new Error("Unable to determine storage key");
	};

	var StorageMixin = function(entityPrototype) {
		var storageKey = findStorageKey(entityPrototype);
		return {
			localStorage: new Backbone.LocalStorage(storageKey)
		};
	};

	Entities.configureStorage = function(entity){
		_.extend(entity.prototype, new StorageMixin(entity.prototype));
	};

});