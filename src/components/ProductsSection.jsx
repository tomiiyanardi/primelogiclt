import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Blocks, Braces, Database, Workflow, Sparkles, Layers3, Check } from 'lucide-react';

const services = [
  {
    kicker: 'Productos digitales a tu medida',
    title: ['Software', 'a medida'],
    text: 'Aplicaciones web, móviles y sistemas que convierten una operación compleja en una experiencia clara, rápida y preparada para crecer.',
    bullets: ['Web apps y aplicaciones móviles', 'Paneles de gestión y reportes', 'Sistemas pensados para tu operación'],
    color: 'var(--blue)',
    value: 'software',
  },
  {
    kicker: 'Menos tareas, más posibilidades',
    title: ['Automatización'],
    text: 'Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo se enfoque en aportar valor real.',
    bullets: ['Procesos conectados de punta a punta', 'Integraciones con los sistemas que ya usás', 'Reportes que se arman solos'],
    color: 'var(--cyan)',
    value: 'automation',
  },
  {
    kicker: 'Inteligencia aplicada a tu negocio',
    title: ['IA', 'aplicada'],
    text: 'IA generativa y análisis predictivo para potenciar decisiones y transformar información en nuevas oportunidades.',
    bullets: ['Asistentes con IA para tu equipo', 'Análisis predictivo', 'Datos convertidos en decisiones'],
    color: 'var(--violet)',
    value: 'ai',
  },
  {
    kicker: 'Una base sólida, un futuro abierto',
    title: ['Consultoría'],
    text: 'Acompañamiento técnico para priorizar, modernizar y sostener una plataforma que crezca con tu empresa.',
    bullets: ['Arquitectura escalable', 'Modernización de sistemas', 'Soporte y evolución continua'],
    color: 'var(--magenta)',
    value: 'consulting',
  },
];

/** Marks the service in the contact form so the visitor doesn't have to pick it again. */
const pickService = (value) => {
  const input = document.querySelector(`input[name="projectType"][value="${value}"]`);
  if (input) input.checked = true;
};

const diagrams = [
  { icon: Braces, nodes: ['Experiencia', 'Lógica', 'Datos'], caption: 'UNA SOLUCIÓN. TODAS LAS PIEZAS CONECTADAS.', path: 'M80 110 H360', mode: 'software' },
  { icon: Workflow, nodes: ['Conectar', 'Automatizar', 'Resolver'], caption: 'MENOS FRICCIÓN ENTRE UN PASO Y EL SIGUIENTE.', path: 'M80 110 H180 Q220 110 220 70 V50 H360 M220 110 V170 H360', mode: 'automation' },
  { icon: Sparkles, nodes: ['Información', 'Inteligencia', 'Decisiones'], caption: 'EL VALOR ESTÁ EN LO QUE HACÉS CON TUS DATOS.', path: 'M80 50 L220 110 L360 50 M80 170 L220 110 L360 170', mode: 'ai' },
  { icon: Layers3, nodes: ['Diagnóstico', 'Arquitectura', 'Evolución'], caption: 'UNA BASE PREPARADA PARA LO QUE VIENE.', path: 'M80 150 L220 70 L360 150 M80 170 L220 90 L360 170', mode: 'consulting' },
];

function SolutionDiagram({ index, reduced }) {
  const diagram = diagrams[index];
  const Icon = diagram.icon;
  return <div className={`solution-diagram diagram-${diagram.mode}`} aria-hidden="true">
    <div className="diagram-meta"><span>PL / SOLUTION MAP</span><span>0{index + 1} — 04</span></div>
    <svg viewBox="0 0 440 220" preserveAspectRatio="xMidYMid meet"><path className="diagram-guide" d={diagram.path} /><Motion.path d={diagram.path} initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} /></svg>
    <div className="diagram-nodes">{diagram.nodes.map((node, i) => <Motion.div key={node} className={`diagram-node node-${i}`} initial={reduced ? false : { opacity: 0, y: 18, scale: .85 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * .12, duration: .5 }}><span>{i === 1 ? <Icon size={30} strokeWidth={1.2} /> : i === 0 ? <Blocks size={22} strokeWidth={1.2} /> : <Database size={22} strokeWidth={1.2} />}</span><small>{node}</small></Motion.div>)}</div>
    <p>{diagram.caption}</p>
  </div>;
}

const sceneQuery = '(min-height: 640px) and (min-width: 320px) and (prefers-reduced-motion: no-preference)';
function subscribeScenes(callback) {
  const media = window.matchMedia(sceneQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function ProductsSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const buttons = useRef([]);
  const section = useRef(null);
  const stage = useRef(null);
  const pinned = useSyncExternalStore(subscribeScenes, () => window.matchMedia(sceneQuery).matches, () => false);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const phase = useTransform(scrollYProgress, value => Math.min(3, Math.floor(value * 4)));
  useMotionValueEvent(phase, 'change', value => { if (pinned) setActive(value); });
  useEffect(() => {
    if (!pinned) return undefined;
    const frame = requestAnimationFrame(() => setActive(phase.get()));
    return () => cancelAnimationFrame(frame);
  }, [pinned, phase]);
  const service = services[active];
  const choose = index => {
    if (pinned && section.current) {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      const runway = section.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + runway * ((index + .35) / services.length), behavior: 'smooth' });
    } else setActive(index);
    buttons.current[index]?.focus({ preventScroll: true });
  };
  return <section ref={section} id="servicios" className={`section solutions-section ${pinned ? 'is-pinned' : ''}`}>
    <div ref={stage} className="wrap solutions-stage">
      <header className="solutions-heading"><div><p className="eyebrow">02 / CAPACIDADES QUE SE CONECTAN</p><h2 className="display">Cuatro formas de hacer<br />avanzar tu negocio.</h2></div><p>El punto de partida es tu desafío.<br />La tecnología viene después.</p></header>
      <div className="solution-workspace" style={{ '--solution-accent': ['#63b5ff', '#50d6df', '#c69be0', '#f58eb4'][active] }}>
        <div className="solution-tabs" role="tablist" aria-label="Explorá nuestros servicios">
          {services.map((item, index) => <button ref={node => { buttons.current[index] = node; }} key={item.value} id={`solution-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="solution-detail" tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
            const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % 4 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
            if (next !== null) { event.preventDefault(); choose(next); }
          }}><span className="solution-tab-number">0{index + 1}</span><span>{item.title.join(' ')}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}
          <div className="solution-tabs-note" aria-hidden="true"><span className="signal-dot" /> TU NEGOCIO EN EL CENTRO</div>
        </div>
        <div id="solution-detail" className="solution-detail" role="tabpanel" aria-labelledby={`solution-tab-${active}`} tabIndex={0}>
          <AnimatePresence mode="wait" initial={false}><Motion.div className="solution-scene" key={service.value} initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: reduced ? 0 : -20 }} transition={{ duration: .22 }}>
            <SolutionDiagram index={active} reduced={reduced} />
            <div className="solution-copy"><p className="solution-kicker">{service.kicker}</p><h3>{service.title.join(' ')}</h3><p>{service.text}</p><ul>{service.bullets.map(bullet => <li key={bullet}><Check size={15} aria-hidden="true" />{bullet}</li>)}</ul><div className="solution-actions"><a className="pill pill-light" href="#contacto" onClick={() => pickService(service.value)}>Quiero este servicio <ArrowUpRight size={16} aria-hidden="true" /></a><a className="link-under" href="#proyectos">Ver proyectos →</a></div></div>
          </Motion.div></AnimatePresence>
        </div>
      </div>
      <div className="solutions-navigation">
        <span>{pinned ? 'SEGUÍ BAJANDO PARA EXPLORAR' : 'ELEGÍ UNA SOLUCIÓN'}</span>
        <span aria-live="polite">0{active + 1} / 04</span>
        {pinned && <div className="solutions-scroll-progress" aria-hidden="true"><Motion.span style={{ scaleX: scrollYProgress }} /></div>}
      </div>
    </div>
  </section>;
}
