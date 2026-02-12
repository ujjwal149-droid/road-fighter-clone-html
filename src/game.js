import Player from './Player.js'

const roadWidth = 225

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = new Player(365, 500);

        this.rightPressed = false;
        this.leftPressed = false;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw() {
        // draw bg
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // draw road
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(roadWidth, 0, this.canvas.width-2*roadWidth, this.canvas.height);

        // draw player car
        this.player.draw(this.ctx)
    }

    update() {
        this.player.update(this.leftPressed, this.rightPressed);
    }

    keydown = event => {
        if(event.code == "ArrowRight") {
            this.rightPressed = true;
        }

        if(event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyup = event => {
        if(event.code == "ArrowRight") {
            this.rightPressed = false;
        }

        if(event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
    }
}