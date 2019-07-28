// create a map object
var mymap = L.map('myMap', {
    center: [39.8333333, -98.585522],
    zoom: 3
});

// create tile layer to attach to map object
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(mymap);

// create custom marker icons for data
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Read the corporate store locations data
var starbucksStores = "/starbucks_data";

var starbucksLayerGroup = L.layerGroup();

// loop through Starbucks data and store markers in an array
// then add to the map
d3.json(starbucksStores, function(response) {
	for (var i = 0; i < response.length; i++) {

		var location = [response[i].lat, response[i].lng],
	    	storeName = response[i].store_name.split("\"")[1]

	    var starbucksPopupText = "<b>Starbucks Store:</b> " + storeName 
	    					+ "<br> <b>Latitude:</b> " + location[0] 
	    					+ "<br> <b>Longitude:</b> " + location[1]  

	    var starbucksMarker = L.marker(location, {icon: greenIcon}).bindPopup(starbucksPopupText)

	    if (location) {
	      starbucksLayerGroup.addLayer(starbucksMarker);
	    }
  }

});

var overlayMap = {
    "Starbucks Stores": starbucksLayerGroup
};

L.control.layers(null, overlayMap).addTo(mymap);