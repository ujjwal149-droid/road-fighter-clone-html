const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
    console.log("hello");
    requestAnimationFrame(gameLoop);
}

gameLoop();