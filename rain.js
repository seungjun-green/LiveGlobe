const main = document.querySelector('main');

let htmlString = "";

for (let i = 0; i < 10; i++) {
    htmlString += `<div class="drop" style="margin-right:${i+10}px></div>`;
}

main.innerHTML = htmlString;