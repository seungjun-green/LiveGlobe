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
