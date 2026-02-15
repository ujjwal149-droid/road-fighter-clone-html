export default class Road {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Road layout
    this.chunkWidth = 480;
    this.roadWidth = 240;
    this.roadLeft = 205;
    this.roadRight = this.roadLeft + this.roadWidth;

    this.speed = 1000;

    this.finishTriggered = false;
    this.finishSpawned = false;
    this.finishLineOffset = 440; // adjust based on sprite

    // Segments
    this.segments = [];
    

    // Images
    this.mainImage = new Image();
    this.mainImage.src = "./assets/sprites/road-chunk01.png";

    this.startImage = new Image();
    this.startImage.src = "./assets/sprites/road-chunk00.png";

    this.finishImage = new Image();
    this.finishImage.src = "./assets/sprites/road-chunk-finish.png";

    this.loaded = false;

    this.mainImage.onload = () => {
      this.segmentHeight = this.canvasHeight;
      this.loaded = true;
      this.initSegments();
    };
  }

  triggerFinish() {
    this.finishTriggered = true;
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
        if (this.finishTriggered && !this.finishSpawned) {
          segment.image = this.finishImage;
          segment.isFinish = true;
          this.finishSpawned = true;
        } else {
          segment.image = this.mainImage;
        }

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
