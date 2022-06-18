const buttonStart = document.querySelector("[data-start]")
const buttonStop = document.querySelector("[data-stop]")
const body = document.querySelector("body")

let timer = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function click() {
    body.style.backgroundColor = getRandomHexColor();
    buttonStart.setAttribute("disabled", true)
}

function clickStop() { 
    clearInterval(timer)
    buttonStart.removeAttribute("disabled") 
}

buttonStart.addEventListener("click", () => timer = setInterval(function () {
       click();
    }, 1000))
// buttonStart.addEventListener("click", () => timer = setInterval(
//     click(), 1000))
buttonStop.addEventListener("click", clickStop);