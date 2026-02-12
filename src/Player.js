export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 40;
        this.speed = 6;
    }

    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(left, right) {
        if(left) this.x -= this.speed;
        if(right) this.x += this.speed;
        this.collision();
    }

    collision() {
        // left
        if(this.x < 225) {
            this.x = 225;
        }
        // right
        if(this.x > 750-225-this.width) {
            this.x = 750-225-this.width;
        }
    }
}