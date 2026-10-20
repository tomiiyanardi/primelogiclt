import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import LiveMascot from './LiveMascot';

const PITCHES = [
  'Ideas que se convierten en soluciones ✨',
  'Sistemas a medida para tu operación',
  'Automatizamos lo que hoy hacés a mano',
  'IA aplicada a decisiones reales',
];

/** Speech bubble that rotates through what we build, one line at a time. */
function MascotPitch({ reduced }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % PITCHES.length), 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="hero-mascot-speech" role="status" aria-live="off">
      <span className="speech-kicker">
        <i className="speech-dot" /> PRIMELOGIC
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <Motion.span
          key={index}
          className="speech-text"
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {PITCHES[index]}
        </Motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * HeroGeometry — a procedural SVG visual: concentric rings that subtly shift
 * with scroll. Uses only CSS transforms + SVG for maximum performance.
 */
function HeroGeometry({ scrollProgress, reduced }) {
  const rotate = useTransform(scrollProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollProgress, [0, 1], [0.5, 0.15]);

  const rings = Array.from({ length: 6 }, (_, i) => ({
    r: 60 + i * 40,
    opacity: 0.08 - i * 0.008,
    dash: `${4 + i * 2} ${12 + i * 4}`,
  }));

  return (
    <Motion.div
      className="hero-geometry"
      style={reduced ? {} : { rotate, scale, opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx="250"
            cy="250"
            r={ring.r}
            stroke="#00d4ff"
            strokeWidth="0.6"
            opacity={ring.opacity * 10}
            strokeDasharray={ring.dash}
          >
            {!reduced && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 250 250`}
                to={`${i % 2 === 0 ? 360 : -360} 250 250`}
                dur={`${50 + i * 15}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
        {/* Central glow */}
        <circle cx="250" cy="250" r="8" fill="#00d4ff" opacity="0.3">
          {!reduced && (
            <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="250" cy="250" r="3" fill="#00d4ff" opacity="0.7" />
        {/* Orbiting point */}
        {!reduced && (
          <circle cx="250" cy="130" r="3" fill="#00d4ff" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {/* Cross-hair lines */}
        <line x1="0" y1="250" x2="500" y2="250" stroke="#00d4ff" strokeWidth="0.3" opacity="0.06" />
        <line x1="250" y1="0" x2="250" y2="500" stroke="#00d4ff" strokeWidth="0.3" opacity="0.06" />
      </svg>
    </Motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Orchestrated entrance timing
  const entrance = { duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] };

  return (
    <section ref={ref} id="inicio" className="landing-hero">
      {/* Atmospheric gradient */}
      <div className="hero-atmosphere" aria-hidden="true" />
      {/* Topographic background texture */}
      <div className="hero-topo" aria-hidden="true" />

      {/* Procedural geometry — the hero's visual protagonist */}
      <HeroGeometry scrollProgress={scrollYProgress} reduced={reduced} />

      {/* Main content */}
      <div className="hero-copy">
        <Motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...entrance, delay: 0.1 }}
        >
          <span /> PRIMELOGIC LT / SOFTWARE FACTORY
        </Motion.p>

        <h1 aria-label="Que a tu empresa le vaya bien.">
          {['Que a tu empresa', 'le vaya bien.'].map((line, i) => (
            <span className="hero-line" aria-hidden="true" key={line}>
              <Motion.span
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ ...entrance, delay: 0.2 + i * 0.15 }}
              >
                {line}
              </Motion.span>
            </span>
          ))}
        </h1>

        <Motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: 0.55 }}
        >
          <p className="hero-description">
            Ese es el objetivo. La tecnología es cómo lo hacemos.
          </p>
          <a className="hero-primary" href="#contacto">
            Construyamos juntos <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Motion.div>
      </div>

      {/* Mascot leaning on a light pillar at the viewport edge */}
      <Motion.div
        className="hero-mascot"
        initial={reduced ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.7 }}
        style={reduced ? undefined : { y: mascotY }}
      >
        <span className="hero-mascot-pillar" aria-hidden="true" />
        <MascotPitch reduced={reduced} />
        <LiveMascot
          src="/mascota-apoyada.webp"
          alt="Mascota de Primelogic apoyada, señalando hacia el texto"
          width="548"
          height="964"
          priority
          float={6}
          sway={1}
          duration={5}
          shadow={false}
        />
      </Motion.div>

      {/* Scroll hint */}
      <a href="#ofrecemos" className="hero-scroll">
        <span className="scroll-line" />
        <ArrowDown size={14} aria-hidden="true" /> Descubrí lo que sigue
      </a>

      <span className="hero-edition">MENDOZA, ARGENTINA · SIN FRONTERAS</span>
    </section>
  );
}
