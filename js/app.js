function AppViewModel() {
  var map;
  var infowindow;
  this.markers = ko.observableArray([]);
  this.placesFilter = ko.observable('');

  // Initialize the map
  this.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    getPlaces();
  }

  // Get a list of places
  this.getPlaces = function() {
    var nearbyPlaces = new google.maps.places.PlacesService(map);
    nearbyPlaces.nearbySearch({
      location: mapCenter,
      radius: 2000,
      types: ['restaurant', 'bar', 'cafe'],
      keyword: this.placesFilter()
    }, createMarkers);
  }

  // Create a list of markers based on results from nearbySearch
  this.createMarkers = function(results, status) {
    if(status === google.maps.places.PlacesServiceStatus.OK) {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < results.length; i++) {
        var marker = addMarker(results[i]);
      /*  bounds.extend(new google.maps.LatLng(
          results[i].geometry.location.lat(),
          results[i].geometry.location.lng()));*/
      }
    } else {
      console.log('Error: PlacesService not OK');
    }
  }

  // Add a marker to the map and listen for clicks
  this.addMarker = function(place) {
    var marker = new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location,
      place_id: place.place_id,
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    markers.push(marker);
    return marker;
  }

  // Remove all markers from the marker array
  this.removeMarkers = function() {
    console.log(markers().length);
    for (var i = 0; i < markers().length; i++ ) {
     markers()[i].setMap(null);
    }
    markers([]);
  }

  // Open infowindow
  this.openInfoWindow = function(place) {
    infowindow.setContent(place.title);
    infowindow.open(map, this);
  }

  this.placesFilter.subscribe(function(value) {
    removeMarkers();
    getPlaces();
  });
}

// Apply knockout bindings
ko.applyBindings(AppViewModel);
