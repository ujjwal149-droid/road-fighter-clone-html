export default class Road {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Road layout
    this.chunkWidth = 480;
    this.roadWidth = 210;
    this.roadLeft = 220;
    this.roadRight = this.roadLeft + this.roadWidth;

    // Scrolling
    this.scrollY = 0;
    this.speed = 16;

    // Image
    this.image = new Image();
    this.image.src = "../assets/sprites/road-chunk01.png";

    this.loaded = false;
    this.imageHeight = 0;

    this.image.onload = () => {
      this.loaded = true;
      this.imageHeight = this.canvasHeight;
    };
  }

  update() {
    if (!this.loaded) return;

    this.scrollY += this.speed;

    // Reset once full image height passed
    if (this.scrollY >= this.imageHeight) {
      this.scrollY = 0;
    }
  }

  draw(ctx) {
    if (!this.loaded) return;

    // Draw first image
    ctx.drawImage(
      this.image,
      80,
      this.scrollY,
      this.chunkWidth,
      this.imageHeight,
    );

    // Draw second image directly above it
    ctx.drawImage(
      this.image,
      80,
      this.scrollY - this.imageHeight,
      this.chunkWidth,
      this.imageHeight,
    );

    //road preview
    //  ctx.fillRect(this.roadLeft, 0, this.roadWidth, this.imageHeight)
  }
}
