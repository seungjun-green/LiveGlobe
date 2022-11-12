var map;
var service;
var infowindow;

var currentLat = 62.323907;
var currentLng= -150.109291;

function initMap() {
    initAutocomplete()
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: {lat: 37.3347002970632, lng: -121.92762683892221},
        mapTypeId: "satellite",
        disableDefaultUI: true,
        // scrollwheel: false,
        disableDoubleClickZoom: true
    });

    // updateWeather(map);

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
        // document.getElementById('details').innerHTML = place.name;
        // print("dddddddd");



        // var nnlat = coords.substring(1, coords.indexOf(","));
        // var nnlng = coords.substring(coords.indexOf(",") + 1, coords.indexOf(")"));
        var ddr = JSON.stringify(place.geometry.location);

        // document.getElementById('result1').innerHTML = parseFloat(ddr.match('-?\\d+\\.\\d+')[0]);
        // document.getElementById('result2').innerHTML = parseFloat(ddr.match('-?\\d+\\.\\d+')[1]);
        var nnlat = parseFloat(ddr.match('-?\\d+\\.?\\d+')[0]);
        ddr = ddr.replace(nnlat, '');
        var nnlng = parseFloat(ddr.match('-?\\d+\\.?\\d+')[0]);

        document.getElementById('result1').innerHTML = nnlat;
        document.getElementById('result2').innerHTML = nnlng;

        map.setCenter({lat: nnlat, lng: nnlng});


    }
}




window.initMap = initMap;