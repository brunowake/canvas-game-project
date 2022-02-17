/* draggable element */

// https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

// read file

const asideList = document.getElementById("asideList");
const renderBtn = document.getElementById("renderBtn");
const box = document.querySelector(".box");
const iframe = document.getElementById("frame");
const creatorName = document.getElementById("creator-name");
const gameName = document.getElementById("game-name");
const gameDescription = document.getElementById("game-description");

box.addEventListener("dragenter", dragEnter);
box.addEventListener("dragover", dragOver);
box.addEventListener("dragleave", dragLeave);
box.addEventListener("drop", drop);

asideList.addEventListener("dragenter", dragEnter);
asideList.addEventListener("dragover", dragOver);
asideList.addEventListener("dragleave", dragLeave);
asideList.addEventListener("drop", drop);

renderBtn.addEventListener("click", renderIframe);

window.onload = function () {
  renderListElements();
};

function removeClass(target, classToRemove) {
  target.classList.remove(classToRemove);
}

function addClass(target, classToAdd) {
  target.classList.add(classToAdd);
}

function containClass(target, classToCheck) {
  return target.classList.contains(classToCheck);
}

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
    addClass(e.target, "hide");
    // e.target.classList.add("hide");
  }, 0);
}

/* drop targets */
function dragEnter(e) {
  e.preventDefault();

  containClass(e.target, "asideList") || containClass(e.target, "box")
    ? addClass(e.target, "drag-over")
    : // e.target.classList.add("drag-over")
      removeClass(e.target, "drag-over");
  // e.target.classList.remove("drag-over")
}

function dragOver(e) {
  e.preventDefault();
  containClass(e.target, "asideList") || containClass(e.target, "box")
    ? addClass(e.target, "drag-over")
    : removeClass(e.target, "drag-over");
}

function dragLeave(e) {
  removeClass(e.target, "drag-over");
}

function drop(e) {
  removeClass(e.target, "drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");

  const draggable = document.getElementById(id);

  // add it to the drop target

  e.target.classList.contains("items") ? "" : e.target.appendChild(draggable);

  console.log(draggable.firstElementChild);

  // display the draggable element
  draggable.parentElement.classList.contains("box")
    ? (addClass(draggable, "list-item-to-circle"),
      addClass(draggable, "align-img-circle"),
      addClass(draggable.firstElementChild, "hide"))
    : (removeClass(draggable, "list-item-to-circle"),
      removeClass(draggable, "align-img-circle"),
      removeClass(draggable.firstElementChild, "hide"));

  removeClass(draggable, "hide");
}

// button handler

function renderIframe() {
  const firstChild = box.firstChild;
  const [game, name, description] =
    firstChild !== null ? [...firstChild.querySelectorAll("span")] : [];

  firstChild === null
    ? alert("Nenhum jogo selecionado!!!")
    : ((iframe.src = `./src/folders/${firstChild.lastChild.innerText}/index.html`),
      (creatorName.innerText = name.innerText),
      (gameName.innerText = game.innerText),
      (gameDescription.innerText = description.innerText));
}
