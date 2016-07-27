window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 0, lng: 0},
      zoom: 4
  });
};


var location_map;
function initialize() {
  if (document.getElementById('startLat').innerHTML != "This is your latitude") {
    var my_place = new google.maps.LatLng(document.getElementById('startLat').innerHTML, document.getElementById('startLon').innerHTML);

    location_map = new google.maps.Map(document.getElementById('map'), {
        center: my_place,
        zoom: 15
    });

    var centerMarker = new google.maps.Marker({
      position: my_place,
      map: location_map,
        icon: 'GoogleMapsMarkers/red_MarkerA.png'
    });

    var request = {
      location: my_place,
      radius: '300',
      query: 'shop'
    };

    console.log('workignpls')
    var service = new google.maps.places.PlacesService(location_map);
    service.textSearch(request, callback);
  }
  else {
    document.getElementById('startLat').innerHTML = "Let your latitude load!";
    document.getElementById('startLon').innerHTML = "Let your longitude load!";
  }
}

function callback(results, status) {
  places = []
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      //console.log(place)
      places = places + "   " + place['id'];
      $("#allPlaces").html(places);

      console.log(place.geometry.location)
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: location_map,
        icon: 'GoogleMapsMarkers/blue_MarkerA.png'
      });

      //createMarker(results[i]);
    }
  }
}
