/* draggable element */

// https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

// read file

const asideList = document.getElementById("asideList");
const renderBtn = document.getElementById("renderBtn");

window.onload = function () {
  renderListElements();
};

function renderListElements() {
  fetch("./src/data/data.json")
    .then((response) => response.json())
    .then((text) => {
      text.forEach((element, index) => {
        const div = `<div class=" items" id="item${index}" draggable="true">
        <span >${element.game}</span>
        <img draggable="false"  class ='img'src='./src/img/${element.game}.png' />
        <span class='hidden' >${element.name}</span>
        <span class='hidden'>${element.description}</span>
        <span class='hidden'>${element.folderName}</span></div>`;
        asideList.insertAdjacentHTML("beforeend", div);
      });
      const item = document.querySelectorAll(".items");
      item.forEach((element) =>
        element.addEventListener("dragstart", dragStart)
      );
    });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", drop);
});

asideList.addEventListener("dragenter", dragEnter);
asideList.addEventListener("dragover", dragOver);
asideList.addEventListener("dragleave", dragLeave);
asideList.addEventListener("drop", drop);

function dragEnter(e) {
  e.preventDefault();

  e.target.classList.contains("asideList") || e.target.classList.contains("box")
    ? e.target.classList.add("drag-over")
    : e.target.classList.remove("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.contains("asideList") || e.target.classList.contains("box")
    ? e.target.classList.add("drag-over")
    : e.target.classList.remove("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.target.classList.remove("drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");

  const draggable = document.getElementById(id);

  // add it to the drop target

  e.target.classList.contains("items") ? "" : e.target.appendChild(draggable);

  console.log(draggable.firstElementChild);

  // display the draggable element
  draggable.parentElement.classList.contains("box")
    ? (draggable.classList.add("list-item-to-circle"),
      draggable.classList.add("align-img-circle"),
      draggable.firstElementChild.classList.add("hide"))
    : (draggable.classList.remove("list-item-to-circle"),
      draggable.classList.remove("align-img-circle"),
      draggable.firstElementChild.classList.remove("hide"));

  draggable.classList.remove("hide");
}

// button handler

function renderIframe() {
  const firstChild = boxes[0].firstChild;
  const [game, name, description] =
    firstChild !== null ? [...firstChild.querySelectorAll("span")] : [];

  const iframe = document.getElementById("frame");
  const creatorName = document.getElementById("creator-name");
  const gameName = document.getElementById("game-name");
  const gameDescription = document.getElementById("game-description");
  boxes[0].firstChild === null
    ? alert("insira o elemento 1")
    : ((iframe.src = `./src/folders/${firstChild.lastChild.innerText}/index.html`),
      (creatorName.innerText = name.innerText),
      (gameName.innerText = game.innerText),
      (gameDescription.innerText = description.innerText));
}

renderBtn.addEventListener("click", renderIframe);
