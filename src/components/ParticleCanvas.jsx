import { useEffect, useRef } from 'react';

/** A bounded 2D field: no React updates per frame, paused outside the hero. */
export default function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, particles = [], frame = 0, last = 0;
    let visible = true;
    const pointer = { x: -1000, y: -1000 };
    const draw = (time = 0) => {
      frame = 0;
      const delta = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      context.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!motion.matches) {
          p.x = (p.x + p.vx * delta + width) % width;
          p.y = (p.y + p.vy * delta + height) % height;
        }
        const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        context.beginPath();
        context.fillStyle = `rgba(${p.blue ? '67,192,226' : '181,203,220'},${distance < 130 ? .8 : p.alpha})`;
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      }
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (visible && !document.hidden) draw();
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.min(100, Math.max(32, Math.round(width * height / 14000))) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .28, vy: -.1 - Math.random() * .22,
        radius: .6 + Math.random() * .9, alpha: .18 + Math.random() * .32, blue: Math.random() > .7,
      }));
      restart();
    };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    intersection.observe(canvas);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const move = event => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top;
    };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', restart);
    motion.addEventListener('change', restart);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
      hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', restart); motion.removeEventListener('change', restart);
    };
  }, []);
  return <canvas ref={ref} className="hero-particles" aria-hidden="true" />;
}
