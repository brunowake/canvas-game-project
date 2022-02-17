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
