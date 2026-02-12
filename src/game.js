import Player from "./Player.js";
import Road from "./Road.js";
const roadWidth = 225;
import InputState from "./InputState.js";

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  
    this.road = new Road(canvas.width, canvas.height);

    const roadLeft = this.road.sideWidth;
    const roadRight = canvas.width - this.road.sideWidth;

    this.player = new Player(365, 500, roadLeft, roadRight);
    this.input = new InputState();
  }

  draw() {
    // draw bg
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw road
    this.road.draw(this.ctx);

    // draw player car
    this.player.draw(this.ctx);
  }

  update() {
    this.road.update();
    this.player.update(this.input);
  }

}
