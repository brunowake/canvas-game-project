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
    const velocity = getVelocity({ x: 100, y: 100 });
    targets.push(new Target(100, 100, 30, "red", velocity));
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
