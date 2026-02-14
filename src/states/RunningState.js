import Player from "../Player.js";
import Road from "../Road.js";

import GameOverState from "./GameOverState.js";

import EnemyManager from "../EnemyManager.js";

const levelDistance = 10000;


export default class RunningState {
  constructor(game) {
    this.game = game;

    this.road = new Road(this.game.canvas.width, this.game.canvas.height);

    this.roadLeft = this.road.roadLeft;
    this.roadRight = this.road.roadRight;

    this.player = new Player(this.roadLeft + this.road.roadWidth/2 - 20, 500, this.roadLeft, this.roadRight);
    this.enemyManager = new EnemyManager(this.roadLeft, this.roadRight);

    this.maxFuel = 100;
    this.fuel = 100;
    this.fuelDrainRate = 1; // per second

    this.distanceTravelled = 0;

    this.score = 0;
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
    const progress = this.distanceTravelled / levelDistance;

    let redY = 10 + (1 - progress) * (barHeight - 25);
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillRect(10, 0, 48, this.game.canvas.height);
    this.game.ctx.fillStyle = "gray";
    this.game.ctx.fillRect(14, 0, 40, this.game.canvas.height);

    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(15, redY, 25, 25);
    
    this.drawUI();
  }

  drawUI() {
    // draw score
    this.game.ctx.font = "normal 16px road-fighter";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.textAlign = "left";
    this.game.ctx.fillText(
      "0000000",
      this.road.chunkWidth + 80 + 32,
      this.game.canvas.height / 2 - 200,
    );

    // draw speed
    this.game.ctx.font = "normal 16px road-fighter";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.textAlign = "left";
    this.game.ctx.fillText(
      "000 km/h",
      this.road.chunkWidth + 80 + 32,
      this.game.canvas.height / 2 - 100,
    );

    // draw fuel tracker
    this.game.ctx.fillText(
      "FUEL",
      this.road.chunkWidth + 80 + 32,
      this.game.canvas.height / 2 + 100,
    );
    this.game.ctx.fillText(
      Math.floor(this.fuel),
      this.road.chunkWidth + 80 + 112,
      this.game.canvas.height / 2 + 148,
    );
  }

  update(deltaTime) {
    if (this.game.input.x) {
      this.enemyManager.moveUp = false;
      this.road.update(deltaTime);
      if (this.distanceTravelled < levelDistance) {
        this.distanceTravelled += this.road.speed * deltaTime;
      }
     
    }
     this.enemyManager.update(deltaTime);
    this.enemyManager.moveUp = true;
    this.player.update(deltaTime, this.game.input);
    // fuel
    this.fuel -= this.fuelDrainRate * deltaTime;
    if (this.fuel <= 0) {
      this.fuel = 0;
      this.game.setState(new GameOverState(this.game));
      console.log("Out of fuel!");
    }
  }

  handleInput(input) {}

  exit() {}
}
