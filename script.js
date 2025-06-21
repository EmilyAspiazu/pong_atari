const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 3,
    speedY: 2
};

let paddleWidth = 10;
let paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let paddleSpeed = 6;

let scoreLeft = 0;
let scoreRight = 0;
let maxScore = 5;

let keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (e.key === "w" || e.key === "s" || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
    }
});
document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function drawPaddle(x, y) {
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX *= -1;
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys["w"] && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    }
    if (keys["s"] && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed;
    }

    if (keys["ArrowUp"] && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed;
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY *= -1;
    }

    if (
        ball.x - ball.radius < paddleWidth &&
        ball.speedX < 0 &&
        ball.y > leftPaddleY && ball.y < leftPaddleY + paddleHeight
    ) {
        ball.speedX *= -1;
        ball.x = paddleWidth + ball.radius;
    }

    if (
        ball.x + ball.radius > canvas.width - paddleWidth &&
        ball.speedX > 0 &&
        ball.y > rightPaddleY && ball.y < rightPaddleY + paddleHeight
    ) {
        ball.speedX *= -1;
        ball.x = canvas.width - paddleWidth - ball.radius;
    }

    if (ball.x < 0) {
        scoreRight++;
        document.getElementById("scoreRight").textContent = scoreRight;
        resetBall();
    } else if (ball.x > canvas.width) {
        scoreLeft++;
        document.getElementById("scoreLeft").textContent = scoreLeft;
        resetBall();
    }

    if (scoreLeft >= maxScore || scoreRight >= maxScore) {
        endGame();
        return;
    }

    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    drawBall();

    requestAnimationFrame(updateGame);
}

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    requestAnimationFrame(updateGame);
}

function endGame() {
    let message = "";
    if (scoreLeft >= maxScore) {
        message = "¡Jugador Izquierdo Gana!";
    } else if (scoreRight >= maxScore) {
        message = "¡Jugador Derecho Gana!";
    }
    document.getElementById("gameOverMessage").textContent = message;
    document.getElementById("gameOverScreen").style.display = "flex";
}

function restartGame() {
    document.getElementById("gameOverScreen").style.display = "none";

    scoreLeft = 0;
    scoreRight = 0;
    document.getElementById("scoreLeft").textContent = scoreLeft;
    document.getElementById("scoreRight").textContent = scoreRight;

    leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    rightPaddleY = canvas.height / 2 - paddleHeight / 2;

    resetBall();

    requestAnimationFrame(updateGame);
}
