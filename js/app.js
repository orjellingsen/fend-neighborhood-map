var map;
var markers = [];
var placeMarkers = [];
var infowindow;
var apiKey = 'AIzaSyALQ9bUeeBwK9CarY--vC67M_2qx5I-lKM';


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  infowindow = new google.maps.InfoWindow();

  var nearbyPlaces = new google.maps.places.PlacesService(map);
  nearbyPlaces.nearbySearch({
    location: mapCenter,
    radius: 2500,
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if(status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
  else {
    console.log('PlacesService not OK');
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
