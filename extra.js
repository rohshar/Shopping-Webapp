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





function center() {
  var my_place = new google.maps.LatLng(40.7046, -73.9366);

  var location_map = new google.maps.Map(document.getElementById('map'), {
      center: my_place,
      zoom: 15
    });
}




function displayInput(input, change) {
    var text=document.getElementById(input).value;
    $(change).html(text);
}






function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 44.540, lng: -78.546},
      zoom: 8
  });
}