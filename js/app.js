var map;
var markers = [];
var placeMarkers = [];
var apiKey = 'AIzaSyALQ9bUeeBwK9CarY--vC67M_2qx5I-lKM';


function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, mapOptions);
}
