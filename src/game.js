import MenuState from "./states/MenuState.js";
import RunningState from "./states/RunningState.js";

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    // start with menu
    this.setState(new MenuState(this.canvas, this.ctx));
  }

  setState(state) {
    this.currentState = state;
  }

  draw() {
    this.currentState.draw();
  }

  update() {
    this.currentState.update();
  }

}
