export default class Player {

    rightPressed = false;
    leftPressed = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 40;
        this.speed = 6;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.move()
        this.collision();
    }

    collision() {
        // left
        if(this.x < 128) {
            this.x = 128;
        }
        // right
        if(this.x > 384-this.width) {
            this.x = 384-this.width;
        }
    }

    move() {
        if(this.leftPressed) this.x -= this.speed;
        if(this.rightPressed) this.x += this.speed;
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