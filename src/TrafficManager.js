import Enemy from "./Enemy.js";
import FuelCar from "./FuelCar.js";

export default class TrafficManager {
    constructor(roadLeft, roadRight) {
        this.roadLeft = roadLeft;
        this.roadRight = roadRight;
        this.objects = [];
        this.spawnTimer = 0;
        this.spawnInterval = 0.6;
    }

    update(deltaTime, roadSpeed) {
        this.spawnTimer += deltaTime;

        if (this.spawnTimer > this.spawnInterval) {
            this.spawnObject();
            this.spawnTimer = 0;
        }

        for(let obj of this.objects) {
            obj.update(deltaTime, roadSpeed)
        }

        // remove off-screen bjects
        this.objects = this.objects.filter(obj => obj.y < 600);
        this.objects = this.objects.filter(obj => obj.y > -50);
    }

    draw(ctx) {
        this.objects.forEach(obj => obj.draw(ctx));
    }

    spawnObject() {
        const x = Math.random() * (this.roadRight - this.roadLeft - 24) + this.roadLeft;

        // 75% enemy, 25% fuel
        if(Math.random() < 0.75) {
            this.objects.push(new Enemy(x, -40, Math.floor(Math.random() * 2.99)));
        } else {
            this.objects.push(new FuelCar(x, -40));   
        }
    }
}
