import InputState from "../InputState.js";

export default class MenuState {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  enter() {
    console.log("Main Menu")
  }

  draw() {
    // draw menu bg
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // centre title
    this.ctx.font = "bold 48px Arial";
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center";
    this.ctx.fillText("ROAD FIGHTER CLONE", this.canvas.width / 2, 150)

    this.ctx.font = "bold 32px Arial";
    this.ctx.fillStyle = "red"
    this.ctx.textAlign = "center";
    this.ctx.fillText("PRESS ENTER", this.canvas.width / 2, 300)
  }

  update() {}

  handleInput() {}

  exit() {}
}
