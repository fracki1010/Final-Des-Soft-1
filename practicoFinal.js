const tablero = document.querySelector(".tablero")
const elementoPuntos = document.querySelector(".puntos");
const elementoPuntajeMaximo = document.querySelector(".maximo-puntaje");
const elementoReinicio = document.getElementById("reinicio");

let cuerpoVibora = [];
let gameOver = false;
let frutaX;
let frutaY;

let viboraX = 5;
let viboraY = 20;

let velocidadX = 0;
let velocidadY = 0;

let setearIntervaloId;

let puntos = 0;
let puntajeMaximo = localStorage.getItem("maximo-puntaje") || 0;
elementoPuntajeMaximo.innerHTML = `Puntaje Maximo ${puntajeMaximo}`;


const ubicacionFruta = () => {
    frutaX = Math.floor(Math.random() * 30) + 1;
    frutaY = Math.floor(Math.random() * 30) + 1;
    console.log(frutaX);
}
const condicionesFin = () =>{
    clearInterval(setearIntervaloId);
    alert("Perdiste jaja")
    location.reload();
}

const reiniciarMarcador = () =>{
    localStorage.setItem("maximo-puntaje", 0);
    alert("Marcador Reiniciado");
    location.reload();
}

const direccionVibora = (e) => {
    if (e.key == "ArrowUp" && velocidadY!= 1) {
        velocidadX = 0;
        velocidadY = -1;
    } else if (e.key == "ArrowDown" && velocidadY!= -1) {
        velocidadX = 0;
        velocidadY = 1;
    } else if(e.key == "ArrowLeft" && velocidadX!= 1){
        velocidadX = -1;
        velocidadY = 0;
    }else if(e.key == "ArrowRight" && velocidadX!= -1){
        velocidadX = 1;
        velocidadY = 0;
    }
    
}

const inicioJuego = () => {
    if(gameOver) return condicionesFin();

    let htmlTablero = `<div class="fruta" style="grid-area: ${frutaY} / ${frutaX}"></div>`;
    
    if(viboraX === frutaX && viboraY === frutaY){
        ubicacionFruta();
        cuerpoVibora.push([frutaX, frutaY]);
        console.log(cuerpoVibora);
        puntos = puntos + 1;

        if(puntos >= puntajeMaximo){
            puntajeMaximo = puntos;
        }else{
            puntajeMaximo = puntajeMaximo;
        }

        localStorage.setItem("maximo-puntaje", puntajeMaximo);

        elementoPuntos.innerHTML = `Puntos ${puntos}`
        elementoPuntajeMaximo.innerHTML = `Puntaje Maximo ${puntajeMaximo}`;
    }

    for (let i=cuerpoVibora.length - 1;i>0; i--){
        cuerpoVibora[i] = cuerpoVibora[i-1];
    }

    cuerpoVibora[0] = [viboraX, viboraY];

    viboraX += velocidadX;
    viboraY += velocidadY;

    if(viboraX <=0 || viboraX > 30 || viboraY <=0 || viboraY > 30){
        gameOver = true;
    }

    for(let i=0;i<cuerpoVibora.length; i++){ 
        htmlTablero += `<div class="vibora" style="grid-area: ${cuerpoVibora[i][1]} / ${cuerpoVibora[i][0]}"></div>`;
        if(i !== 0 && cuerpoVibora[0][1] === cuerpoVibora[i][1] && cuerpoVibora[0][0] === cuerpoVibora[i][0]){
            gameOver = true;
        }
    }

    tablero.innerHTML = htmlTablero;
}

ubicacionFruta();
//inicioJuego();
setearIntervaloId = setInterval(inicioJuego, 125);
document.addEventListener("keydown", direccionVibora);
elementoReinicio.addEventListener('click', reiniciarMarcador);