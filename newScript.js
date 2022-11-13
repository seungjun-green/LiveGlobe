var map;
var service;
var infowindow;

var currentLat = 62.323907;
var currentLng= -150.109291;

function initMap() {

    initAutocomplete()
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,

        center: {lat: 37.3347002970632, lng: -121.92762683892221},
        // mapTypeId: "satellite",
        maxZoom: 12,
        minZoom: 12,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,

    });

    updateWeather()

}

function updateWeather() {
    // get current latitude and longitude
    var mylat = map.getCenter().lat();
    var mylng = map.getCenter().lng();

    document.getElementById("result1").innerHTML = mylat;
    document.getElementById("result2").innerHTML = mylng;


    var testing = true;
    let weather;

    if (testing) {
        // randomly selects weather from ana array
        var weathers = ["sunny", "cloudy", "rainy", "snowy"];
        weather = weathers[Math.floor(Math.random() * weathers.length)];
    } else {
        // get weather data from api
        weather = "sunny";
    }

    document.getElementById("weather").innerHTML = weather;
    updateWeatherAnimation()
}


function updateWeatherAnimation() {
    let a = Math.floor(Math.random() * 250);
    let b = Math.floor(Math.random() * 250);
    let c = Math.floor(Math.random() * 250);

    document.querySelector(".dot").style.backgroundColor = "rgba(" + Math.random() * 255 + ", 225, 0, 1)";
}

let autocomplete;
function initAutocomplete() {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 62.323907, lng: -150.109291 },
        mapTypeId: "satellite",
    });


    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['US']},
            fields: ['place_id', 'geometry', 'name']
        }
    )

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a valid place';
    } else {
        // move the center of the map to new spot
        var ddr = JSON.stringify(place.geometry.location);

        var nnlat = parseFloat(ddr.match('-?\\d+\\.?\\d+')[0]);
        ddr = ddr.replace(nnlat, '');
        var nnlng = parseFloat(ddr.match('-?\\d+\\.?\\d+')[0]);

        document.getElementById('result1').innerHTML = nnlat;
        document.getElementById('result2').innerHTML = nnlng;

        map.setCenter({lat: nnlat, lng: nnlng});

        //update weather information
        updateWeather();


    }
}

window.initMap = initMap;