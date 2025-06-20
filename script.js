    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let ball = {
        x: canvas.width / 2,     // Posición X inicial (centro horizontal)
        y: canvas.height / 2,    // Posición Y inicial (centro vertical)
        radius: 10,              // Radio de la pelota
        speedX: 5,               // Velocidad horizontal (positiva = derecha, negativa = izquierda)
        speedY: 3                // Velocidad vertical (positiva = abajo, negativa = arriba)
    };

    // Variables para las paletas
    let paddleWidth = 10;        // Ancho de las paletas
    let paddleHeight = 100;      // Alto de las paletas
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    let paddleSpeed = 6;         // Velocidad de movimiento de las paletas

    // Puntuaciones de los jugadores
    let scoreLeft = 0;
    let scoreRight = 0;

    let keys = {};

    document.addEventListener("keydown", e => {
        keys[e.key] = true;
    });
    document.addEventListener("keyup", e => {
        keys[e.key] = false;
    });

    function drawPaddle(x, y) {
        ctx.fillStyle = "#00ffff"; // Color cian para las paletas
        ctx.fillRect(x, y, paddleWidth, paddleHeight); // Dibuja un rectángulo
    }

    // Dibuja la pelota en su posición actual
    function drawBall() {
        ctx.fillStyle = "#ff00ff"; // Color magenta para la pelota
        ctx.beginPath(); 
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Dibuja un círculo
        ctx.fill(); // Rellena el círculo
    }

    function resetBall() {
        ball.x = canvas.width / 2; 
        ball.y = canvas.height / 2; 
        ball.speedX *= -1; 
    }

    function updateGame() { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        // Paleta izquierda (controlada con 'w' y 's')
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

        ball.x += ball.speedX; // Actualiza la posición X de la pelota
        ball.y += ball.speedY; // Actualiza la posición Y de la pelota

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
        }
        if (ball.x > canvas.width) { 
            scoreLeft++;
            document.getElementById("scoreLeft").textContent = scoreLeft; 
            resetBall(); 
        }

        drawPaddle(0, leftPaddleY); 
        drawPaddle(canvas.width - paddleWidth, rightPaddleY); 
        drawBall();

        requestAnimationFrame(updateGame);    }

    function startGame() {
        document.getElementById("startScreen").style.display = "none"; 
        requestAnimationFrame(updateGame); 
    }
