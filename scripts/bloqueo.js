// =============================
// Generador de codigo por tiempo (cambia cada 5 min)
// =============================

const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

// PRNG con semilla (mulberry32) para que el código sea reproducible
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cambia este número por el que quieras, es tu "secreto" para que
// no cualquiera pueda predecir el código solo viendo la hora
const SECRETO = 918273645;

function generarCodigoPorTiempo() {
  const intervaloMs = 5 * 60 * 1000; // 5 minutos
  const ventana = Math.floor(Date.now() / intervaloMs);
  const seed = ventana ^ SECRETO;
  const rand = mulberry32(seed);

  let codigo = "";
  for (let i = 0; i < 8; i++) {
    codigo += caracteres[Math.floor(rand() * caracteres.length)];
  }
  return codigo;
}

const codigoActual = generarCodigoPorTiempo();
console.log("Código vigente:", codigoActual);

// =============================
// blocky bot
// =============================

const WEBHOOK_URL = "https://discord.com/api/webhooks/1523394332282060851/iHUXnigpgE2y80boqaUxPYMTtybQ193a0trAG2LAKml7fnAx7ZRf7oU4KfQvPTPVYNVY"; // ⚠️ pon aquí tu URL real, entre comillas

async function enviarCodigo(codigo) {
  try {
    const respuesta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Nuevo intento de acceso a la página",
            description: `Código: ${codigo}\nHora: ${new Date().toLocaleString()}`,
            color: 3447003,
          },
        ],
      }),
    });

    console.log("Estado:", respuesta.status);

    if (respuesta.ok) {
      console.log("Mensaje enviado correctamente.");
    } else {
      console.error("Discord respondió con error:", await respuesta.text());
    }
  } catch (e) {
    console.error("Error al enviar:", e);
  }
}

// =============================
// BLOQUEO
// =============================

const LOCK_KEY = "sitio_desbloqueado";

const bloqueo = document.getElementById("bloqueo");
const input = document.getElementById("codigo");
const boton = document.getElementById("btnCodigo") || document.getElementById("entrar");
const mensaje = document.getElementById("mensaje");

function estaDesbloqueado() {
  return localStorage.getItem(LOCK_KEY) === "true";
}

function desbloquear() {
  localStorage.setItem(LOCK_KEY, "true");
  bloqueo.style.display = "none";
}

function entrar() {
  const valor = input.value.trim();

  if (valor.length !== 8) {
    mensaje.textContent = "La contraseña debe tener 8 caracteres.";
    input.focus();
    return;
  }

  if (valor === codigoActual) {
    desbloquear();
  } else {
    mensaje.textContent = "Contraseña incorrecta.";
    input.value = "";
    input.focus();
  }
}

if (estaDesbloqueado()) {
  // Ya se desbloqueó antes: no mostrar overlay ni mandar webhook
  bloqueo.style.display = "none";
} else {
  // Sigue bloqueado: mostrar overlay y avisar por webhook
  bloqueo.style.display = "flex"; // ajusta según tu CSS
  enviarCodigo(codigoActual);

  if (boton) {
    boton.addEventListener("click", entrar);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") entrar();
  });
}