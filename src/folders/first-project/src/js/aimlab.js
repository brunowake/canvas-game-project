const center = Object.freeze({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
});

// player class
class Player {
  constructor(radius, color) {
    this.x = center.x;
    this.y = center.y;
    this.radius = radius;
    this.color = color;
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
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
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
