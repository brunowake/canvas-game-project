const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");
const player = new Player(30, "blue"); // creating a player
const targets = [];

// setting canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// spawning enemies
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (40 - 12) + 12;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    }
    const velocity = getVelocity({ x: x, y: y });
    targets.push(new Target(x, y, radius, "red", velocity));
  }, 1000);
}

//update position of each target on targets[]
function updateTargetsPosition() {
  targets.forEach((target) => {
    target.updatePosition();
  });
}

// getting angle
function getAngle(objPosition) {
  return Math.atan2(center.y - objPosition.y, center.x - objPosition.x);
}
// getting velocity
function getVelocity(objPosition) {
  return {
    x: Math.cos(getAngle(objPosition)),
    y: Math.sin(getAngle(objPosition)),
  };
}

// animating canvas
function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  updateTargetsPosition();
}

// game

spawnEnemies();
animate();
