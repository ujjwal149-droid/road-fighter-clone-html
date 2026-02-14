import MenuState from "./MenuState.js";

export default class WinState {
  constructor(game, road, player, enemyManager, distance, fuel, score) {
    this.game = game;

    // Reuse world objects
    this.road = road;
    this.player = player;
    this.enemyManager = enemyManager;

    this.distanceTravelled = distance;
    this.fuel = fuel;
    this.score = score;

    // Phase control
    this.phase = "WAIT";
    this.waitDuration = 1.5;
    this.waitTimer = 0;

    this.exitSpeed = 500;
  }

  enter() {
    // Freeze gameplay
    this.road.speed = 0;
    this.player.disableControl = true;
  }

  draw() {
    const ctx = this.game.ctx;
    const canvas = this.game.canvas;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw world exactly like RunningState
    this.road.draw(ctx);
    this.enemyManager.draw(ctx);
    this.player.draw(ctx);

    // Draw progress bar (copied from RunningState)
    const levelDistance = 1000;
    const barHeight = canvas.height - 20;
    const progress = this.distanceTravelled / levelDistance;

    let redY = 10 + (1 - progress) * (barHeight - 25);
    ctx.fillStyle = "white";
    ctx.fillRect(10, 0, 48, canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(14, 0, 40, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(15, redY, 25, 25);

    this.drawUI();

    if (this.phase === "WAIT") {
      ctx.font = "bold 36px road-fighter";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    }
  }

  drawUI() {
    const ctx = this.game.ctx;
    const canvas = this.game.canvas;

    ctx.font = "normal 16px road-fighter";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    ctx.fillText(
      Math.floor(this.speedDisplay() / 10) + " km/h",
      this.road.chunkWidth + 80 + 32,
      canvas.height / 2 - 100
    );

    ctx.fillText(
      Math.floor(this.fuel),
      this.road.chunkWidth + 80 + 112,
      canvas.height / 2 + 148
    );
  }

  speedDisplay() {
    return 0; // speed is frozen
  }

  update(deltaTime) {

    if (this.phase === "WAIT") {
      this.waitTimer += deltaTime;

      if (this.waitTimer >= this.waitDuration) {
        this.phase = "MOVE_UP";
      }
    }

    else if (this.phase === "MOVE_UP") {
      this.player.y -= this.exitSpeed * deltaTime;

      if (this.player.y + this.player.height < 0) {
        this.game.setState(new MenuState(this.game));
      }
    }

     // Update enemies
    this.enemyManager.update(deltaTime, -200);
  }

  handleInput() {}

  exit() {
    this.player.disableControl = false;
  }
}
