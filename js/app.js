var apiKey = 'AIzaSyALQ9bUeeBwK9CarY--vC67M_2qx5I-lKM';


var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
