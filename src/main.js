import Game from "./game.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 750; 
canvas.height = 600;

const game = new Game(canvas, ctx);

function gameLoop() {
    game.draw();
    game.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();