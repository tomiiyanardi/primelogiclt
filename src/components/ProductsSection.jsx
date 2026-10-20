import { useRef, useSyncExternalStore, useState, useEffect } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, Workflow, BrainCircuit, Compass } from 'lucide-react';
import ChapterBackdrop from './ChapterBackdrop';
import LiveMascot from './LiveMascot';

const query = '(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)';
const subscribe = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const snapshot = () => window.matchMedia(query).matches;

const products = [
  {
    title: 'Software que se adapta a vos.',
    category: 'PRODUCTOS DIGITALES',
    text: 'Aplicaciones web, móviles y sistemas a medida. Convertimos una operación compleja en una experiencia clara, rápida y preparada para crecer.',
    icon: Code2,
    tags: ['Web & mobile', 'Sistemas a medida'],
    visual: 'interface',
    mascot: '/mascots/mascot-sitting-laptop.webp',
    chips: ['Panel en vivo', 'App lista para usar'],
  },
  {
    title: 'Menos tareas. Más posibilidades.',
    category: 'AUTOMATIZACIÓN E INTEGRACIÓN',
    text: 'Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo se enfoque en aportar valor real.',
    icon: Workflow,
    tags: ['Procesos conectados', 'Operación eficiente'],
    visual: 'workflow',
    mascot: '/mascots/mascot-point-forward.webp',
    chips: ['Tarea automatizada ✓', 'Sistemas conectados'],
  },
  {
    title: 'Inteligencia aplicada a tu negocio.',
    category: 'INTELIGENCIA ARTIFICIAL',
    text: 'IA generativa y análisis predictivo para potenciar decisiones y transformar información en nuevas oportunidades.',
    icon: BrainCircuit,
    tags: ['IA generativa', 'Análisis predictivo'],
    visual: 'intelligence',
    mascot: '/mascots/mascot-tablet.webp',
    chips: ['Insight generado', 'Predicción lista'],
  },
  {
    title: 'Una base sólida. Un futuro abierto.',
    category: 'CONSULTORÍA Y EVOLUCIÓN',
    text: 'Acompañamiento técnico para priorizar, modernizar y sostener una plataforma que crezca con tu empresa.',
    icon: Compass,
    tags: ['Arquitectura', 'Acompañamiento'],
    visual: 'architecture',
    mascot: '/mascots/mascot-arms-crossed.webp',
    chips: ['Arquitectura escalable', 'Soporte continuo'],
  },
];

function ServiceVisual({ kind, icon, mascot, title, chips = [] }) {
  return (
    <div className={`service-visual visual-${kind}`}>
      <span className="visual-axis axis-x" aria-hidden="true" />
      <span className="visual-axis axis-y" aria-hidden="true" />
      {/* Decorative shape stays behind; the mascot stands upright on top of it */}
      <div className="visual-shell" aria-hidden="true">
        {!mascot && <div className="visual-shell-inner">{icon}</div>}
      </div>
      {mascot && (
        <LiveMascot
          src={mascot}
          alt={title}
          className="service-mascot"
          imgClassName="service-mascot-img"
          float={7}
          duration={4.2}
        />
      )}
      {chips.map((chip, i) => (
        <Motion.span
          key={chip}
          className={`service-chip chip-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <i /> {chip}
        </Motion.span>
      ))}
      <i className="visual-node node-a" aria-hidden="true" />
      <i className="visual-node node-b" aria-hidden="true" />
      <span className="visual-caption" aria-hidden="true">PRIMELOGIC / {kind.toUpperCase()}</span>
    </div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const track = useRef(null);
  const cinematic = useSyncExternalStore(subscribe, snapshot, () => false);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      track.current?.scrollTo({ left: 0, behavior: 'instant' });
      setActive(0);
    });
    return () => cancelAnimationFrame(frame);
  }, [cinematic]);

  const move = (direction) => {
    const next = Math.max(0, Math.min(3, active + direction));
    setActive(next);
    track.current?.scrollTo({
      left: next * track.current.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section ref={ref} id="servicios" className={`services-window ${cinematic ? 'is-cinematic' : ''}`}>
      <div className="services-sticky">
        <ChapterBackdrop variant="dots" label="02" />
        <div className="services-heading">
          <p className="chapter-kicker">
            02 / LO QUE CONSTRUIMOS <span>TECNOLOGÍA CON DIRECCIÓN</span>
          </p>
          <h2>
            La solución cambia.<br />
            <em>El compromiso, no.</em>
          </h2>
          <p className="services-hint">
            {cinematic ? 'Seguí bajando para explorar' : 'Deslizá para explorar los servicios'}{' '}
            <ArrowRight size={16} aria-hidden="true" />
          </p>
        </div>

        <div
          className="services-viewport"
          ref={track}
          role="region"
          aria-label="Nuestros cuatro servicios"
          tabIndex={cinematic ? undefined : 0}
          onScroll={
            cinematic
              ? undefined
              : (event) => setActive(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))
          }
        >
          <Motion.div
            key={cinematic ? 'cinematic' : 'native'}
            className="services-track"
            style={cinematic ? { x } : {}}
          >
            {products.map((product, index) => (
              <article className="service-panel" key={product.category}>
                <div className="service-text">
                  <span className="service-number">
                    0{index + 1} <small>/ 04</small>
                  </span>
                  <p className="service-category">{product.category}</p>
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                  <ul>
                    {product.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <ServiceVisual
                  kind={product.visual}
                  icon={<product.icon size={40} strokeWidth={1} />}
                  mascot={product.mascot}
                  title={product.title}
                  chips={product.chips}
                />
              </article>
            ))}
          </Motion.div>
        </div>

        {cinematic ? (
          <div className="service-progress" aria-hidden="true">
            <Motion.span style={{ scaleX: scrollYProgress }} />
          </div>
        ) : (
          <div className="service-controls">
            <span aria-live="polite">0{active + 1} / 04</span>
            <button onClick={() => move(-1)} disabled={active === 0} aria-label="Servicio anterior">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => move(1)} disabled={active === 3} aria-label="Servicio siguiente">
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
