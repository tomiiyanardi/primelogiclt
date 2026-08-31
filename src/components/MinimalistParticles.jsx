import React, { useRef, useEffect } from 'react';

/**
 * MinimalistParticles — fondo animado tipo "constelación de red" para una
 * software factory. Pensado para ir como <MinimalistParticles /> detrás del
 * contenido de la página (position: absolute/fixed inset-0 en el padre).
 *
 * Mejoras respecto a la versión original:
 * 1. Grid espacial (spatial hashing) para las conexiones: pasa de O(n²) a
 *    ~O(n), permitiendo muchas más partículas sin caer los FPS.
 * 2. 3 capas de profundidad (parallax): fondo tenue y lento, medio, y frente
 *    brillante y rápido con leve glow — sensación de volumen, no de plano.
 * 3. Interacción con el mouse: las partículas cercanas se apartan del cursor
 *    y se dibuja una "red" de conexión activa alrededor de él.
 * 4. "Paquetes de datos" viajando por las líneas de conexión — referencia
 *    visual directa a builds/deploys corriendo por la red (encaja con el
 *    concepto de software factory).
 * 5. Fondo propio con degradé radial azul profundo + viñeta, para que el
 *    componente funcione como fondo completo de la página sin depender de
 *    estilos externos.
 * 6. Animación basada en delta-time (independiente del framerate del
 *    dispositivo) + soporte de devicePixelRatio para verse nítido en retina.
 * 7. Respeta prefers-reduced-motion: si el usuario lo pidió, se dibuja una
 *    escena estática en vez de animar.
 * 8. Nodos con dos formas (círculo / diamante) para sugerir "datos" y
 *    "procesos" sin volverse ruidoso.
 *
 * Props (todas opcionales, funciona igual que antes con <MinimalistParticles />):
 * - density: multiplicador de cantidad de partículas (default 1)
 * - interactive: activa la interacción con el mouse (default true)
 * - packets: activa los pulsos de datos viajando por las líneas (default true)
 * - withBackground: dibuja su propio fondo degradé azul (default true)
 * - className: clases extra para el <canvas>
 */
export default function MinimalistParticles({
  density = 1,
  interactive = true,
  packets = true,
  withBackground = true,
  className = '',
}) {
  const canvasRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    let width = 0;
    let height = 0;
    let animationFrameId;
    let lastTime = performance.now();

    const mouse = { x: -9999, y: -9999, active: false };

    // ---------- Paleta "software factory": azules profundos + cian ----------
    const PALETTE = ['#00E5FF', '#3AA0FF', '#0074D9', '#5DE1FF', '#8FD9FF'];

    const LAYERS = [
      // fondo: chico, tenue, lento
      { count: 0.5, speed: 0.15, radius: [0.6, 1.1], alpha: [0.15, 0.3], glow: false, connectDist: 70 },
      // medio
      { count: 0.35, speed: 0.3, radius: [1.0, 1.8], alpha: [0.3, 0.5], glow: false, connectDist: 100 },
      // frente: grande, brillante, rápido, con glow leve
      { count: 0.15, speed: 0.5, radius: [1.6, 2.6], alpha: [0.55, 0.85], glow: true, connectDist: 130 },
    ];

    let particles = [];
    let packetList = [];

    const rand = (a, b) => a + Math.random() * (b - a);

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.offsetWidth : canvas.offsetWidth;
      height = parent ? parent.offsetHeight : canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    let nextId = 0;

    const buildParticles = () => {
      const effectiveDensity = (width < 768 ? 0.4 : 1) * density;
      const base = Math.floor(Math.min(width, height) / 14) * effectiveDensity;
      particles = [];
      nextId = 0;
      LAYERS.forEach((layer, layerIndex) => {
        const n = Math.max(2, Math.floor(base * layer.count));
        for (let i = 0; i < n; i++) {
          particles.push({
            id: nextId++,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * layer.speed,
            vy: (Math.random() - 0.5) * layer.speed,
            radius: rand(layer.radius[0], layer.radius[1]),
            baseAlpha: rand(layer.alpha[0], layer.alpha[1]),
            pulseSpeed: rand(0.4, 1.1),
            pulseOffset: Math.random() * Math.PI * 2,
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            layer: layerIndex,
            shape: Math.random() < 0.12 ? 'diamond' : 'circle',
          });
        }
      });
    };

    // ---------- Grid espacial para no comparar todas las partículas entre sí ----------
    const CELL = 110;
    let grid = new Map();

    const cellKey = (cx, cy) => cx + ',' + cy;

    const buildGrid = () => {
      grid = new Map();
      for (const p of particles) {
        const cx = Math.floor(p.x / CELL);
        const cy = Math.floor(p.y / CELL);
        const key = cellKey(cx, cy);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(p);
      }
    };

    const neighborsOf = (p) => {
      const cx = Math.floor(p.x / CELL);
      const cy = Math.floor(p.y / CELL);
      const out = [];
      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const bucket = grid.get(cellKey(cx + ox, cy + oy));
          if (bucket) out.push(...bucket);
        }
      }
      return out;
    };

    // ---------- Fondo degradé azul profundo + viñeta ----------
    const drawBackground = () => {
      if (!withBackground) return;
      const g = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 0,
        width * 0.5, height * 0.35, Math.max(width, height) * 0.9
      );
      g.addColorStop(0, '#0A2540');
      g.addColorStop(0.55, '#051A33');
      g.addColorStop(1, '#020E1F');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, Math.min(width, height) * 0.3,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawParticle = (p, alpha) => {
      ctx.beginPath();
      if (p.shape === 'diamond') {
        const r = p.radius * 1.6;
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x, p.y + r);
        ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
      } else {
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = hexToRgba(p.color, alpha);
      if (!isMobile && p.layer === 2) {
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    };

    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // ---------- Paquetes de datos viajando por una conexión ----------
    const maybeSpawnPacket = (a, b) => {
      if (!packets || isMobile) return;
      if (packetList.length > 30) return;
      if (Math.random() < 0.0025) {
        packetList.push({ a, b, t: 0, speed: rand(0.006, 0.014) });
      }
    };

    const updateAndDrawPackets = () => {
      if (!packets || isMobile) return;
      packetList = packetList.filter((pk) => pk.t <= 1);
      for (const pk of packetList) {
        pk.t += pk.speed;
        const x = pk.a.x + (pk.b.x - pk.a.x) * pk.t;
        const y = pk.a.y + (pk.b.y - pk.a.y) * pk.t;
        const fade = Math.sin(Math.PI * pk.t);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * fade})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#8FD9FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let isPaused = false;
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now) => {
      if (isPaused) return;
      const dt = Math.min(48, now - lastTime) / 16.6667; // normalizado a ~60fps
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      drawBackground();

      buildGrid();

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        if (interactive && !isMobile && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 120;
          if (distSq < radius * radius) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / radius) * 0.6;
            p.x += (dx / dist) * force * dt;
            p.y += (dy / dist) * force * dt;
          }
        }

        const pulse = Math.sin(now * 0.001 * p.pulseSpeed + p.pulseOffset) * 0.18;
        const alpha = Math.max(0.08, p.baseAlpha + pulse);
        drawParticle(p, alpha);
      }

      // conexiones usando el grid (solo vecinos cercanos, no todos contra todos)
      const drawn = new Set();
      for (const p of particles) {
        const layer = LAYERS[p.layer];
        const maxDist = layer.connectDist;
        for (const p2 of neighborsOf(p)) {
          if (p2 === p) continue;
          const pairId = p.id < p2.id ? `${p.id}-${p2.id}` : `${p2.id}-${p.id}`;
          if (drawn.has(pairId)) continue;
          drawn.add(pairId);

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isMobile ? 0.15 : 0.22);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(93, 225, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            maybeSpawnPacket(p, p2);
          }
        }
      }

      // red activa alrededor del cursor en desktop
      if (interactive && !isMobile && mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00E5FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      updateAndDrawPackets();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
    };

    resize();

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize);
    }

    if (interactive && !isMobile) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
    }

    animationFrameId = requestAnimationFrame(render);
    if (prefersReducedMotion) {
      cancelAnimationFrame(animationFrameId);
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', resize);
      if (interactive && !isMobile) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [density, interactive, packets, withBackground]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${interactive ? '' : 'pointer-events-none'} z-0 ${className}`}
    />
  );
}