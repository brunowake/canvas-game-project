const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");
const player = new Player(); // creating a player
const scoreValueElement = document.getElementById("scoreValue");
const startBtn = document.getElementById("startBtn");
const modal = document.getElementById("modal");
const finalScore = document.getElementById("finalScore");

const targets = [];
let maxOfTargets = 1;
let velocityMultiplier = 1;
let click = {};
let interval;

// setting canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// update game score
function updateScoreElement(score) {
  scoreValueElement.innerText = score;
}

function randomNumber() {
  return Math.random();
}

function removeTargets(start, qtd) {
  targets.splice(start, qtd);
}

function updateScore(value) {
  player.score += value;
}

//update position of each target on targets[]
function updateTargetsPosition(target) {
  target.updatePosition();
}

// getting random targets
function getRandomTarget() {
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

  const velocity = getVelocity({ x: x, y: y });

  return {
    x,
    y,
    radius,
    color: "red",
    velocity,
  };
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
function spawnEnemies() {
  const intervalId = setInterval(() => {
    const target = new Target(getRandomTarget());
    targets.length < maxOfTargets ? targets.push(target) : "";
  }, 500);

  return intervalId;
}

function getDistance(target, element) {
  // to know the distance you need to subtract the target(final position) from the element you want to compare
  return Math.hypot(element.x - target.x, element.y - target.y);
}

// checking if click matches target position
function checkClick() {
  targets.forEach((target, index) => {
    const distance = getDistance(target, click);
    if (distance - target.radius * 1.4 <= 1) {
      maxOfTargets++;
      setTimeout((_) => {
        removeTargets(index, 1);
        velocityMultiplier += 0.02; //increment velocityMultiplier
        updateScore(Math.round((70 - target.radius) * velocityMultiplier));
        updateScoreElement(player.score);
      }, 0);
    }
  });

  click = {};
}

function isGameOver(distance, target) {
  return distance - target.radius - player.radius < 1 ? true : false;
}

function gameOver(animationId) {
  window.cancelAnimationFrame(animationId);
  finalScore.innerText = player.score.toFixed(0);
  clearInterval(interval);
  velocityMultiplier = 1;
  modal.classList.remove("hidden");
}

// checking if target hits the player
function playerColision(target, animationId) {
  const distance = getDistance(player, target);
  isGameOver(distance, target) ? gameOver(animationId) : "";
}

// animating canvas
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  canvasContext.rect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "#2F5373";
  canvasContext.fill();
  player.draw();

  targets.forEach((target) => {
    updateTargetsPosition(target);
    playerColision(target, animationId);
  });
}

function clearData() {
  player.score = 0;
  removeTargets(0, targets.length);
  updateScoreElement(player.score);
}

// game
canvas.addEventListener("click", (event) => {
  click = { x: event.clientX, y: event.clientY };
  checkClick();
});

startBtn.addEventListener("click", (event) => {
  modal.classList.add("hidden");
  clearData();
  interval = spawnEnemies();
  animate();
});
