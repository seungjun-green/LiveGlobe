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


var weather;
function updateWeather() {
    // get current latitude and longitude
    var prevWeather = weather
    var mylat = map.getCenter().lat();
    var mylng = map.getCenter().lng();

    document.getElementById("result1").innerHTML = mylat;
    document.getElementById("result2").innerHTML = mylng;


    var testing = true;
    if (testing) {
        // randomly selects weather from ana array
        var weathers = ["sunny", "cloudy", "rainy", "snowy", "thunder"];
        weather = weathers[Math.floor(Math.random() * weathers.length)];
    } else {
        // get weather data from api
        weather = "sunny";
    }

    document.getElementById("weather").innerHTML = weather;

    // updating weather
    updateWeatherAnimation(prevWeather,weather)
}

function updateWeatherAnimation(prevWeather, weather) {
    if (prevWeather === weather) {
        // do nothing
    } else {
        // first delete prev weather animation
        // creating a new
        if (prevWeather === "sunny") {
            sunny()
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

        weather = "thunder"
        // create a new weather animation
        if (weather === "sunny") {
            sunny()
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
function thunder() {
    if (thunderAdded === false) {
        let amount = 5;
        let body = document.querySelector('.lightning')
        let i = 0;

        while (i<amount) {

            let thunder = document.createElement('thunderbolt');

            let size = Math.random() * 5;
            let posX = Math.floor(Math.random() * window.innerWidth);
            let posY = Math.floor(Math.random() * 400);
            let delay = Math.random() * -20;
            let duration = Math.random() * 5;

            thunder.style.width = 0.2 + size+'px';

            thunder.style.left = posX + 'px';
            thunder.style.top = posY + 'px';


            thunder.style.animationDelay = duration+'s';
            thunder.style.animationDuration = 1 + duration+'s';
            body.appendChild(thunder);
            i++;


        }

        thunderAdded = true;
    } else {
        thunderAdded = false;
        var el = document.querySelector('.lightning');
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
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

//snowy


//foggy
function foggy() {

}