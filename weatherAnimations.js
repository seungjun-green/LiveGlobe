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
            let drop = document.createElement('i');

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
function snowy() {

}


//foggy
function foggy() {

}