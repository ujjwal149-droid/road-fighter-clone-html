export default class FuelCar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = -400;
        this.collected = false;

        this.image = new Image();
        this.image.src = "./assets/sprites/fuel-car.png";
    }

    update(deltaTime, roadSpeed) {
         this.y += (roadSpeed+this.speed) * deltaTime;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}