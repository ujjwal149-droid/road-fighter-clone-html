import Player from "../Player.js";
import Road from "../Road.js";

import GameOverState from "./GameOverState.js";

import EnemyManager from "../EnemyManager.js";

const levelDistance = 10000;

export default class RunningState {
  constructor(game, road, player) {
    this.game = game;
    this.road = road;
    this.player = player;

    this.roadLeft = this.road.roadLeft;
    this.roadRight = this.road.roadRight;

    this.enemyManager = new EnemyManager(this.roadLeft, this.roadRight);

    this.speed = 0;
    this.maxSpeed = 1000;
    this.acceleration = 2000;
    this.drag = 1200; // natural slowdown

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
    const input = this.game.input;
    // ACCELERATION
    if (input.x) {
      this.speed += this.acceleration * deltaTime;
    }

    // DRAG (always applied)
    this.speed -= this.drag * deltaTime;

    // Clamp speed
    if (this.speed < 0) this.speed = 0;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

    // Move road based on speed
    this.road.speed = this.speed;
    this.road.update(deltaTime);

    // Distance tracking
    if (this.distanceTravelled < levelDistance) {
      this.distanceTravelled += this.speed * deltaTime;
    }

    // Update enemies
    this.enemyManager.update(deltaTime, this.speed);

    // Update player
    this.player.update(deltaTime, input);

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
