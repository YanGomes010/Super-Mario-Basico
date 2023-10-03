const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const cloud = document.querySelector(".cloud")
const gameOver = document.querySelector("#gameOver")
const restart = document.querySelector("#restart")
const timerSpan = document.querySelector("#timerSpan")
let cont = 0
let banco = []
 banco = JSON.parse(localStorage.getItem("0")) || []
let placartime = document.querySelector("#placar")
gameOver.style.display = "none"
restart.style.display = "none"

function compararNumeros(a, b) {
    return a - b;
  }

banco.sort(compararNumeros);
placartime.innerHTML = `
    <ul>
    <li>${banco[banco.length -1]}</li>
    <li>${banco[banco.length -2]}</li>
    <li>${banco[banco.length -3]}</li>
    </ul>
`


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");


    if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./images/game-over.png";
        mario.style.width = "75px"
        mario.style.marginLeft = "50px"


        clearInterval(loop)
        clearInterval(setTimer)
        banco.push(cont)
        localStorage.setItem("0", JSON.stringify(banco))
        banco = JSON.parse(localStorage.getItem("0"))

    
        gameOver.style.display = "block"
        restart.style.display = "block"
    }
}, 10)





const jump = () => {
    mario.classList.add("jump")
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500)
}

const Reiniciar = () => {
    cont = 0
    banco = JSON.parse(localStorage.getItem("0"))
    window.location.reload(true)
}

const setTimer = setInterval(() => {
    cont++

    timerSpan.innerHTML = cont
}, 500);

document.addEventListener("keyup", jump);