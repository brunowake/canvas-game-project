const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");
const player = new Player(30, "blue"); // creating a player
const targets = [];
let click = {};
let maxOfTargets = 1;
let score = 0;
let velocityMultiplier = 1;

// setting canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// getting random targets
function getRandomTarget() {
  const radius = Math.random() * (40 - 30) + 30;
  let x;
  let y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    y = Math.random() * canvas.height;
  } else {
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
  }
  const velocity = getVelocity({ x: x, y: y });

  return {
    x,
    y,
    radius,
    velocity,
  };
}

//update position of each target on targets[]
function updateTargetsPosition(target) {
  target.updatePosition();
}

// getting angle
function getAngle(objPosition) {
  return Math.atan2(center.y - objPosition.y, center.x - objPosition.x);
}
// getting velocity
function getVelocity(objPosition) {
  return {
    x: Math.cos(getAngle(objPosition)) * velocityMultiplier,
    y: Math.sin(getAngle(objPosition)) * velocityMultiplier,
  };
}

// spawning enemies
function spawnEnemies(intervaltimer) {
  const intervalId = setInterval(() => {
    const { x, y, radius, velocity } = getRandomTarget();

    const target = new Target(x, y, radius, "red", velocity);
    targets.length < maxOfTargets ? targets.push(target) : "";
  }, 500);

  return intervalId;
}

// checking if click matches target position
function checkClick() {
  targets.forEach((target, index) => {
    const distance = Math.hypot(click.x - target.x, click.y - target.y);
    if (distance - target.radius * 1.4 <= 1) {
      maxOfTargets++;
      setTimeout((_) => {
        targets.splice(index, 1);
        velocityMultiplier += 0.02;
        score++;
        console.log(score);
      }, 0);
    }
  });

  click = {};
}
// checking if the target hits the player
function playerColision(target, animationId) {
  const distance = Math.hypot(player.x - target.x, player.y - target.y);
  if (distance - target.radius - player.radius < 1) {
    window.cancelAnimationFrame(animationId);
    score = score * velocityMultiplier;
    console.log(Math.ceil(score).toFixed(2));
  }
}

// animating canvas
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  targets.forEach((target) => {
    updateTargetsPosition(target);
    playerColision(target, animationId);
  });
}

// game
canvas.addEventListener("click", (event) => {
  click = { x: event.clientX, y: event.clientY };

  checkClick();
});

spawnEnemies();
animate();
