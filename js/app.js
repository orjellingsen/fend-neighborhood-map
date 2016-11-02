function AppViewModel() {
  var map;
  var infowindow;
  this.placeList = ko.observableArray();
  this.query = ko.observable();

  // Initialize the map
  this.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infowindow = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(0, -40)
    });
    createPlaceList();
  }

  // Create a places list
  this.createPlaceList = function() {
    var nearbyPlaces = new google.maps.places.PlacesService(map);
    nearbyPlaces.nearbySearch({
      location: mapCenter,
      radius: 2500,
      type: ['restaurant']
    }, createMarkers);
  }

  // Create a list of markers based on results from nearbySearch
  this.createMarkers = function(results, status) {
    if(status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var marker = addMarker(results[i]);
        //console.log(results[i]);
        placeList.push(results[i]);
      }
    } else {
      console.log('Error: PlacesService not OK');
    }
  }

  // Add a marker to the map and listen for clicks
  this.addMarker = function(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
      openInfoWindow(place);
    });
  }

  // Open infowindow
  this.openInfoWindow = function(place) {
    infowindow.setContent(place.name);
    infowindow.setPosition(place.geometry.location);
    infowindow.open(map, addMarker(place));
  }
}

// Apply knockout bindings
ko.applyBindings(AppViewModel);
