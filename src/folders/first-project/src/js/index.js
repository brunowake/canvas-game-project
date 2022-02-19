const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");
const scoreValueElement = document.getElementById("scoreValue");
const startBtn = document.getElementById("startBtn");
const modal = document.getElementById("modal");
const finalScore = document.getElementById("finalScore");
let game;

// setting canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// game
canvas.addEventListener("click", (event) => {
  game.click = { x: event.clientX, y: event.clientY };
  game.checkClick(updateScoreElement);
});

startBtn.addEventListener("click", (event) => {
  startGame();
});

// update game score
function updateScoreElement(score) {
  scoreValueElement.innerText = score;
}

function randomNumber() {
  return Math.random();
}

function startGame() {
  const player = new Player();
  game = new Game(player);
  modal.classList.add("hidden");
  game.spawnEnemies();
  game.clearData();
  animate();
  updateScoreElement(game.player.score);
}

function stopGame(animationId) {
  window.cancelAnimationFrame(animationId);
  finalScore.innerText = game.player.score.toFixed(0);
  modal.classList.remove("hidden");
}

// animating canvas
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  canvasContext.rect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "#2F5373";
  canvasContext.fill();
  game.player.draw();

  game.checkColisionPerFrame(animationId, stopGame);
}
