export default class Player {
    constructor(x, y, roadLeft, roadRight) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 300;
        this.image = new Image();
        this.image.src = "./assets/sprites/player-car.png"

        this.roadLeft = roadLeft;
        this.roadRight = roadRight;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    update(deltaTime, input) {
        if(input.left) this.x -= this.speed * deltaTime;
        if(input.right) this.x += this.speed * deltaTime;
        this.collision();
    }

    collision() {
        // left
        if(this.x < this.roadLeft) {
            this.x = this.roadLeft;
        }
        // right
        if(this.x > this.roadRight - this.width) {
            this.x = this.roadRight - this.width;
        }
    }
}