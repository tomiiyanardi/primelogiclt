import { useRef } from 'react';
import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Decorative chapter background layer.
 * Never intercepts pointer events. Parallax stops with reduced motion.
 * Variants: grid, dots, rings, topo, iso
 */
export default function ChapterBackdrop({ variant = 'grid', label }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  return (
    <div ref={ref} className={`chapter-backdrop backdrop-${variant}`} aria-hidden="true">
      <Motion.div className="backdrop-art" style={reduced ? {} : { y }} />
      <span className="chapter-watermark">{label}</span>
    </div>
  );
}
