// Setting map styles. These map styles are made by Mike Fowler
// Source: https://snazzymaps.com/style/42/apple-maps-esque
var styles = [
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f7f1df"
    }]}, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{
        "color": "#d0e3b4"
    }]}, {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "off"
    }]}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]}, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]}, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [{
        "color": "#fbd3da"
    }]}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#bde6ab"
    }]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "off"
    }]}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffe15f"
    }]}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#efd151"
    }]}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }]}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "black"
    }]}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#cfb2db"
    }]}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a2daf2"
    }]}];

    // Set map center to the city of Bergen, Norway
    var mapCenter = {lat: 60.39126279999999, lng: 5.3220544};

    // Map options that are used when the map initialize
    var mapOptions = {
      center: mapCenter,
      zoom: 15,
      minZoom: 11,
      maxZoom: 19,
      mapTypeControl: false,
      styles: styles
    };
