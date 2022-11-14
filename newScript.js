var map;

function initMap() {

    initAutocomplete()
    map = new google.maps.Map(document.getElementById('map'), {
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
            componentRestrictions: {'country': ['US', 'UK', 'AU']},
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


        map.setCenter({lat: nnlat, lng: nnlng});

        //update weather information
        updateWeather();


    }
}


var weatherState;
var weather;
var isNight;
function updateWeather() {
    // get current latitude and longitude
    var prevWeather = weather
    var mylat = map.getCenter().lat();
    var mylng = map.getCenter().lng();


    document.getElementById("result1").innerHTML = mylat;
    document.getElementById("result2").innerHTML = mylng;


    var testing = false;
    if (testing) {
        // randomly selects weather from ana array
        var weathers = ["sunny", "cloudy", "rainy", "snowy", "thunder", "foggy", "moon"];
        weather = weathers[Math.floor(Math.random() * weathers.length)];
    } else {
        //AHAHAH
        var result = getWeatherData(mylat, mylng, prevWeather);
    }


    // updating weather
    updateWeatherAnimation(prevWeather,weather)
}


function getWeatherData(lat, lon, prevWeather) {
    var api =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=5de8417cddf88e7b22bafde91761e12a";
    var weatherData = fetch(api)
        .then(function(response) {
                return response.json();
            }
        )
        .then(function(data) {
                weatherState = data.weather[0].main;
                isNight = nightTime(data.timezone);
                console.log(isNight)
            if (weatherState === "Thunderstorm") {
                weather = 'thunder';
            } else if (weatherState === 'Rain') {
                weather = 'rainy';
            } else if (weatherState === 'Snow') {
                weather = 'snowy';
            } else if (weatherState === 'Clear') {
                if (isNight) {
                    weather = 'moon'
                } else {
                    weather = "sunny"
                }


            } else if (weatherState === 'Clouds') {
                weather = 'cloudy'
            } else {
                weather = 'foggy'
            }
            document.getElementById("weather").innerHTML = weather;

            // updating weather
            updateWeatherAnimation(prevWeather,weather)

                return data.weather[0].main;
            }
        )
        .catch(function(error) {
                console.log(error);
            }
        );
    return weatherData;
}

function updateWeatherAnimation(prevWeather, weather) {
    if (prevWeather === weather) {
        // do nothing
    } else {
        // first delete prev weather animation
        // creating a new
        if (prevWeather === "sunny") {
            sunny()
        } else if (prevWeather === "moon") {
            moon()
        } else if (prevWeather === "cloudy") {
            cloudy()
        } else if (prevWeather === "rainy") {
            rain()
        } else if (prevWeather === "thunder") {
            thunder()
            rain()
        } else if (prevWeather === "snowy") {
            snowy()
        } else {
            foggy()
        }

        // create a new weather animation
        if (weather === "sunny") {
            sunny()
        } else if (weather === "moon") {
            moon()
        } else if (weather === "cloudy") {
            cloudy()
        } else if (weather === "rainy") {
            rain()
        } else if (weather === "thunder") {
            thunder()
            rain()
        } else if (weather === "snowy") {
            snowy()
        } else {
            foggy()
        }
    }
}



window.initMap = initMap;



//sunny
function sunny() {
    let curr = document.getElementsByClassName("sunny")[0].style.display;
    if (curr === "block") {
        document.getElementsByClassName("sunny")[0].style.display = "none"
    } else {
        document.getElementsByClassName("sunny")[0].style.display = "block"
    }
}


// thunder
var thunderAdded = false;

function kwhang() {
    let amount = 1;
    let body = document.querySelector('.lightning')
    let i = 0;




    let thunder = document.createElement('thunderbolt');

    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * window.innerWidth * 0.9);
    let posY = Math.floor(Math.random() * 350);
    let delay = Math.random() * -20;
    let duration = Math.random() * 5;

    thunder.style.width = 0.2 + size+'px';

    thunder.style.left = posX + 'px';
    thunder.style.top = posY + 'px';


    thunder.style.animationDelay = duration+'s';
    thunder.style.animationDuration = 1 + duration+'s';
    body.appendChild(thunder);

    setTimeout(pang, 1000);
}

function pang() {
    var el = document.querySelector('.lightning');
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}


function thunder() {
    if (thunderAdded === false) {
        thunderAdded = true;
        refreshIntervalId = setInterval(kwhang,3000)


    } else {
        thunderAdded = false;
        var el = document.querySelector('.lightning');
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        clearInterval(refreshIntervalId);
    }

}

//raining
var rainAdded = false;
function rain() {

    if (rainAdded === false) {
        let amount = 100;
        let body = document.querySelector('.rainyW')
        let i = 0;

        while (i<amount) {
            let drop = document.createElement('rainDrop');

            let size = Math.random() * 5;
            let posX = Math.floor(Math.random() * window.innerWidth);
            let delay = Math.random() * -20;
            let duration = Math.random() * 5;

            drop.style.width = 0.2 + size+'px';

            drop.style.left = posX + 'px';

            drop.style.animationDelay = duration+'s';
            drop.style.animationDuration = 1 + duration+'s';
            body.appendChild(drop);
            i++;

        }

        rainAdded = true;
    } else {
        rainAdded = false;
        var el = document.querySelector('.rainyW');
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

    }
}

//snow
var snowAdded = false;
function snowy() {
    if (snowAdded === false) {
        let amount = 100;
        let body = document.querySelector('.snowW')
        let i = 0;

        while (i<amount) {
            let drop = document.createElement('snowDrop');

            let size = Math.random() * 5;
            let posX = Math.floor(Math.random() * window.innerWidth);
            let duration = Math.random() * 5;

            drop.style.width = 0.2 + size+'px';

            drop.style.left = posX + 'px';

            drop.style.animationDelay = duration+'s';
            drop.style.animationDuration = 1 + duration+'s';
            body.appendChild(drop);
            i++;

        }

        snowAdded = true;

    } else {
        snowAdded = false;
        var el = document.querySelector('.snowW');
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

    }
}



//cloudy
function cloudy() {
    let curr = document.getElementsByClassName("cloudy-half")[0].style.display;
    if (curr === "block") {
        document.getElementsByClassName("cloudy-half")[0].style.display = "none"
    } else {
        document.getElementsByClassName("cloudy-half")[0].style.display = "block"
    }
}


function moon() {
    let curr = document.getElementsByClassName("moon")[0].style.display;
    if (curr === "block") {
        document.getElementsByClassName("moon")[0].style.display = "none"
    } else {
        document.getElementsByClassName("moon")[0].style.display = "block"
    }
}

function foggy() {
    let curr = document.getElementsByClassName("foggy")[0].style.display;
    if (curr === "block") {
        document.getElementsByClassName("foggy")[0].style.display = "none"
    } else {
        document.getElementsByClassName("foggy")[0].style.display = "block"
    }
}

function nightTime(m) {
    var d = new Date();
    d.setUTCSeconds(d.getUTCSeconds() + m);
    var h = d.getUTCHours();
    return h < 6 || h > 18;
}

foggy();

//https://api.openweathermap.org/data/2.5/weather?lat=37.3347002970632&lon=-121.92762683892221&appid=5de8417cddf88e7b22bafde91761e12a