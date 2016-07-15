window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};





function displayInput(input, change) {
    var text=document.getElementById(input).value;
    $(change).html(text);
}





function initialize() {
  var my_place = new google.maps.LatLng(51.5032510, -0.1278950);

  var location_map = new google.maps.Map(document.getElementById('map'), {
      center: my_place,
      zoom: 15
    });

  var request = {
    location: my_place,
    radius: '300',
    query: 'shop'
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  places = []
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place)
      places = places + "   " + place['id']
      $("#allPlaces").html(places)


      //createMarker(results[i]);
    }
  }
}
