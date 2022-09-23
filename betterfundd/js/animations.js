let modal_pop = document.querySelector(".modal-pop");
let total_layer = document.querySelector(".total-layer");
let modal_inner = document.querySelectorAll(".modal-inner");
let select_btn = document.querySelectorAll(".select");
let thanks_card = document.getElementById("thanks-card");
let type = document.getElementById("type");
let boxs = document.getElementsByName("pledge");
let input_pledge = document.querySelectorAll(".input-pledge");
let subMenuBtn = document.getElementById("subMenu");
let subMenu = document.querySelector(".subMenu");
let sub_menu_icon = document.getElementById("subMenuIcon");
let isMenuOpen = false;
let bookmark = document.getElementById("bookmark");
let bookmark_text = document.querySelector(".bookmark");

// DISPLAY SUBMENU

subMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    subMenu.style.display = "block";
    total_layer.classList.add("show");
    sub_menu_icon.src = "./assets/icons/icon-close-menu.svg";
  } else {
    subMenu.style.display = "none";
    total_layer.classList.remove("show");
    sub_menu_icon.src = "./assets/icons/icon-hamburger.svg";
  }
});

// BORDER ON MODALS BOX PLUS INPUT PLEDGE

for (let i = 0; i < boxs.length; i++) {
  boxs[i].addEventListener("click", (e) => {
    clearBorder();
    e.path[2].style.border = "2px solid gray";
    modal_inner[i].classList.add("display-pledge");
    input_pledge[i].innerHTML = `
    <h3>Enter your pledge</h3>
    <label for="pledge">
      <span>$</span>
      <input type="text" />
    </label>
    <button onclick="displayThanks()">Continue</button>`;
  });
}

function clearBorder() {
  for (let i = 0; i < boxs.length; i++) {
    modal_inner[i].style.border = "1px solid rgba(128, 128, 128, 0.479)";
    modal_inner[i].classList.remove("display-pledge");
    input_pledge[i].innerHTML = "";
  }
}

// CLOSE MODAL & OPEN MODAL

document.getElementById("close-modal").addEventListener("click", () => {
  modal_pop.classList.remove("show");
  total_layer.classList.remove("show");
});

document.getElementById("open-modal").addEventListener("click", () => {
  modal_pop.classList.add("show");
  total_layer.classList.add("show");
});

// THANKS TO THE USER

let isDisplayThanks = true;

select_btn[0].addEventListener("click", displayThanks);
select_btn[1].addEventListener("click", displayThanks);
document.getElementById("gotit").addEventListener("click", displayThanks);

function displayThanks() {
  if (isDisplayThanks) {
    thanks_card.classList.add("show");
    total_layer.classList.add("show");
    modal_pop.classList.remove("show");
    clearBorder();
    type.classList.add("type");
  } else {
    thanks_card.classList.remove("show");
    total_layer.classList.remove("show");
    clearBorder();
    type.classList.remove("type");
  }
  isDisplayThanks = !isDisplayThanks;
}

// Bookmark

let bookmarked = false;

bookmark.addEventListener("click", () => {
  bookmarked = !bookmarked;
  bookmarked
    ? (bookmark_text.innerText = "Bookmarked")
    : (bookmark_text.innerText = "Bookmark");
});
