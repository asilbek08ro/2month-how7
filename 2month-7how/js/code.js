const startEl = document.getElementById("start");
const gameEl = document.getElementById("game");
const timeEl = document.getElementById("time");
const timeHeaderEl = document.getElementById("time-header");
const resultHeaderEl = document.getElementById("result-header");
const gameTimeEl = document.getElementById("game-time");
const resultEl = document.getElementById("result");

let score = 0;
let gameStarted = false;

startEl.addEventListener("click", startGame);
gameEl.addEventListener("click", handleBox);
gameTimeEl.addEventListener("input", setGameTime);

function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    setGameTime();
    score = 0;
    startEl.classList.toggle("hide");
    gameEl.style.background = "green";
    gameTimeEl.setAttribute("disabled", true);

    let gameTime = 0;
    let interval = setInterval(function () {
        gameTime = +timeEl.innerText;

        if (gameTime <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            timeEl.innerText = (gameTime - 0.1).toFixed(1);
        }
    }, 100);
    renderBox();
}

function endGame() {
    gameStarted = false;
    startEl.classList.toggle("hide");
    gameEl.style.background = "#ccc";
    gameTimeEl.removeAttribute("disabled");
    gameEl.innerHTML = "";
    resultEl.innerText = score;
    resultHeaderEl.classList.toggle("hide");
    timeHeaderEl.classList.toggle("hide");
}

function renderBox() {
    gameEl.innerHTML = "";
    let box = document.createElement("div");
    let boxSize = getRandom(30, 200);
    let gameZone = gameEl.getBoundingClientRect();

    let maxLeft = gameZone.width - boxSize;
    let maxTop = gameZone.height - boxSize;

    box.style.width = box.style.height = boxSize + "px";
    box.style.background = getRandomColor();
    box.style.cursor = "pointer";
    box.style.position = "absolute";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.style.top = getRandom(0, maxTop) + "px";

    let shapes = ['square', 'circle', 'triangle', 'pentagon', 'star'];
    let randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (randomShape === 'square') {
        box.style.borderRadius = '0%';
    } else if (randomShape === 'circle') {
        box.style.borderRadius = '50%';
    } else if (randomShape === 'triangle') {
        box.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (randomShape === 'pentagon') {
        box.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%, 100% 25%, 0% 25%)';
    } else if (randomShape === 'star') {
        box.style.clipPath = 'polygon(50% 0%, 61.8% 38.2%, 90.9% 44.2%, 68.2% 65.8%, 79.1% 91.7%, 50% 77.3%, 20.9% 91.7%, 31.8% 65.8%, 9.1% 44.2%, 38.2% 38.2%)';
    }
    

    box.id = "check";
    gameEl.appendChild(box);
}
 

function handleBox(event) {
    if (!gameStarted) return;

    if (event.target.id === "check") {
        score++;
        renderBox();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setGameTime() {
    if (!gameStarted) {
        let timeGame = +gameTimeEl.value;
        timeEl.innerText = timeGame.toFixed(1);

        resultHeaderEl.classList.add("hide");
        timeHeaderEl.classList.remove("hide");
    }
}