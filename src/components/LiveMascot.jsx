import { useEffect, useRef } from 'react';
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * LiveMascot — a mascot image that feels alive: idle breathing + sway,
 * a soft ground shadow, a hop on hover and a subtle tilt that follows the cursor.
 * Everything is transform/opacity only and is switched off with reduced motion.
 */
export default function LiveMascot({
  src,
  alt,
  className = '',
  imgClassName = '',
  width,
  height,
  priority = false,
  float = 8,
  sway = 1.6,
  duration = 4.6,
  delay = 0,
  track = true,
  shadow = true,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [-9, 9]);
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const shiftX = useTransform(sx, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (reduced || !track || !finePointer()) return undefined;
    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        px.set(Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth / 2))));
        py.set(Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight / 2))));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced, track, px, py]);

  const idle = reduced
    ? {}
    : { y: [0, -float, 0], rotate: [-sway / 2, sway / 2, -sway / 2] };
  const idleTransition = { duration, delay, repeat: Infinity, ease: 'easeInOut' };

  return (
    <div ref={ref} className={`live-mascot ${className}`} style={{ perspective: 800 }}>
      {shadow && (
        <Motion.span
          className="live-mascot-shadow"
          aria-hidden="true"
          animate={reduced ? {} : { scaleX: [1, 0.82, 1], opacity: [0.75, 0.45, 0.75] }}
          transition={idleTransition}
        />
      )}
      <Motion.div
        className="live-mascot-body"
        style={reduced ? undefined : { rotateX, rotateY, x: shiftX }}
        whileHover={reduced ? undefined : { y: -10, scale: 1.04, transition: { type: 'spring', stiffness: 320, damping: 14 } }}
        whileTap={reduced ? undefined : { scale: 0.96 }}
      >
        <Motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imgClassName}
          draggable="false"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          animate={idle}
          transition={idleTransition}
          style={{ transformOrigin: '50% 100%' }}
        />
      </Motion.div>
    </div>
  );
}
