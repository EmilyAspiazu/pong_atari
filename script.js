const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Esta función va a ser como el corazon del juego y se va a repetir muchisimas veces por segundo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(gameLoop);
}