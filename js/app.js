function AppViewModel() {
  var map;
  var infowindow;
  var markers = [];
  this.placeList = ko.observableArray();
  this.placesFilter = ko.observable();

  // Initialize the map
  this.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infowindow = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(0, -40)
    });
    createPlaceList();
  }

  this.placesFilter.subscribe(function(value) {
    removeMarkers();
    placeList([]);
    createPlaceList();
  });

  this.createPlaceList = function() {
    console.log('createPlaceList function called');
    var nearbyPlaces = new google.maps.places.PlacesService(map);
    nearbyPlaces.nearbySearch({
      location: mapCenter,
      radius: 2500,
      type: ['restaurant'],
      keyword: this.placesFilter()
    }, createMarkers);
  }

  // Create a list of markers based on results from nearbySearch
  this.createMarkers = function(results, status) {
    //TODO remake this function to push marks into array, and find a way to have KO still display marker list
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

  this.removeMarkers = function() {
    createMarkers(null);
    //TODO link this function to new createmarkers
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
