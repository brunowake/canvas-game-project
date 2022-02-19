const center = Object.freeze({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
});

// player class
class Player {
  constructor() {
    this.x = center.x;
    this.y = center.y;
    this.radius = 30;
    this.color = "#A7CFF2";
    this.score = 0;
  }

  draw() {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
  }
}

// target class

class Target {
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.radius = obj.radius;
    this.color = obj.color;
    this.velocity = obj.velocity;
  }

  draw() {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
  }

  updatePosition() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//game

class Game {
  constructor(player) {
    this.targets = [];
    this.maxOfTargets = 1;
    this.velocityMultiplier = 1;
    this.player = player;
    this.click = {};
    this.interval;
  }

  clearData() {
    this.player.score = 0;
    this.removeTargets(0, this.targets.length);
  }

  removeTargets(start, qtd) {
    game.targets.splice(start, qtd);
  }

  updateScore(value) {
    this.player.score += value;
  }
  //update position of each target on targets[]
  updateTargetsPosition(target) {
    target.updatePosition();
  }
  // getting angle
  getAngle(objPosition) {
    return Math.atan2(center.y - objPosition.y, center.x - objPosition.x);
  }

  // getting velocity
  getVelocity(objPosition) {
    return {
      x: Math.cos(this.getAngle(objPosition)) * this.velocityMultiplier,
      y: Math.sin(this.getAngle(objPosition)) * this.velocityMultiplier,
    };
  }

  // getting random targets
  getRandomTarget() {
    const radius = randomNumber() * (40 - 20) + 20;
    let x;
    let y;
    // getting random elements and rendering them outside the viewport
    // if randomNumber < 0.5 the target will be rendered at the x axis otherwise it will be render at the y axis
    randomNumber() < 0.5
      ? //  if randomNumber < 0.5 the target will be rendered on the left side otherwise it will be rendered
        //  on the right side. Both elements will be rendered at any high on the viewport
        ((x = randomNumber() < 0.5 ? 0 - radius : canvas.width + radius),
        (y = randomNumber() * canvas.height))
      : ((x = randomNumber() * canvas.width),
        (y = randomNumber() < 0.5 ? 0 - radius : canvas.height + radius));

    const velocity = this.getVelocity({ x: x, y: y });

    return {
      x,
      y,
      radius,
      color: "red",
      velocity,
    };
  }

  getDistance(target, element) {
    // to know the distance you need to subtract the target(final position) from the element you want to compare
    return Math.hypot(element.x - target.x, element.y - target.y);
  }

  // spawning enemies
  spawnEnemies() {
    const intervalId = setInterval(() => {
      const target = new Target(this.getRandomTarget());
      this.targets.length < this.maxOfTargets ? this.targets.push(target) : "";
    }, 500);

    this.interval = intervalId;
  }

  checkClick(updateElementCb) {
    this.targets.forEach((target, index) => {
      const distance = this.getDistance(target, this.click);
      if (distance - target.radius * 1.4 <= 1) {
        this.maxOfTargets++;
        setTimeout((_) => {
          this.removeTargets(index, 1);
          this.velocityMultiplier += 0.02; //increment velocityMultiplier
          this.updateScore(
            Math.round((70 - target.radius) * this.velocityMultiplier)
          );
          updateElementCb(this.player.score);
        }, 0);
      }
    });

    this.click = {};
  }

  // checking if click matches target position

  isGameOver(distance, target) {
    return distance - target.radius - this.player.radius < 1 ? true : false;
  }

  // checking if target hits the player
  playerColision(target) {
    const distance = this.getDistance(this.player, target);
    return this.isGameOver(distance, target);
  }

  gameOver(animationId) {
    clearInterval(game.interval);
    this.velocityMultiplier = 1;
  }

  checkColisionPerFrame(animationId, cb) {
    this.targets.forEach((target) => {
      this.updateTargetsPosition(target);
      this.playerColision(target)
        ? (this.gameOver(animationId), cb(animationId))
        : "";
    });
  }
}
