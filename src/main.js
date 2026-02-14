import Game from "./game.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800; 
canvas.height = 600;

const game = new Game(canvas, ctx);

let lastTime = 0;

function gameLoop(timestamp) {
    const deltaTime = Math.min((timestamp-lastTime) / 1000, 0.1); // in seconds
    lastTime = timestamp;
    
    game.update(deltaTime);
    game.draw();
    game.handleInput();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop)