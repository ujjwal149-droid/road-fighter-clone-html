export default class Road {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.sideWidth = 225;
        this.scrollY = 0;
        this.speed = 16;
    }

    update() {
        this.scrollY += this.speed;
        if (this.scrollY > 80) {
            this.scrollY = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "gray";
        ctx.fillRect(
            this.sideWidth,
            0,
            this.canvasWidth - 2 * this.sideWidth,
            this.canvasHeight
        );

        // center dashed lines
        ctx.fillStyle = "white";
        for (let i = -40; i < this.canvasHeight; i += 80) {
            ctx.fillRect(
                this.canvasWidth / 2 - 5,
                i + this.scrollY,
                10,
                40
            );
        }
    }
}
