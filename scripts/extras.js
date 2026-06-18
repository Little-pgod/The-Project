// Prevent right-click
window.oncontextmenu = function () {
  return false;
};

// Old confetti system removed. Only the new neon rain animation runs now.

// Carta
const regalo = document.querySelector(".regalo");
const regalos = document.querySelector(".regalos");
const modalCarta = document.getElementById("modalCarta");

regalo.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

regalos.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

modalCarta.addEventListener("click", () => {
  modalCarta.classList.remove("activo");
});

// Todo Oscuro + Soplido + Canción
const overlay = document.querySelector(".overlay");
const soplido = document.getElementById("soplido");
const cancion = document.getElementById("cancion");
const llama = document.querySelector(".llama");

llama.addEventListener("click", () => {
  soplido.currentTime = 0;
  soplido.play();

  llama.style.animation = "apagar 0.5s forwards"; // forwards -> Ultimo frame (to)

  setTimeout(() => {
    cancion.currentTime = 0;
    cancion.play();
    overlay.classList.add("hidden");
  }, 1000);
});

// Background Selector
const toggleSelector = document.getElementById("toggleSelector");
const backgroundSelector = document.querySelector(".background-selector");
const closeSelector = document.getElementById("closeSelector");
const bgOptions = document.querySelectorAll(".bg-option");

// Load saved background preference
function loadBackgroundPreference() {
  const savedBg = localStorage.getItem("extrasBgPreference") || "default";
  applyBackground(savedBg);
  updateActiveButton(savedBg);
}

function applyBackground(bgType) {
  document.body.className = "";
  if (bgType !== "default") {
    document.body.classList.add(`bg-${bgType}`);
  }
  localStorage.setItem("extrasBgPreference", bgType);
}

function updateActiveButton(bgType) {
  bgOptions.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.bg === bgType) {
      btn.classList.add("active");
    }
  });
}

// Event listeners
toggleSelector?.addEventListener("click", () => {
  backgroundSelector.classList.add("active");
});

closeSelector?.addEventListener("click", () => {
  backgroundSelector.classList.remove("active");
});

backgroundSelector?.addEventListener("click", (e) => {
  if (e.target === backgroundSelector) {
    backgroundSelector.classList.remove("active");
  }
});

bgOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const bgType = btn.dataset.bg;
    applyBackground(bgType);
    updateActiveButton(bgType);
  });
});

// Load preference on page load
loadBackgroundPreference();