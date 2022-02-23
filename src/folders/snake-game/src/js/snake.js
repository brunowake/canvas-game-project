const keyDownFunctions = {
  ArrowDown() {
    if (game.yVelocity == -1) {
      return;
    }
    game.yVelocity = +1;
    game.xVelocity = 0;
  },
  ArrowUp() {
    if (game.yVelocity == 1) {
      return;
    }
    game.yVelocity = -1;
    game.xVelocity = 0;
  },
  ArrowLeft() {
    if (game.xVelocity == 1) {
      return;
    }
    game.yVelocity = 0;
    game.xVelocity = -1;
  },
  ArrowRight() {
    if (game.xVelocity == -1) {
      return;
    }
    game.yVelocity = 0;
    game.xVelocity = 1;
  },
};

class SnakePart {
  constructor(x, y) {
    (this.x = x), (this.y = y);
  }
}

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.speed = 7;
    this.tileCount = 20;
    this.tileSize = canvas.width / this.tileCount - 2;
    this.headX = 10;
    this.headY = 10;
    this.appleX = 5;
    this.appleY = 5;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.snakeParts = [];
    this.tailLength = 2;
    this.score = 0;
  }

  clearScreen() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "10px Verdana";
    this.ctx.fillText(`Score ${this.score}`, 350, 10);
  }
  drawSnake() {
    this.ctx.fillStyle = "green";
    this.snakeParts.forEach((part) => {
      this.ctx.fillRect(
        part.x * this.tileCount,
        part.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
    });

    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(
      this.headX * this.tileCount,
      this.headY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
    this.snakeParts.push(new SnakePart(this.headX, this.headY));
    if (this.snakeParts.length > this.tailLength) {
      this.snakeParts.shift();
    }
  }

  changeSnakePosition = () => {
    this.headX += this.xVelocity;
    this.headY += this.yVelocity;
  };

  drawApple() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.appleX * this.tileCount,
      this.appleY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
  }

  checkAppleColision() {
    this.appleX === this.headX && this.appleY === this.headY
      ? ((this.appleX = Math.floor(Math.random() * this.tileCount)),
        (this.appleY = Math.floor(Math.random() * this.tileCount)),
        this.tailLength++,
        this.score++,
        (this.speed += 0.2))
      : "";
  }

  isGameOver() {
    let gameOver = false;

    if (this.yVelocity === 0 && this.xVelocity === 0) {
      return false;
    }

    if (this.headX < 0) {
      gameOver = true;
    } else if (this.headX === this.tileCount) {
      gameOver = true;
    } else if (this.headY < 0) {
      gameOver = true;
    } else if (this.headY === this.tileCount) {
      gameOver = true;
    }

    this.snakeParts.forEach((part) => {
      if (part.x === this.headX && part.y === this.headY) {
        gameOver = true;
      }
    });

    if (gameOver) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px Verdana";
      this.ctx.fillText(`Game Over!`, 50, 200);
    }

    return gameOver;
  }

  drawGame = () => {
    this.changeSnakePosition();
    let result = this.isGameOver();
    if (result) {
      return;
    }

    this.clearScreen();

    this.checkAppleColision();
    this.drawApple();
    this.drawSnake();
    this.drawScore();

    setTimeout(this.drawGame, 1000 / this.speed);
  };
}
