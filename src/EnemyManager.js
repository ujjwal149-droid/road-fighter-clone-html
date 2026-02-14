import Enemy from "./Enemy.js";

export default class EnemyManager {
    constructor(roadLeft, roadRight) {
        this.roadLeft = roadLeft;
        this.roadRight = roadRight;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(deltaTime, roadSpeed) {
        this.spawnTimer++;

        if (this.spawnTimer > 40) {
            this.spawnEnemy();
            this.spawnTimer = 0;
        }

        this.enemies.forEach(enemy => enemy.update(deltaTime, roadSpeed));

        // remove off-screen enemies
        this.enemies = this.enemies.filter(e => e.y < 600);
        this.enemies = this.enemies.filter(e => e.y > -50);
    }

    draw(ctx) {
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }

    spawnEnemy() {
        const x =
            Math.random() *
            (this.roadRight - this.roadLeft - 24) +
            this.roadLeft;

        this.enemies.push(new Enemy(x, -40,Math.floor(Math.random() * 2.99)));
    }
}
