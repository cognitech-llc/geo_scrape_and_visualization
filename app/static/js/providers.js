// create a map object
var mymap = L.map('myMap', {
    center: [39.8333333, -98.585522],
    zoom: 4
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

// Read the Large and Medium provider data into variables
var largeProviders = "/large_data";
var mediumProviders = "/medium_data";

// var largeLayerGroup = L.layerGroup().addTo(mymap);
// var mediumLayerGroup = L.layerGroup().addTo(mymap);
var largeLayerGroup = L.layerGroup();
var mediumLayerGroup = L.layerGroup();

// loop through Large Providers data and store markers in an array
// then add to the map
d3.json(largeProviders, function(response) {
	for (var i = 0; i < response.length; i++) {

		var location = [response[i].lat, response[i].lng],
	    	providerName = response[i].corp_parent_name,
	    	taSegment = response[i].ta_segment,
	    	volumeSegment = response[i].volume_segment,
	    	geoType = response[i].geography_type,
	    	totalSales = accounting.formatMoney(response[i].total_sales),
	    	totalSiteCount = response[i].total_site_count,
	    	addr = response[i].addr,
	    	city = response[i].city,
	    	state = response[i].state,
	    	pstl = response[i].pstl

	    var largePopupText = "<b>Provider:</b> " + providerName 
	    					+ "<br> <b>TA Segment:</b> " + taSegment 
	    					+ "<br> <b>Volume Segment:</b> " + volumeSegment 
	    					+ "<br> <b>Geography Type:</b> " + geoType
	    					+ "<br> <b>Total GNE Sales:</b> " + totalSales
	    					+ "<br> <b>Total Child Accounts:</b> " + totalSiteCount

	    var largeMarker = L.marker(location, {icon: redIcon}).bindPopup(largePopupText)

	    if (location) {
	      largeLayerGroup.addLayer(largeMarker);
	    }
  }

});

// loop through Medium Providers data and store markers in an array
// then add to the map
d3.json(mediumProviders, function(response) {
	for (var i = 0; i < response.length; i++) {

		var location = [response[i].lat, response[i].lng],
	    	providerName = response[i].corp_parent_name,
	    	taSegment = response[i].ta_segment,
	    	volumeSegment = response[i].volume_segment,
	    	geoType = response[i].geography_type,
	    	totalSales = accounting.formatMoney(response[i].total_sales),
	    	totalSiteCount = response[i].total_site_count,
	    	addr = response[i].addr,
	    	city = response[i].city,
	    	state = response[i].state,
	    	pstl = response[i].pstl

	    var mediumPopupText = "<b>Provider:</b> " + providerName 
	    					+ "<br> <b>TA Segment:</b> " + taSegment 
	    					+ "<br> <b>Volume Segment:</b> " + volumeSegment 
	    					+ "<br> <b>Geography Type:</b> " + geoType
	    					+ "<br> <b>Total GNE Sales:</b> " + totalSales
	    					+ "<br> <b>Total Child Accounts:</b> " + totalSiteCount

	    var mediumMarker = L.marker(location, {icon: greenIcon}).bindPopup(mediumPopupText)

	    if (location) {
	      mediumLayerGroup.addLayer(mediumMarker);
	    }
  }

});

var overlayMap = {
    "Large Providers": largeLayerGroup,
    "Medium Providers": mediumLayerGroup
};

L.control.layers(null, overlayMap).addTo(mymap);