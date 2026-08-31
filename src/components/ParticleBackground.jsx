import React, { useRef, useEffect } from 'react';

// ── Tabla de permutación Perlin (generada una sola vez) ──────────────────────
const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return new Uint8Array([...p, ...p]);
})();

const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (t, a, b) => a + t * (b - a);
const grad = (h, x, y) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);

function perlin(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  return lerp(v,
    lerp(u, grad(PERM[a],     x,     y), grad(PERM[b],     x - 1, y)),
    lerp(u, grad(PERM[a + 1], x,     y - 1), grad(PERM[b + 1], x - 1, y - 1))
  );
}

/**
 * ParticleBackground — Fondo global de partículas y flujo orgánico basado en
 * Canvas 2D puro (sin dependencias WebGL ni Three.js), lo que garantiza
 * compatibilidad total en cualquier GPU/navegador y CERO errores de WebGL context.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId;
    let lastTime = performance.now();

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const mouse = { x: -9999, y: -9999, active: false };

    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cantidad equilibrada de partículas: reducida en móviles para garantizar 60fps constante
    const divisor = width < 768 ? 14 : 5;
    const particleCount = Math.min(width < 768 ? 35 : 120, Math.floor(Math.min(width, height) / divisor));
    const particles = [];

    const spawnParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      radius: Math.random() * 1.3 + 0.6,
      baseAlpha: Math.random() * 0.22 + 0.08,
      life: Math.random() * 200,
      maxLife: Math.random() * 250 + 150,
      speed: Math.random() * 0.6 + 0.35,
      hue: Math.random() < 0.3 ? '#00E5FF' : '#0074D9'
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(spawnParticle());
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    let frame = 0;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now) => {
      if (isPaused) return;
      const dt = Math.min(32, now - lastTime) / 16.6667;
      lastTime = now;
      frame += 0.003;

      ctx.clearRect(0, 0, width, height);

      const SCALE = 0.0024;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ángulo de flujo mediante Perlin Noise
        const angle = perlin(p.x * SCALE + frame, p.y * SCALE + frame) * Math.PI * 3.5;

        // Atracción sutil al mouse solo en desktop
        let pullX = 0;
        let pullY = 0;
        if (!isMobile && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          if (dist < 180) {
            const force = (1 - dist / 180) * 0.35;
            pullX = (dx / dist) * force;
            pullY = (dy / dist) * force;
          }
        }

        p.vx = p.vx * 0.92 + (Math.cos(angle) * p.speed + pullX) * 0.08;
        p.vy = p.vy * 0.92 + (Math.sin(angle) * p.speed + pullY) * 0.08;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        // Rebote / teletransporte suave en bordes
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Fade in y fade out
        const progress = p.life / p.maxLife;
        let alpha = p.baseAlpha;
        if (progress < 0.15) alpha *= (progress / 0.15);
        else if (progress > 0.8) alpha *= ((1 - progress) / 0.2);

        if (p.life >= p.maxLife) {
          Object.assign(p, spawnParticle());
          p.life = 0;
        }

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === '#00E5FF' 
          ? `rgba(0, 229, 255, ${Math.max(0, alpha)})` 
          : `rgba(0, 116, 217, ${Math.max(0, alpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}