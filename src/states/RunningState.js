import Player from "../Player.js";
import Road from "../Road.js";

import EnemyManager from "../EnemyManager.js";

const roadWidth = 225;
const levelDistance = 1000; // in metres
let distanceTravelled = 0;

export default class RunningState {
  constructor(game) {
    this.game = game;

    this.road = new Road(this.game.canvas.width, this.game.canvas.height);

    const roadLeft = this.road.sideWidth;
    const roadRight = this.game.canvas.width - this.road.sideWidth;

    this.player = new Player(365, 500, roadLeft, roadRight);
    this.enemyManager = new EnemyManager(roadLeft, roadRight);
  }

  enter() {
    console.log("Start");
  }

  draw() {
    // draw bg
    this.game.ctx.clearRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
    );
    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
    );

    // draw road
    this.road.draw(this.game.ctx);

    // draw player car
    this.player.draw(this.game.ctx);

    // draw enemies
    this.enemyManager.draw(this.game.ctx);

    // draw level progress bar
    const barHeight = this.game.canvas.height - 20;
    const progress = distanceTravelled / levelDistance;

    let redY = 10 + (1 - progress) * (barHeight - 25);
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillRect(10, 10, 40, this.game.canvas.height - 20);

    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(15, redY, 25, 25);
  }

  update() {
    this.road.update();
    this.player.update(this.game.input);
    if (distanceTravelled < levelDistance) {
      distanceTravelled++;
    }
    this.enemyManager.update();
  }

  handleInput(input) {}

  exit() {}
}
