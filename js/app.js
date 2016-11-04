function AppViewModel() {
	var map,
			infowindow;
	this.markers = ko.observableArray([]);
	this.searchError = ko.observable('');
	this.placesFilter = ko.observable();

	// Initialize the map
	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		infowindow = new google.maps.InfoWindow();
		getPlaces();
	}

	// Get a list of places
	this.getPlaces = function() {
		var nearbyPlaces = new google.maps.places.PlacesService(map);
		// NearbySearch will return prominent places of a type within a radius of the location. This can be filtered further by use of a keyword.
		nearbyPlaces.nearbySearch({
			location: mapCenter,
			radius: 1500,
			types: ['restaurant'],
			// Keyword will be empty when the site is first loaded, so the map will show the most prominent restaurants in the area on first load.
			// If a keyword is entered into the searchfield, this.placesFilter() will filter the search.
			keyword: this.placesFilter()
		}, createMarkers);
	}

	// Create a list of markers based on results from nearbySearch
	this.createMarkers = function(results, status) {
		// Check to see if the call was successful
		if(status === google.maps.places.PlacesServiceStatus.OK) {
			// If search is successful, reset error message
			searchError('');
			// Loop trough all results and add a marker for each one. This is usually 20 times
			for (var i = 0; i < results.length; i++) {
				addMarker(results[i]);
			}
		} else {
			// If google places can not return any results (offline, no query result), show error messages.
			console.log('Error: google.maps.PlacesServiceStatus not OK');
			searchError('We were not able to find any results. Please try again.');
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
		// Listen for a click on the marker. This is one of two click listeners in the app.
		// There is a seperate listener for the items in the list-view, found at openInfoWindow()
		google.maps.event.addListener(marker, 'click', function() {
			fourSquare(place.name);
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
		// Push the marker into the markers array, which is used to show the list-view
		markers.push(marker);
	}

	// Remove all markers from the marker array
	this.removeMarkers = function() {
		for (var i = 0; i < markers().length; i++ ) {
			markers()[i].setMap(null);
		}
		markers([]);
	}

	// Use foursquare to return address, phone number and twitter for the selected place
	// I have decided to use the foursquare search api in the beginning since it does not require oauth to use
	// Planning to add oauth and Yelp API in a future version of this app
	this.fourSquare = function(place_name) {
		// This is the app ID and secret for the fourSquare API
		var fsId = '11BVZSN2GVGWTEJCBWHZKWXW1VQZLM52VN1FBNXKMR4N4MH4';
		var fsSecret = 'JJQRHIJYZ1OIJRBEICOFIJWDGYRCUHEECDCA4EINNZWS5S32';
		// Encode the name to be used in url
		place_name = encodeURIComponent(place_name);
		// Create the url that will be used to request json for the place we want to look up
		var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?&client_id=' + fsId + '&client_secret=' + fsSecret +
					'&v=20161104&ll=' + mapCenter.lat + ',' + mapCenter.lng + '&query='+ place_name + '&limit=1';
		// Request JSON
		$.ajax({
			url: fourSquareUrl
		}).done(function(data) {
			var response = data.response.venues[0];
			var address = response.location.address;
			var phone = response.contact.formattedPhone;
			var twitter = response.contact.twitter;
			var url = response.url
		});
	}

	// Open infowindow
	this.openInfoWindow = function(place) {
		// Call function to request information from foursquare
		fourSquare(place.title);
		infowindow.setContent(place.title);
		infowindow.open(map, this);
	}

	// This is a listener attatched to the placesFilter observable.
	// The variable will change when enter is pressed in the search field, and this function will run.
	this.placesFilter.subscribe(function(value) {
		// Remove all markers and reset markers array before populating the map with new markers
		removeMarkers();
		getPlaces();
	});
}

// Apply knockout bindings
ko.applyBindings(AppViewModel);
