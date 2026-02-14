export default class Enemy {
    constructor(x, y, spriteNumber) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = -400;
        this.image = new Image();
        this.image.src = `./assets/sprites/enemy-car${spriteNumber}.png`;
    }

    update(deltaTime, roadSpeed) {
        this.y += (roadSpeed+this.speed) * deltaTime;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
