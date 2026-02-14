import MenuState from "./MenuState.js";

export default class GameOverState {
  constructor(game) {
    this.game = game;
    this.resetTime = 3;
    this.resetTimer = 0;
  }

  enter() {
    console.log("game over")
  }

  draw() {
    // centre title
    this.game.ctx.font = "bold 28px road-fighter";
    this.game.ctx.fillStyle = "white"
    this.game.ctx.textAlign = "center";
    this.game.ctx.fillText("Game", this.game.canvas.width / 2, this.game.canvas.height/2)
    this.game.ctx.fillText("Over", this.game.canvas.width / 2, this.game.canvas.height/2+36)
  }

  update(deltaTime) {
    this.resetTimer+=deltaTime;
    if(this.resetTimer>this.resetTime) {
      this.game.setState(new MenuState(this.game))
    }
  }

  handleInput(input) {
    
        // this.game.setState(new RunningState(this.game))
    
  }

  exit() {}
}
