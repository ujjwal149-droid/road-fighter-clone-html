export default class Player {
    constructor(x, y, roadLeft, roadRight) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 200;

        // Normal sprite
        this.playerImage = new Image();
        this.playerImage.src = "./assets/sprites/player-car.png";

        // Explosion frames
        this.explosionFrames = [];
        for (let i = 0; i < 4; i++) {
            const img = new Image();
            img.src = `./assets/sprites/explosion-${i}.png`;
            this.explosionFrames.push(img);
        }

        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameDuration = 0.5;

        this.isExploding = false;
        this.explosionSound = new Audio("./assets/sounds/explosion.wav");
        this.explosionSound.volume = 0.6;


        this.roadLeft = roadLeft;
        this.roadRight = roadRight;

        this.disableControl = false;
        this.isFinished = false;
    }

    draw(ctx) {
        if (this.isExploding) {
            const frame = this.explosionFrames[
                Math.min(this.currentFrame, this.explosionFrames.length - 1)
            ];

            ctx.drawImage(
                frame,
                this.x - 20,
                this.y - 20,
                this.width,
                this.height
            );
        } else {
            ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
        }
    }

    update(deltaTime, input = {}) {

        if (!this.disableControl && !this.isExploding) {
            if (input.left) this.x -= this.speed * deltaTime;
            if (input.right) this.x += this.speed * deltaTime;
            this.collision();
        }

        if (this.isFinished) {
            this.y -= 400 * deltaTime;
        }

        if (this.isExploding) {
            this.frameTimer += deltaTime;

            if (this.frameTimer >= this.frameDuration) {
                this.frameTimer = 0;
                this.currentFrame++;
            }

            if (this.currentFrame >= this.explosionFrames.length) {
                this.resetAfterExplosion();
            }
        }
    }

    collision() {
        if (this.x < this.roadLeft) {
            this.x = this.roadLeft;
            this.crash();
        }
        if (this.x > this.roadRight - this.width) {
            this.x = this.roadRight - this.width;
            this.crash();
        }
    }

    crash() {
        this.isExploding = true;
        this.disableControl = true;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }

    resetAfterExplosion() {
        this.isExploding = false;
        this.disableControl = false;
    }

    addFuel(f) {
        
    }
}
