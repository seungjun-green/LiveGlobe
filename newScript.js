var map;
var service;
var infowindow;

function initMap() {
    var sydney = new google.maps.LatLng(-33.867, 151.195);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), {center: sydney, zoom: 15});

    var request = {
        query: 'Museum of Contemporary Art Australia',
        fields: ['name', 'geometry'],
    };

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}


function updateWeather(map) {
    map.addListener("center_changed", () => {
        // get current latitude and longitude
        var mylat = map.getCenter().lat();
        var mylng = map.getCenter().lng();

        document.getElementById("result1").innerHTML = mylat;
        document.getElementById("result2").innerHTML = mylng;

        //pass current lat/lng to wetaher api and get weather data
        var testing = true;
        var weather;
        if (testing) {
            // randomly selects weather from ana array
            var weathers = ["sunny", "cloudy", "rainy", "snowy"];
            var weather = weathers[Math.floor(Math.random() * weathers.length)];
        } else {
            // get weather data from api
            var weather = "sunny";
        }

        document.getElementById("weather").innerHTML = weather;
        updateWeatherAnimation()
    });
}


function updateWeatherAnimation() {
    let a = Math.floor(Math.random() * 250);
    let b = Math.floor(Math.random() * 250);
    let c = Math.floor(Math.random() * 250);

    document.querySelector(".dot").style.backgroundColor = "rgba(" + Math.random() * 255 + ", 225, 0, 1)";
}





window.initMap = initMap;