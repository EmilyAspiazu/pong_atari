const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 3
};

let paddleWidth = 10;        // Ancho de las paletas
let paddleHeight = 100;      // Alto de las paletas
let leftPaddleY = canvas.height / 2 - paddleHeight / 2; // Posicion Y inicial paleta izquierda
let rightPaddleY = canvas.height / 2 - paddleHeight / 2; // Posicion Y inicial paleta derecha
let paddleSpeed = 6;         // Velocidad con la que se mueven las paletas

let keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true; // Guarda la tecla como presionada
});

document.addEventListener("keyup", e => {
    keys[e.key] = false; // Guarda la tecla como no presionada
});

// Funciones para dibujar una paleta
function drawPaddle(x, y) {
    ctx.fillStyle = "#00ffff"; 
    ctx.fillRect(x, y, paddleWidth, paddleHeight); // Dibuja la paleta como un rectangulo
}

// Funciones para dibujar la pelota
function drawBall() {
    ctx.fillStyle = "#ff00ff"; // Color magenta de la pelota
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Para paleta izquierda (teclas 'w' y 's')
    if (keys["w"] && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    }
    if (keys["s"] && leftPaddleY < canvas.height - paddleHeight) { // Si presiono 's' y no me salgo por abajo
        leftPaddleY += paddleSpeed;
    }

    // Paleta derecha (teclas 'ArrowUp' y 'ArrowDown' - flechas arriba/abajo)
    if (keys["ArrowUp"] && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight) { // Si presiono flecha abajo y no me salgo
        rightPaddleY += paddleSpeed;
    }

    // Movimiento de la pelota
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote de la pelota en el techo y el suelo
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY *= -1;
    }
    drawPaddle(0, leftPaddleY); // Dibuja paleta izquierda (posicion X siempre 0)
    drawPaddle(canvas.width - paddleWidth, rightPaddleY); // 

    drawBall(); // Dibuja la pelota

    requestAnimationFrame(gameLoop); // Pide el siguiente fotograma
}

// Funciones para empezar el juego
function startGame() {
    document.getElementById("startScreen").style.display = "none"; 
    gameLoop(); 
}