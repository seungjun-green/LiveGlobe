// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.
function initMap() {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 62.323907, lng: -150.109291 },
        mapTypeId: "satellite",
    });
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(62.281819, -150.287132),
        new google.maps.LatLng(62.400471, -150.005608)
    );
    // The photograph is courtesy of the U.S. Geological Survey.
    let image = "https://pbs.twimg.com/profile_images/1352980639927177216/1WhcAZab_400x400.jpg";


    /**
     * The custom USGSOverlay object contains the USGS image,
     * the bounds of the image, and a reference to the map.
     */
    class USGSOverlay extends google.maps.OverlayView {
        bounds;
        image;
        div;
        constructor(bounds, image) {
            super();
            this.bounds = bounds;
            this.image = image;
        }

        onAdd() {
            this.div = document.createElement("div");
            this.div.style.borderStyle = "none";
            this.div.style.borderWidth = "0px";
            this.div.style.position = "center";

            // Create the img element and attach it to the div.
            const img = document.createElement("img");

            img.src = this.image;
            img.style.width = "100%";
            img.style.height = "100%";
            // make the position of the image as a center of the screen
            img.style.position = "center";
            this.div.appendChild(img);

            // Add the element to the "overlayLayer" pane.
            const panes = this.getPanes();

            panes.overlayLayer.appendChild(this.div);
        }
        draw() {
            const overlayProjection = this.getProjection();
            const sw = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
                this.bounds.getNorthEast()
            );

            if (this.div) {
                this.div.style.left = sw.x + "px";
                this.div.style.top = ne.y + "px";
                this.div.style.width = ne.x - sw.x + "px";
                this.div.style.height = sw.y - ne.y + "px";
            }
        }

        onRemove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                delete this.div;
            }
        }
        /**
         *  Set the visibility to 'hidden' or 'visible'.
         */
        hide() {
            if (this.div) {
                this.div.style.visibility = "hidden";
            }
        }
        show() {
            if (this.div) {
                this.div.style.visibility = "visible";
            }
        }
        toggle() {
            if (this.div) {
                if (this.div.style.visibility === "hidden") {
                    this.show();
                } else {
                    this.hide();
                }
            }
        }
        toggleDOM(map) {
            if (this.getMap()) {
                this.setMap(null);
            } else {
                this.setMap(map);
            }
        }
    }

    const overlay = new USGSOverlay(bounds, image);

    overlay.setMap(map);

    const toggleButton = document.createElement("button");

    toggleButton.textContent = "Toggle";
    toggleButton.classList.add("custom-map-control-button");

    const toggleDOMButton = document.createElement("button");

    toggleDOMButton.textContent = "Toggle DOM Attachment";
    toggleDOMButton.classList.add("custom-map-control-button");
    toggleButton.addEventListener("click", () => {
        overlay.toggle();
    });
    toggleDOMButton.addEventListener("click", () => {
        overlay.toggleDOM(map);
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleDOMButton);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);

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
