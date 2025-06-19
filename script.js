const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// La pelota del juego
let ball = {
    x: canvas.width / 2,     // Posición X inicial (centro horizontal)
    y: canvas.height / 2,    // Posición Y inicial (centro vertical)
    radius: 10,              // Radio de la pelota
    speedX: 5,               // Velocidad horizontal (positiva = derecha, negativa = izquierda)
    speedY: 3                // Velocidad vertical (positiva = abajo, negativa = arriba)
};

// Función para dibujar la pelota en el canvas
function drawBall() {
    ctx.fillStyle = "#ff00ff"; // Color magenta para la pelota (para que combine con los nuevos estilos)
    ctx.beginPath(); // Inicia un nuevo camino de dibujo
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Dibuja un círculo
    ctx.fill(); // Rellena el círculo
}

// Esta función va a ser como el corazon del juego y se va a repetir muchisimas veces por segundo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall(); // <-- ¡Aquí llamamos a la función drawBall!

    requestAnimationFrame(gameLoop);
}

// Función para empezar el juego cuando le de al botón
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    gameLoop();
}