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
    this.scrollY2 = 0;
    this.speed = 1000;

    // Image
    this.image = new Image();
    this.image.src = "./assets/sprites/road-chunk01.png";

    this.startRoadImage = new Image();
    this.startRoadImage.src = "./assets/sprites/road-chunk00.png";

    this.loaded = false;
    this.imageHeight = 0;

    this.image.onload = () => {
      this.loaded = true;
      this.imageHeight = this.canvasHeight;
    };
  }

  update(deltaTime) {
    if (!this.loaded) return;

    this.scrollY += this.speed * deltaTime;
    this.scrollY2 += this.speed * deltaTime;

    // Reset once full image height passed
    if (this.scrollY >= 2*this.imageHeight) {
      this.scrollY = this.imageHeight;
    }
  }

  drawStart(ctx) {
        ctx.drawImage(
      this.startRoadImage,
      80,
      0,
      this.chunkWidth,
      this.imageHeight,
    );
  }

  draw(ctx) {
    if (!this.loaded) return;

      ctx.drawImage(
      this.startRoadImage,
      80,
      this.scrollY2,
      this.chunkWidth,
      this.imageHeight,
    );

    // Draw first image
    ctx.drawImage(
      this.image,
      80,
      this.scrollY - this.imageHeight,
      this.chunkWidth,
      this.imageHeight,
    );

    // Draw second image directly above it
    ctx.drawImage(
      this.image,
      80,
      this.scrollY - 2 * this.imageHeight,
      this.chunkWidth,
      this.imageHeight,
    );

    //road preview
    //  ctx.fillRect(this.roadLeft, 0, this.roadWidth, this.imageHeight)
  }
}
