import InputState from "./InputState.js";

import MenuState from "./states/MenuState.js";
import RunningState from "./states/RunningState.js";

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.input = new InputState();

    // start with menu
    this.setState(new MenuState(this));
  }

  setState(newState) {
    if(this.currentState) {
      this.currentState.exit();
    }
    this.currentState = newState;
    this.currentState.enter();
  }

  draw() {
    this.currentState.draw();
  }

  update(deltaTime) {
    this.currentState.update(deltaTime);
  }

  handleInput() {
    this.currentState.handleInput(this.input);
  }

}
