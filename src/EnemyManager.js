import Enemy from "./Enemy.js";

export default class EnemyManager {
    constructor(roadLeft, roadRight) {
        this.roadLeft = roadLeft;
        this.roadRight = roadRight;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update() {
        this.spawnTimer++;

        if (this.spawnTimer > 100) {
            this.spawnEnemy();
            this.spawnTimer = 0;
        }

        this.enemies.forEach(enemy => enemy.update());

        // remove off-screen enemies
        this.enemies = this.enemies.filter(e => e.y < 600);
    }

    draw(ctx) {
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }

    spawnEnemy() {
        const x =
            Math.random() *
            (this.roadRight - this.roadLeft - 24) +
            this.roadLeft;

        this.enemies.push(new Enemy(x, -40));
    }
}
