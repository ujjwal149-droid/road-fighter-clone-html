import Player from './Player.js'

const player = new Player(244, 360);

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw() {
        // draw bg
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw player car
        player.draw(this.ctx)
    }

    update() {

    }
}