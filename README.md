# weather-overview

This application displays current weather and temperature in a set of locations that can be entered with their name or GPS coordinates.
The application recovers weather data from a distant API (OpenWeatherMap) and displays them for each location.

There is a set of 3 locations at initialization (without weather data).

To enter a new location, hit 'Add location' button. It will allow you to enter a title, a name, GPS coordinates, and will let you choose a temperature unit.
None of the fields is mandatory, as the API provides default values when requested, but coherent inputs will prevent side effects :
* Enter a title to easily recognize the location
* Enter a name OR coherent GPS coordinates. Otherwise GPS coordinate would be overrided with those associated to the name in OpenWeatherMap.
* If you choose GPS coordinates, enter coherent values (-90 < latitude < 90 && -180 < longitude < 180), otherwise no weather data could be recovered.

On form submit, a new location is added to the list, with weather data recovered if OpenWeatherMap could find it.

You can delete a location by clicking on the delete button (the cross) next to it.

You can refresh weather data with the 'refresh' button. Weather data is then recovered for each location.
