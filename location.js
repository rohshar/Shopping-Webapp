

window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
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


function unc() {
    alert('hola');
}

var location_map = null;
var my_place = null;
var found_location = false;
function center() {
    if (latitude) {
        console.log(latitude);
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
    }
}

var lastCenterMarker;
var geocoder;
var customLat;
var customLng;
function centerAddress(input) {
    geocoder = new google.maps.Geocoder();
    var address=document.getElementById(input).value;
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
            customLat = results[0].geometry.location.lat();
            customLng = results[0].geometry.location.lng();
            lastCenterMarker = marker;
            found_location = true;
            usingCurrentLocation = false;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}



function init() {
    initialize();
    initialize();
}

var foundPlaces = false;
var places2;
var service;
function initialize() {
    if (search != null) {
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
        service = new google.maps.places.PlacesService(location_map);
        service.textSearch(request, callback);

    } else if (found_location == false) {
    } else if (search == null) {
    }


}

var driving;
var walking;
var biking;
var transit;
function getNav() {
    if (!chosenPlace) {
        return;
    } else {
        var directionsService = new google.maps.DirectionsService;
        calculateRoute(directionsService);
    }

}

function calculateRoute(directionsService) {
    if (usingCurrentLocation) {
        coords = {lat: latitude, lng: longitude}
    } else {
        coords = {lat: customLat, lng: customLng}
    }
    directionsService.route({
        origin: coords,
        destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status == 'OK') {
            driving = response;
            document.getElementById("driveTime").innerHTML=response.routes[0].legs[0].duration.text;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsService.route({
        origin: coords,
        destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
        travelMode: google.maps.DirectionsTravelMode.WALKING
    }, function(response, status) {
        if (status == 'OK') {
            walking = response;
            document.getElementById("walkTime").innerHTML=response.routes[0].legs[0].duration.text;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsService.route({
        origin: coords,
        destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
        travelMode: google.maps.DirectionsTravelMode.BICYCLING
    }, function(response, status) {
        if (status == 'OK') {
            biking = response;
            document.getElementById("bikeTime").innerHTML=response.routes[0].legs[0].duration.text;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsService.route({
        origin: coords,
        destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
        travelMode: google.maps.DirectionsTravelMode.TRANSIT
    }, function(response, status) {
        if (status == 'OK') {
            transit = response;
            document.getElementById("transitTime").innerHTML=response.routes[0].legs[0].duration.text;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

}
var chosenPlace;
function addDetails() {
    for (i = 0; i < places2.length; i++) {
        var request2 = { placeId : places2[i]['place_id'] };
        service.getDetails(request2, function (details, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    position: details.geometry.location,
                    map: location_map,
                    icon: 'GoogleMapsMarkers/blue_MarkerA.png'
                });
                var information = getInfo(details);
                var infowindow = new google.maps.InfoWindow({
                    content: information
                });
                google.maps.event.addListener(marker,'click', (function(marker,information,infowindow){
                    return function() {
                        if (prevInfoWindow) {
                            prevInfoWindow.close()
                        }
                        chosenPlace = details;
                        getNav();
                        infowindow.setContent(information);
                        infowindow.open(map,marker);
                        prevInfoWindow = infowindow;
                    };
                })(marker,information,infowindow));
                gmarkers.push(marker);
            }
        });
    }

}

var foundDirection = false;
var lastDirection;
function directions(mode) {
    if (foundDirection) {
        lastDirection.setMap(null);
    }
    foundDirection = true;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(location_map);
    lastDirection = directionsDisplay;
    var clearTable = document.getElementById("directionTable");
    clearTable.innerHTML = "";
    var directionsService1 = new google.maps.DirectionsService;
    var lat;
    var lon;
    if (!customLat) {
        lat = latitude;
    } else {
        lat = customLat;
    }
    if (!customLng) {
        lon = longitude;
    } else {
        lon = customLng;
    }
    if (mode=='walk') {
        directionsService1.route({
            origin: {lat: lat, lng: lon},
            destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
            travelMode: google.maps.TravelMode.WALKING
        }, function(response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
                var table = document.getElementById("directionTable");
                for (var i=0; i<response.routes[0].legs[0].steps.length; i++) {
                    var row = table.insertRow(i);
                    var cell = row.insertCell(0);
                    cell.innerHTML = response.routes[0].legs[0].steps[i].instructions;
                }

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    } else if (mode == 'drive') {
            directionsService1.route({
                origin: {lat: lat, lng: lon},
                destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                    var table = document.getElementById("directionTable");
                    for (var i=0; i<response.routes[0].legs[0].steps.length; i++) {
                        var row = table.insertRow(i);
                        var cell = row.insertCell(0);
                        cell.innerHTML = response.routes[0].legs[0].steps[i].instructions;
                    }

                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    } else if (mode == 'bike') {
        directionsService1.route({
            origin: {lat: lat, lng: lon},
            destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
            travelMode: google.maps.TravelMode.BICYCLING
        }, function(response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
                var table = document.getElementById("directionTable");
                for (var i=0; i<response.routes[0].legs[0].steps.length; i++) {
                    var row = table.insertRow(i);
                    var cell = row.insertCell(0);
                    cell.innerHTML = response.routes[0].legs[0].steps[i].instructions;
                }

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    } else if (mode == 'transit') {
        directionsService1.route({
            origin: {lat: lat, lng: lon},
            destination: {lat: chosenPlace.geometry.location.lat(), lng: chosenPlace.geometry.location.lng()},
            travelMode: google.maps.TravelMode.TRANSIT
        }, function(response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
                var table = document.getElementById("directionTable");
                for (var i=0; i<response.routes[0].legs[0].steps.length; i++) {
                    var row = table.insertRow(i);
                    var cell = row.insertCell(0);
                    cell.innerHTML = response.routes[0].legs[0].steps[i].instructions;
                }

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

function getInfo(place) {
    var picture;
    if (!place.photos) {
        picture = '';
    } else {
        var picture = place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 170});
    }
    var openNow = 'Check Website';
    if (place.opening_hours) {
        if (place.opening_hours.open_now) {
            openNow = 'Currently Open';
        } else {
            openNow = 'Closed';
        }
    }
    href = place.website;
    var info =
        '<div>' +
        "<img border='10' src=" + picture + ">" +
        '</div>' +
        '<div><strong>' + place.name + '</strong><br>' +
        'Rating: ' + place.rating + '</br>' +
        openNow + '</br>' +
        place.formatted_address + '</br>' +
        'Phone: ' + place.formatted_phone_number +'</br>' +
        'Website: ' + '<a href=' + '"' + place.website +'"'+ '>' +  place.website + '</a>' +
        '</div>'
    return info;
}

var prevInfoWindow;
var places = [];
var gmarkers = [];

function addToPlaces(place) {
    if (!places2) {
        places2 = new Array;
    }
    if (!places2.includes(place)) {
        places2.push(place);
    }
}

function callback(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        foundPlaces = true;
        for (var i = 0; i < results.length; i++) {
            var place = results[i];

            addToPlaces(place);
            places = places + "   " + place['id'];

            $("#allPlaces").html(places);
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
        return;
    }
    search = text;
    $(change).html(text);
}


