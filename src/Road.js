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
    this.speed = 1000;

    // Segments
    this.segments = [];

    // Images
    this.mainImage = new Image();
    this.mainImage.src = "./assets/sprites/road-chunk01.png";

    this.startImage = new Image();
    this.startImage.src = "./assets/sprites/road-chunk00.png";

    this.loaded = false;

    this.mainImage.onload = () => {
      this.segmentHeight = this.canvasHeight;
      this.loaded = true;
      this.initSegments();
    };
  }

  initSegments() {
    // Start segment
    this.segments.push({
      image: this.startImage,
      y: 0,
      isStart: true,
    });

    // Main segment above it
    this.segments.push({
      image: this.mainImage,
      y: -this.segmentHeight,
      isStart: false,
    });
  }

  update(deltaTime) {
    if (!this.loaded) return;

    for (let segment of this.segments) {
      segment.y += this.speed * deltaTime;
    }

    for (let segment of this.segments) {
      if (segment.y >= this.segmentHeight) {
        // Move to top
        segment.y -= this.segmentHeight * this.segments.length;

        // Main image after first scroll
        segment.image = this.mainImage;
        segment.isStart = false;
      }
    }
  }

  draw(ctx) {
    if (!this.loaded) return;

    for (let segment of this.segments) {
      ctx.drawImage(
        segment.image,
        80,
        Math.floor(segment.y),
        this.chunkWidth,
        this.segmentHeight,
      );
    }
  }
}
