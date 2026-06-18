const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");



// ── LAYOUT DESKTOP — T E  A M O (horizontal) ──────────
const layoutDesktop = [
  // ── T mayúscula ──────────────────────────────────
  { x: 7.0, y: 28.0, connections: [1] },
  { x: 11.5, y: 27.5, connections: [2, 3] },
  { x: 16.0, y: 28.0, connections: [] },
  { x: 11.8, y: 46.0, connections: [4] },
  { x: 13.5, y: 57.0, connections: [] },

  // ── e minúscula ─────────────────────────────────
  { x: 19.5, y: 49.0, connections: [10], visible: false }, //1
  { x: 18.0, y: 43.5, connections: [5, 8], visible: true },
  { x: 21.0, y: 37.5, connections: [6], visible: false },
  { x: 24.0, y: 36.5, connections: [7], visible: true },
  { x: 27.0, y: 42.0, connections: [8, 11], visible: true },
  { x: 24.0, y: 45.5, connections: [9, 10], visible: false },
  { x: 22, y: 55.0, connections: [6, 11], visible: true },
  { x: 25, y: 55.0, connections: [11], visible: false },
  { x: 27.5, y: 50.0, connections: [11], visible: true },

  // ── a minúscula ────────────────────────────────
  { x: 42.5, y: 36.0, connections: [15] }, //1
  { x: 47.0, y: 30.0, connections: [16] }, //2
  { x: 51.0, y: 36.0, connections: [17] }, //3
  { x: 50.5, y: 42.0, connections: [18] }, //4
  { x: 50.0, y: 54.0, connections: [19, 20] }, //5
  { x: 51.5, y: 56.5, connections: [], visible: false }, //6
  { x: 46.0, y: 56.0, connections: [17, 18] }, //7
  { x: 43.0, y: 49.0, connections: [22], visible: false }, //8
  { x: 46.0, y: 42.0, connections: [17], visible: false }, //9

  // ── m minúscula ────────────────────────────────
  { x: 55.0, y: 33.0, connections: [24, 25] },
  { x: 55.5, y: 47.0, connections: [] },
  { x: 59.0, y: 31.0, connections: [26] },
  { x: 61.5, y: 36.5, connections: [27, 28] },
  { x: 63.8, y: 48.5, connections: [] },
  { x: 67.0, y: 30.0, connections: [29] },
  { x: 70.0, y: 37.0, connections: [30] },
  { x: 71.0, y: 49.5, connections: [] },

  // ── o minúscula ────────────────────────────────
  { x: 76.5, y: 33.5, connections: [32, 36] },
  { x: 81.0, y: 27.0, connections: [33] },
  { x: 85.5, y: 35.5, connections: [34] },
  { x: 84.0, y: 49.0, connections: [35] },
  { x: 79.0, y: 52.5, connections: [36] },
  { x: 74.0, y: 44.0, connections: [] },
];

// ── LAYOUT MÓVIL — TE (arriba) / AMO (abajo) ──────────
const layoutMobile = [
  // ── T (0-4) — fila 1 izquierda
  { x: 8, y: 10, connections: [1] },
  { x: 18, y: 9.5, connections: [2, 3] },
  { x: 28, y: 10, connections: [] },
  { x: 18, y: 22, connections: [4] },
  { x: 22, y: 30, connections: [] },

  // ── e (5-13) — fila 1 derecha
  { x: 38, y: 28, connections: [10, 11] }, //1
  { x: 36, y: 24, connections: [5] }, //2
  { x: 38, y: 20, connections: [6] }, //3
  { x: 51, y: 18, connections: [7] }, //4
  { x: 56.5, y: 22, connections: [8] }, //5
  { x: 49, y: 26, connections: [9] }, //6
  { x: 40, y: 32, connections: [] }, //7
  { x: 52, y: 32, connections: [11] }, //8
  { x: 60, y: 28, connections: [12] }, //9

  // ── a (14-22) — fila 2 izquierda
  { x: 17, y: 50, connections: [15] },
  { x: 23, y: 48, connections: [16] },
  { x: 29, y: 52, connections: [17] },
  { x: 28, y: 58, connections: [18] },
  { x: 27, y: 65, connections: [19, 20] },
  { x: 31, y: 68, connections: [] },
  { x: 20, y: 70, connections: [21] },
  { x: 13, y: 66, connections: [22] },
  { x: 15, y: 58, connections: [17] },
  //48 - 65

  // ── m (23-30) — fila 2 centro
  { x: 43, y: 50, connections: [24, 25] },
  { x: 43, y: 65, connections: [] },
  { x: 48, y: 48, connections: [26] },
  { x: 53, y: 52, connections: [27, 28] },
  { x: 53, y: 65, connections: [] },
  { x: 58, y: 48, connections: [29] },
  { x: 63, y: 52, connections: [30] },
  { x: 63, y: 65, connections: [] },

  // ── o (31-36) — fila 2 derecha
  { x: 74, y: 50, connections: [32, 36] },
  { x: 83, y: 47, connections: [33] },
  { x: 90, y: 52, connections: [34] },
  { x: 89, y: 62, connections: [35] },
  { x: 81, y: 64, connections: [36] },
  { x: 73, y: 59, connections: [] },
];

// ── OBTENER ESTRELLAS ──────────────────────────────────
function getStars() {
  const isMobile = window.innerWidth < 768;
  const layout = isMobile ? layoutMobile : layoutDesktop;
  return layout;
}

// ── TAMAÑO DEL CANVAS ──────────────────────────────────
function resize() {
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  draw();
}

// ── HELPER: % a px ─────────────────────────────────────
function toPixel(star) {
  return {
    px: (star.x / 100) * canvas.width,
    py: (star.y / 100) * canvas.height,
  };
}

function isStarVisible(star) {
  return !(star && star.visible === false);
}

// ── ÍCONOS DE ESTRELLAS ────────────────────────────────
function renderStarIcons(stars) {
  document.querySelectorAll(".star-icon").forEach((el) => el.remove());
  stars.forEach((star, idx) => {
    if (!isStarVisible(star)) return;
    const { px, py } = toPixel(star);
    
    // 3 tamaños discretos: pequeño, medio, grande
    const sizeType = idx % 3;
    let size;
    if (sizeType === 0) size = 0.8;      // pequeño
    else if (sizeType === 1) size = 1.1; // medio
    else size = 1.4;                     // grande

    const icon = document.createElement("span");
    icon.className = "star-icon";
    icon.textContent = "✦";
    icon.style.left = px + "px";
    icon.style.top = py + "px";
    icon.style.fontSize = (1.2 * size) + "rem";
    icon.style.opacity = 0.8;

    canvas.parentElement.appendChild(icon);
  });
}

// ── LÍNEA CON GLOW ─────────────────────────────────────
function drawGlowLine(x1, y1, x2, y2) {
  ctx.save();
1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.shadowColor = "rgba(220, 235, 255, 0.9)";
  ctx.shadowBlur = 6;
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 0.5
  ctx.shadowColor = "rgba(220, 235, 255, 0.9)";
  ctx.shadowBlur = 6;
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.restore();
}

// ── DIBUJO ─────────────────────────────────────────────
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stars = getStars();

  stars.forEach((star) => {
    if (!isStarVisible(star)) return;
    const { px, py } = toPixel(star);
    star.connections.forEach((targetIndex) => {
      const target = stars[targetIndex];
      if (!target || !isStarVisible(target)) return;
      const { px: tx, py: ty } = toPixel(target);
      drawGlowLine(px, py, tx, ty);
    });
  });

  renderStarIcons(stars);
}

// ── INIT ───────────────────────────────────────────────
window.addEventListener("resize", resize);
resize();
(function () {
  const canvas = document.getElementById("starCanvasBg");
  const ctx = canvas.getContext("2d");

  // ── Configuración ──────────────────────────────────────────────
  const CONFIG = {
    starCount: 300,
    shootingStarInterval: 1200,
    twinkleSpeed: 3.5,
    nebulaOpacity: 0.15,
  };

  // ── Resize ─────────────────────────────────────────────────────
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildNebula(); // recalcula posiciones al cambiar tamaño
  }

  // ── Estrellas de fondo ─────────────────────────────────────────
  function makeStars(count) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: CONFIG.twinkleSpeed + Math.random() * 0.5,
      warm: Math.random() > 0.75, // algunas con tinte cálido
    }));
  }

  let stars = [];

  // ── Nebulosas ──────────────────────────────────────────────────
  let nebulae = [];

  function buildNebula() {
    const W = canvas.width,
      H = canvas.height;
    nebulae = [
      {
        x: 0.2 * W,
        y: 0.3 * H,
        r: Math.min(W, H) * 0.18,
        rgb: [70, 30, 140],
      },
      { x: 0.75 * W, y: 0.65 * H, r: Math.min(W, H) * 0.15, rgb: [30, 10, 110] },
    ];
  }

  function drawNebulae() {
    nebulae.forEach(({ x, y, r, rgb }) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(
        0,
        `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${CONFIG.nebulaOpacity})`,
      );
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ── Estrellas fugaces ──────────────────────────────────────────
  let shooters = [];

  function spawnShooter() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    shooters.push({
      x,
      y,
      len: 120 + Math.random() * 80,
      progress: 0,
      speed: 4 + Math.random() * 3,
    });
  }

  function drawShooters() {
    shooters = shooters.filter((s) => s.progress < 1);
    shooters.forEach((s) => {
      s.progress += s.speed / (s.len * 10);
      const alpha = Math.sin(s.progress * Math.PI);
      const tailX = s.x + s.progress * s.len;
      const tailY = s.y + s.progress * s.len * 0.4;

      const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      g.addColorStop(0, `rgba(255,245,255,0)`);
      g.addColorStop(1, `rgba(255,245,255,${alpha * 0.9})`);

      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    });
  }

  // ── Loop principal ─────────────────────────────────────────────
  let t = 0;

  function draw() {
    const W = canvas.width,
      H = canvas.height;

    // Dejar el fondo transparente para que se vea el degradado CSS
    ctx.clearRect(0, 0, W, H);

    // Nebulosas
    drawNebulae();

    // Estrellas de fondo
    stars.forEach((s) => {
      const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);

      // Solo núcleo, sin halo costoso
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * tw, 0, Math.PI * 2);
      ctx.fillStyle = s.warm
        ? `rgba(255,235,200,${0.6 + 0.4 * tw})`
        : `rgba(240,225,255,${0.6 + 0.4 * tw})`;
      ctx.fill();
    });

    // Estrellas fugaces
    drawShooters();

    t += 0.016;
    requestAnimationFrame(draw);
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    resize();
    stars = makeStars(CONFIG.starCount);
    draw();
    setInterval(spawnShooter, CONFIG.shootingStarInterval);
  }

  window.addEventListener("resize", () => {
    resize();
    stars = makeStars(CONFIG.starCount);
  });

  init();
})();
const musicBtn = document.querySelector(".music-btn");

const audio = new Audio("musica/space.mp3");
audio.loop = true;
audio.volume = 0.0;

let audioStarted = false;
let fadeInterval = null;

function fadeInAudio(duration = 2500) {
  const steps = 25;
  const stepTime = duration / steps;
  const targetVolume = 1.0;
  let currentStep = 0;

  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    currentStep += 1;
    audio.volume = Math.min(targetVolume, currentStep / steps);
    if (currentStep >= steps) {
      audio.volume = targetVolume;
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;

  audio.play()
    .then(() => {
      fadeInAudio(2500);
    })
    .catch(() => {
      audioStarted = false;
    });
}

// Autoplay: inicia la música al cargar la página
window.addEventListener("load", () => {
  startAudio();
});

// Click en el BOTÓN para regresar al menú
musicBtn.addEventListener("click", () => {
  window.location.href = "menu.html";
});