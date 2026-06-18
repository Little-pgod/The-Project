//© Zero - Código libre no comercial

// Definir los momentos importantes
const moments = [
  {
    date: '2025-12-11',
    title: 'Primer encuentro',
    text: 'En el momento en el que te vi, nunca imaginé tener al amor de mi vida delante de mis ojos, y ahora me resulta imposible imaginar un momento en el cual no estés, mi amor, ya eres tú la voz en mi cabeza y agradezco cada momento a partir de ese día, te amo'
  },
  {
    date: '2026-01-07',
    title: 'Primera cena',
    text: 'Esa noche compartiendo la mesa contigo fue mágica, cada palabra, cada risa, cada mirada confirmó que eres mi destino. Eres la razón de mis sonrisas y el motivo de mis sueños, te amo infinitamente'
  },
  {
    date: '2026-01-31',
    title: 'Primer beso',
    text: 'Ese beso fue el más hermoso del universo, en ese momento nuestros corazones se sincronizaron y supe que eres mi alma gemela. Cada día contigo es un regalo, eres mi felicidad, te amo con toda mi existencia'
  }
];

let currentMomentIndex = 0;
let countdownInterval = null;
let momentTimeouts = [];
let currentLoadCycle = 0;

function clearMomentTimers() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  momentTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  momentTimeouts = [];
}

function scheduleMomentTimeout(callback, delay) {
  const timeoutId = setTimeout(() => {
    momentTimeouts = momentTimeouts.filter(id => id !== timeoutId);
    callback();
  }, delay);
  momentTimeouts.push(timeoutId);
  return timeoutId;
}

// Cargar el SVG y animar los corazones
function loadAndAnimateMoment() {
  const loadCycle = ++currentLoadCycle;
  fetch('imagenes/treelove.svg')
    .then(res => res.text())
    .then(svgText => {
      if (loadCycle !== currentLoadCycle) return;
      const container = document.getElementById('tree-container');
      container.innerHTML = svgText;
      const svg = container.querySelector('svg');
      if (!svg) return;

      // Animación de "dibujo" para todos los paths
      const allPaths = Array.from(svg.querySelectorAll('path'));
      allPaths.forEach(path => {
        path.style.stroke = '#222';
        path.style.strokeWidth = '2.5';
        path.style.fillOpacity = '0';
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = 'none';
      });

      // Forzar reflow y luego animar
      scheduleMomentTimeout(() => {
        allPaths.forEach((path, i) => {
          path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
          path.style.strokeDashoffset = 0;
          scheduleMomentTimeout(() => {
            path.style.fillOpacity = '1';
            path.style.stroke = '';
            path.style.strokeWidth = '';
          }, 1200 + i * 80);
        });

        // Después de la animación de dibujo, mueve y agranda el SVG
        const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
        scheduleMomentTimeout(() => {
          svg.classList.add('move-and-scale');
          // Mostrar texto con efecto typing
          scheduleMomentTimeout(() => {
            showDedicationText();
            // Mostrar petalos flotando
            startFloatingObjects();
            // Mostrar cuenta regresiva
            showCountdown();
            // Iniciar música de fondo
            playBackgroundMusic();
          }, 700); //Tiempo para agrandar el SVG
        }, totalDuration);
      }, 50);

      // Selecciona los corazones (formas rojas)
      const heartPaths = allPaths.filter(el => {
        const style = el.getAttribute('style') || '';
        return style.includes('#FC6F58') || style.includes('#C1321F');
      });
      heartPaths.forEach(path => {
        path.classList.add('animated-heart');
      });
    });
}

// Función para cambiar de momento
function changeMoment(direction) {
  currentMomentIndex += direction;
  
  // Limitar índice
  if (currentMomentIndex < 0) currentMomentIndex = 0;
  if (currentMomentIndex >= moments.length) currentMomentIndex = moments.length - 1;
  
  // Limpiar animaciones y temporizadores previos
  clearMomentTimers();

  // Actualizar indicador
  document.getElementById('moment-indicator').textContent = `${currentMomentIndex + 1} / ${moments.length}`;
  
  // Limpiar elementos actuales
  document.getElementById('floating-objects').innerHTML = '';
  document.getElementById('dedication-text').innerHTML = '<div class="signature" id="signature"></div>';
  document.getElementById('dedication-text').classList.remove('typing');
  document.getElementById('dedication-text').style.opacity = '0';
  document.getElementById('countdown').classList.remove('visible');
  const wrapper = document.querySelector('.countdown-wrapper');
  if (wrapper) wrapper.classList.remove('visible');

  const svg = document.querySelector('#tree-container svg');
  if (svg) svg.classList.remove('move-and-scale');
  
  // Recargar con un pequeño retardo para que se apliquen los cambios
  scheduleMomentTimeout(() => {
    loadAndAnimateMoment();
  }, 220);
}

// Event listeners para navegación
document.getElementById('prev-btn').addEventListener('click', () => changeMoment(-1));
document.getElementById('next-btn').addEventListener('click', () => changeMoment(1));

// Iniciar con el primer momento
loadAndAnimateMoment();

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { //seguidores
  let text = getURLParam('text');
  if (!text) {
    text = moments[currentMomentIndex].text;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.style.transform = 'translateY(-50%) translateY(12px)';
  container.classList.remove('typing');

  scheduleMomentTimeout(() => {
    container.classList.add('typing');
    container.style.opacity = '';
    container.style.transform = '';
  }, 20);

  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      const delay = text[i - 2] === '\n' ? 350 : 45;
      scheduleMomentTimeout(type, delay);
    } else {
      // Al terminar el typing, mostrar la firma animada
      scheduleMomentTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con mucho amor, Jhunior";
  signature.classList.add('visible');
}
 


// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    // Posición inicial
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    // Animación flotante
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    scheduleMomentTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    // Eliminar después de animar
    scheduleMomentTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    // Generar más objetos
    if (count++ < 32) scheduleMomentTimeout(spawn, 350 + Math.random() * 500);
    else scheduleMomentTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

// Cuenta regresiva o fecha especial
function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');

  function formatSpanishDate(date) {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} de ${meses[date.getMonth()]} del ${date.getFullYear()}`;
  }
  function update() {
    const now = new Date();
    // Recalcula la fecha de inicio según el momento actual (o parámetro 'start')
    let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date(moments[currentMomentIndex].date + 'T00:00:00');
    let days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const title = moments[currentMomentIndex] ? moments[currentMomentIndex].title : '';

    container.innerHTML =
      `<div style="font-weight:700; color:#e60026; margin-bottom:0.25em;">${title}</div>` +
      `<div style="font-size:1.15em;"><b>${days}</b> días</div>` +
      `<div style="display:block; margin-top:0.35em; font-size:0.92em; color:#555;">${formatSpanishDate(startDate)}</div>`;
    container.classList.add('visible');
    const wrapper = document.querySelector('.countdown-wrapper');
    if (wrapper) wrapper.classList.add('visible');
  }
  update();
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  countdownInterval = setInterval(update, 1000);
}

// --- Música de fondo ---
function playBackgroundMusic() {
  // Asegurarse de que solo exista un reproductor para evitar audios duplicados
  const audios = Array.from(document.querySelectorAll('audio'));
  // Mantener la primera ocurrencia de bg-music o la primera audio en la página
  let audio = document.getElementById('bg-music') || audios[0];
  if (!audio) return;
  // Eliminar otros <audio> con la misma fuente para evitar reproducir doble
  audios.forEach(a => {
    if (a === audio) return;
    // Si el src termina en el mismo archivo o tienen el id 'bg-music' duplicado, remover
    try {
      const srcA = a.getAttribute('src') || '';
      const srcMain = audio.getAttribute('src') || '';
      if (srcA.endsWith('musicdays.mp3') || srcMain.endsWith('musicdays.mp3') || a.id === 'bg-music') {
        a.parentNode && a.parentNode.removeChild(a);
      }
    } catch (e) {}
  });
  // Forzar uso del archivo musicdays y autoplay sin botones
  // Si el elemento ya tiene el src correcto no lo reasignamos para evitar recargas innecesarias
  if (!(audio.getAttribute('src') || '').endsWith('musicdays.mp3')) {
    audio.src = 'musica/musicdays.mp3';
  }
  audio.volume = 0.8;
  audio.loop = true;
  audio.autoplay = true;
  // Intento de reproducción inmediata; si el navegador bloquea autoplay, no mostramos botones
  audio.play().catch(() => {
    // Silencioso: el navegador puede requerir interacción, dejamos el audio listo para reproducir manualmente
  });
}

// Intentar reproducir la música lo antes posible (al cargar la página)
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});
