import Enemy from "./Enemy.js";
import FuelCar from "./FuelCar.js";

export default class TrafficManager {
    constructor(roadLeft, roadRight) {
        this.roadLeft = roadLeft;
        this.roadRight = roadRight;
        this.objects = [];
        this.spawnTimer = 0;
        this.spawnInterval = 0.5;
    }

    update(deltaTime, roadSpeed, player) {
        let collision = null;

        this.spawnTimer += deltaTime;

        if (this.spawnTimer > this.spawnInterval) {
            this.spawnObject();
            this.spawnTimer = 0;
        }



        for (let obj of this.objects) {
            obj.update(deltaTime, roadSpeed);
            if (this.checkCollision(obj, player)) {
                if (obj.type === "fuel") {
                    collision = { type: "FUEL", amount: 10 };
                }

                if (obj.type === "enemy") {
                    collision = { type: "CRASH" };
                }

                obj.collected = true;
            }
        }

        this.objects = this.objects.filter((obj) => !obj.collected);

        // remove off-screen bjects
        this.objects = this.objects.filter((obj) => obj.y < 600);
        this.objects = this.objects.filter((obj) => obj.y > -50);

        return collision;
    }

    draw(ctx) {
        this.objects.forEach((obj) => obj.draw(ctx));
    }

    spawnObject() {
        const x =
            Math.random() * (this.roadRight - this.roadLeft - 40) + this.roadLeft;

        // 95% enemy, 5% fuel
        if (Math.random() < 0.95) {
            this.objects.push(new Enemy(x, -40, Math.floor(Math.random() * 2.99)));
        } else {
            this.objects.push(new FuelCar(x, -40));
        }
    }

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}
