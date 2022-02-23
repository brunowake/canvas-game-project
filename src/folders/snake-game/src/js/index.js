const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");

// setting canvas dimensions
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvasContext);

document.body.addEventListener("keydown", (event) => {
  Object.keys(keyDownFunctions).includes(event.key)
    ? keyDownFunctions[event.key]()
    : "";
});

game.drawGame();
