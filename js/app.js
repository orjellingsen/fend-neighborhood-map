var map;
var infowindow;
var placeList = ko.observableArray();

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(0, -40)
  });

  var nearbyPlaces = new google.maps.places.PlacesService(map);
  nearbyPlaces.nearbySearch(nearbySearchOptions, createMarkers);

  var searchBox = new google.maps.places.SearchBox(document.getElementById('places-search'));
  searchBox.setBounds(map.getBounds());
}

function createMarkers(results, status) {
  if(status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var marker = addMarker(results[i]);
      console.log(results[i]);
      placeList.push(results[i]);
    }
  } else {
    console.log('Error: PlacesService not OK');
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    openInfoWindow(place);
  });
}

function openInfoWindow(place) {
  infowindow.setContent(place.name);
  infowindow.setPosition(place.geometry.location);
  infowindow.open(map, addMarker(place));
}

ko.applyBindings(placeList);
