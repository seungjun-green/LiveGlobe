// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.
function initMap() {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 62.323907, lng: -150.109291 },
        mapTypeId: "satellite",
    });

    updateWeather(map);
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
        if (testing) {
            // randomly selects weather from ana array
            var weather = ["sunny", "cloudy", "rainy", "snowy"];
            var weather = weather[Math.floor(Math.random() * weather.length)];
        } else {
            // get weather data from api
            var weather = "sunny";
        }

        document.getElementById("weather").innerHTML = weather;

    });
}

window.initMap = initMap;



// function on() {
//     document.getElementById("overlay").style.display = "block";
// }

// function off() {
//     document.getElementById("overlay").style.display = "none";
// }
