import Game from "./game.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// 2x NES resolution
canvas.width = 512; 
canvas.height = 448;

const game = new Game(canvas, ctx);

function gameLoop() {
    game.draw();
    game.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();