// Optimized Neon Rain - Inspired by espacio.js particle system
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'neonRainCanvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
    z-index: -1;
  `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  // ── CONFIGURACIÓN (Spawn gradual, velocidad rápida) ──
  const CONFIG = {
    particleCount: 100,        // Menos gotas para un efecto más limpio
    spawnInterval: 900,        // ms entre spawn de nuevas gotas (gradual)
    baseSpeed: 5.5,            // Velocidad base muy rápida para caída intensa
    twinkleSpeed: 3.5,         // Velocidad del parpadeo
  };

  // ── RESIZE ──────────────────────────────────────────
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ── COLOR PALETTE ───────────────────────────────────
  const colors = [
    { r: 0, g: 255, b: 255 },     // Cyan
    { r: 100, g: 200, b: 255 },   // Blue
    { r: 0, g: 200, b: 255 },     // Aqua
    { r: 255, g: 0, b: 255 },     // Magenta
    { r: 200, g: 100, b: 255 },   // Violet
    { r: 0, g: 255, b: 150 },     // Green Neon
  ];

  // ── PARTÍCULAS (Pool optimizado) ────────────────────
  let drops = [];
  let totalSpawned = 0;

  function createDrop() {
    const colorIdx = Math.floor(Math.random() * colors.length);
    const depth = Math.random();
    
    return {
      x: Math.random() * canvas.width,
      y: -50,
      vx: 0,
      vy: CONFIG.baseSpeed * (0.85 + depth * 0.7), // Velocidad vertical fuerte por profundidad
      size: 2.4 + depth * 4.0, // Tamaño 2.4-6.4px
      color: colors[colorIdx],
      opacity: 0.45 + depth * 0.5, // Opacidad varía con profundidad
      trail: [],
      trailLen: 12 + Math.floor(depth * 12), // Trail 12-24px
      depth: depth,
      phase: Math.random() * Math.PI * 2,
    };
  }

  // ── UPDATE DROPS (Sin trail costoso, solo movimiento) ──
  function updateDrops() {
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      
      d.x += d.vx;
      d.y += d.vy;
      
      // Simple trail: solo guardar posiciones cada 2px
      if (d.trail.length === 0 || Math.hypot(d.x - d.trail[0][0], d.y - d.trail[0][1]) > 2) {
        d.trail.unshift([d.x, d.y]);
        if (d.trail.length > d.trailLen) {
          d.trail.pop();
        }
      }
      
      // Mantener movimiento vertical recto
      d.vx = 0;
      
      // Respawn si sale de pantalla
      if (d.y > canvas.height + 50) {
        drops[i] = createDrop();
      }
    }
  }

  // ── DRAW BACKGROUND (Sin getImageData!) ──────────────
  function drawBackground() {
    const g = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    g.addColorStop(0, 'rgba(10, 10, 20, 1)');
    g.addColorStop(0.5, 'rgba(5, 5, 15, 1)');
    g.addColorStop(1, 'rgba(2, 2, 8, 1)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ── DRAW DROP CON TRAIL OPTIMIZADO ──────────────────
  function drawDrop(d) {
    // Trail
    if (d.trail.length > 1) {
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < d.trail.length - 1; i++) {
        const [x1, y1] = d.trail[i];
        const [x2, y2] = d.trail[i + 1];
        
        const progress = i / d.trail.length;
        const alpha = d.opacity * (1 - progress) * 0.5;
        
        ctx.strokeStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${alpha})`;
        ctx.lineWidth = Math.max(0.4, d.size * 0.5 * (1 - progress));
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Core particle
    ctx.fillStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${d.opacity * 0.9})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size * 0.95, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── LOOP PRINCIPAL ──────────────────────────────────
  let frameCount = 0;
  let nextSpawnTime = 700; // Esperar 700ms antes de primera gota

  function draw() {
    frameCount++;

    // Spawn gradual: 1 drop cada 700ms
    if (frameCount * 16.67 > nextSpawnTime && drops.length < CONFIG.particleCount) {
      drops.push(createDrop());
      nextSpawnTime += CONFIG.spawnInterval;
    }

    updateDrops();
    drawBackground();

    // Dibujar todas las gotas
    for (let d of drops) {
      drawDrop(d);
    }

    requestAnimationFrame(draw);
  }

  // ── INIT ────────────────────────────────────────────
  function init() {
    resize();
    draw();
  }

  window.addEventListener('resize', resize);
  init();
})();
