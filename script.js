const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 3
};

function drawBall() {
    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ¡Nueva lógica para mover la pelota!
    ball.x += ball.speedX; // Muevo la pelota en X
    ball.y += ball.speedY; // Muevo la pelota en Y

    drawBall();
    requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    gameLoop();
}