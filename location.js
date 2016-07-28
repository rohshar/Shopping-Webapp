var latitude = null;
var longitude = null;
var usingCurrentLocation = true;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    latitude = startPos.coords.latitude;
    longitude = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  var mapDiv = document.getElementById('map');
  location_map = new google.maps.Map(mapDiv, {
      center: {lat: 0, lng: 0},
      zoom: 4
  });
};


var location_map = null;
var my_place = null;
var found_location = false;
function center() {
  if (latitude) {
    if (lastCenterMarker) {
      lastCenterMarker.setMap(null);
    }
    my_place = new google.maps.LatLng(latitude, longitude);
    location_map.setCenter(my_place);
    location_map.setZoom(15);

    var centerMarker = new google.maps.Marker({
      position: my_place,
      map: location_map,
      icon: 'GoogleMapsMarkers/red_MarkerA.png'
    });
    found_location = true;
    usingCurrentLocation = true;
    lastCenterMarker = centerMarker;
  } else {
    document.getElementById('startLat').innerHTML = "Let your latitude load!";
    document.getElementById('startLon').innerHTML = "Let your longitude load!";
  }
}

var lastCenterMarker;
var geocoder;
function centerAddress(input) {
  geocoder = new google.maps.Geocoder();
  var address=document.getElementById(input).value;
  console.log(address)
  if (lastCenterMarker) {
    lastCenterMarker.setMap(null);
  }
  geocoder.geocode( {'address': address}, function(results, status) {
    if (status == 'OK') {
      my_place = results[0].geometry.location;
      location_map.setCenter(my_place);
      location_map.setZoom(15)
      var marker = new google.maps.Marker({
          map: location_map,
          position: results[0].geometry.location,
          icon: 'GoogleMapsMarkers/red_MarkerA.png'
      });
      lastCenterMarker = marker;
      found_location = true;
      usingCurrentLocation = false;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


var foundPlaces = false;
function initialize() {
  if ((found_location == true) && (search != null)) {
    var request = {
      location: my_place,
      radius: '1000',
      query: search
    };
    if (foundPlaces == true) {
      places = [];
      for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
      }
      gmarkers = [];
    }
    document.getElementById('startLat').innerHTML = "";
    document.getElementById('startLon').innerHTML = "";
    var service = new google.maps.places.PlacesService(location_map);
    service.textSearch(request, callback);
  } else if (found_location == false) {
    document.getElementById('startLat').innerHTML = "Please find your location first!";
    document.getElementById('startLon').innerHTML = "";
  } else if (search == null) {
    document.getElementById('startLat').innerHTML = "Please enter a search term!";
    document.getElementById('startLon').innerHTML = "";
  }

}


var prevInfoWindow;
var places = [];
var gmarkers = [];
function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    foundPlaces = true;
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      places = places + "   " + place['id'];
      $("#allPlaces").html(places);

      var info = '<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>'
      var infowindow = new google.maps.InfoWindow({
        content: info
      });

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: location_map,
        icon: 'GoogleMapsMarkers/blue_MarkerA.png'
      });

      google.maps.event.addListener(marker,'click', (function(marker,info,infowindow){ 
          return function() {
              if (prevInfoWindow) {
                prevInfoWindow.close()
              }
              infowindow.setContent(info);
              infowindow.open(map,marker);
              prevInfoWindow = infowindow
          };
      })(marker,info,infowindow)); 

      gmarkers.push(marker);
    }
    if (pagination.hasNextPage) {
      sleep:2;
      pagination.nextPage();
    }
  }
}


var search = null;
function displayInput(input, change) {
    var text=document.getElementById(input).value;
    if (text.trim().length == 0) {
      document.getElementById('startLat').innerHTML = "Please enter a valid search term!";
      document.getElementById('startLon').innerHTML = "";
      return;
    }
    search = text;
    $(change).html(text);
}


