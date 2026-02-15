import Player from "../Player.js";
import Road from "../Road.js";

import GameOverState from "./GameOverState.js";

import TrafficManager from "../TrafficManager.js";
import WinState from "./WinState.js";

const levelDistance = 100000;

export default class RunningState {
  constructor(game, road, player) {
    this.game = game;
    this.road = road;
    this.player = player;

    this.roadLeft = this.road.roadLeft;
    this.roadRight = this.road.roadRight;

    this.trafficManager = new TrafficManager(this.roadLeft, this.roadRight);

    this.speed = 0;
    this.maxSpeed = 1000;
    this.acceleration = 2000;
    this.drag = 1200; // natural slowdown

    this.maxFuel = 60;
    this.fuel = 60;
    this.fuelDrainRate = 1; // per second
    this.fuelSound = new Audio("./assets/sounds/fuel-pickup.wav");
    this.fuelSound.volume = 0.6;

    this.engineSound = new Audio("./assets/sounds/engine.wav");
    this.engineSound.volume =0;

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
    this.trafficManager.draw(this.game.ctx);

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
      Math.floor(this.speed / 10) + " km/h",
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
    if (input.x && !this.player.isExploding) {
      this.speed += this.acceleration * deltaTime;
      this.engineSound.volume = 0.6
      this.engineSound.play();
    }else {
      this.engineSound.pause();
      this.engineSound.volume = 0;
    }

    // DRAG (always applied)
    this.speed -= this.drag * deltaTime;

    // Clamp speed
    if (this.speed < 0) this.speed = 0;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

    // Move road based on speed and stop when exploding
    if (!this.player.isExploding) {
      this.road.speed = this.speed;
      this.road.update(deltaTime);
    } else {
      this.speed = 0;
    }
    for (let segment of this.road.segments) {
      if (segment.isFinish) {
        const finishY = segment.y + this.road.finishLineOffset;
        const playerFrontY = this.player.y;

        if (finishY >= playerFrontY) {
          this.onFinishCrossed();
        }
      }
    }

    // Distance tracking
    if (this.distanceTravelled < levelDistance) {
      this.distanceTravelled += this.speed * deltaTime;
    }

    if (this.distanceTravelled >= levelDistance) {
      this.road.triggerFinish();
    }

    // Update npc cars
    const collision = this.trafficManager.update(
      deltaTime,
      this.speed,
      this.player,
    );

    if (collision) {
      if (collision.type === "FUEL") {
        this.fuel += collision.amount;
        if (this.fuel > this.maxFuel) this.fuel = this.maxFuel;
        // Play sound
        this.fuelSound.currentTime = 0;
        this.fuelSound.play();
      }

      if (collision.type === "CRASH") {
        this.player.crash();
      }
    }

    // Update player
    this.player.update(deltaTime, input);

    this.fuel -= this.fuelDrainRate * deltaTime;
    if (this.fuel <= 0) {
      this.fuel = 0;
      this.game.setState(new GameOverState(this.game));
      console.log("Out of fuel!");
    }
  }

  onFinishCrossed() {
    this.speed = 0;
    this.maxSpeed = 0;
    this.acceleration = 0;
    this.road.speed = 0;

    if (this.levelCompleted) return;
    this.levelCompleted = true;
    this.game.setState(
      new WinState(
        this.game,
        this.road,
        this.player,
        this.trafficManager,
        this.distanceTravelled,
        this.fuel,
        this.score,
      ),
    );
  }

  handleInput(input) {}

  exit() {}
}
