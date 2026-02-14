import CountdownState from "./CountdownState.js";

export default class MenuState {
  constructor(game) {
    this.game = game;
  }

  enter() {
    console.log("Main Menu")
  }

  draw() {
    // draw menu bg
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // centre title
    this.game.ctx.font = "bold 28px road-fighter";
    this.game.ctx.fillStyle = "white"
    this.game.ctx.textAlign = "center";
    this.game.ctx.fillText("ROAD FIGHTER CLONE", this.game.canvas.width / 2, 150)

    this.game.ctx.fillStyle = "red"
    this.game.ctx.fillText("PRESS ENTER", this.game.canvas.width / 2, 300)
  }

  update(deltaTime) {

  }

  handleInput(input) {
    if(input.enter) {
        input.enter = false;
        this.game.setState(new CountdownState(this.game))
    }
  }

  exit() {}
}
