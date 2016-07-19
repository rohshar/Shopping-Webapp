window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};




function testLocation() {
	console.log(google.loader.ClientLocation);
	if ((google.loader) && (google.loader.ClientLocation)) {
        var latitude = google.loader.ClientLocation.latitude;
        var longitude = google.loader.ClientLocation.longitude;
        var city = google.loader.ClientLocation.address.city;
        var country = google.loader.ClientLocation.address.country;
        var country_code = google.loader.ClientLocation.address.country_code;
        var region = google.loader.ClientLocation.address.region;

        var text = 'Your Location<br /><br />Latitude: ' + latitude + '<br />Longitude: ' + longitude + '<br />City: ' + city + '<br />Country: ' + country + '<br />Country Code: ' + country_code + '<br />Region: ' + region;

    } else {

        var text = 'Google was not able to detect your location';

    }

    document.write(text);
}





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
