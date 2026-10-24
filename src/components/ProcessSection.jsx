import { useRef, useState } from 'react';
import { motion as Motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Search, PenTool, Code2, TrendingUp, ArrowDownRight } from 'lucide-react';
const steps = [
  {
    title: 'Entender',
    text: 'Mapeamos el problema real, el contexto del negocio y las oportunidades que vale la pena priorizar.',
    tags: ['Entrevistas', 'Diagnóstico', 'Prioridades'],
    color: '#132e4c',
  },
  {
    title: 'Diseñar',
    text: 'Convertimos esa información en una solución clara: prototipamos y validamos con personas reales antes de construir.',
    tags: ['UX/UI', 'Prototipos', 'Validación'],
    color: 'var(--blue)',
  },
  {
    title: 'Construir',
    text: 'Desarrollamos, integramos y probamos cada parte para que la tecnología funcione en la operación diaria.',
    tags: ['Desarrollo', 'Integraciones', 'Pruebas'],
    color: '#0f72ad',
  },
  {
    title: 'Evolucionar',
    text: 'Medimos lo que cambia y acompañamos las siguientes mejoras para que la solución siga creciendo.',
    tags: ['Métricas', 'Soporte', 'Mejoras'],
    color: 'var(--cyan)',
  },
];

const icons = [Search, PenTool, Code2, TrendingUp];

function ProcessMilestone({ step, index, onActive, reduced }) {
  const Icon = icons[index];
  return <Motion.article className="journey-step" id={`etapa-${index + 1}`} initial={reduced ? false : { opacity: .25, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .55 }} transition={{ duration: .65 }} onViewportEnter={() => onActive(index)}>
    <span className="journey-pin" aria-hidden="true">0{index + 1}</span>
    <div className="journey-step-top"><span>ETAPA / 0{index + 1}</span><Icon size={26} strokeWidth={1.2} aria-hidden="true" /></div>
    <h3>{step.title}</h3><p>{step.text}</p><ul>{step.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    <span className="journey-next" aria-hidden="true">{['Entender antes de proponer.', 'Validar antes de construir.', 'Construir para la vida real.', 'Crecer, medir y volver a mejorar.'][index]}<ArrowDownRight size={18} /></span>
  </Motion.article>;
}

export default function ProcessSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (value <= .02) setActive(0);
    else if (value >= .98) setActive(3);
  });
  return <section id="proceso" ref={ref} className="journey-section">
    <div className="wrap journey-layout">
      <header className="journey-intro"><p className="eyebrow eyebrow-dark">03 / UNA DIRECCIÓN COMPARTIDA</p><h2 className="display display-dark">Trabajo de<br />punta a punta.</h2><p>Negocio, diseño y desarrollo trabajando juntos desde el primer día.</p>
        <div className="journey-map" aria-hidden="true"><svg viewBox="0 0 320 180"><path className="journey-map-base" d="M20 140 H80 Q110 140 110 110 V70 Q110 40 140 40 H210 Q240 40 240 70 V110 Q240 140 270 140 H300" /><Motion.path className="journey-map-progress" style={{ pathLength: reduced ? 1 : scrollYProgress }} d="M20 140 H80 Q110 140 110 110 V70 Q110 40 140 40 H210 Q240 40 240 70 V110 Q240 140 270 140 H300" />{[[20,140],[110,70],[210,40],[300,140]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i===active ? 8 : 4} className={i<=active ? 'is-reached' : ''} />)}</svg><span>DE LA PREGUNTA A LO QUE SIGUE.</span></div>
        <nav className="journey-index" aria-label="Etapas del proceso">{steps.map((step,index) => <a key={step.title} href={`#etapa-${index+1}`} aria-current={index===active ? 'step' : undefined}><span>0{index+1}</span>{step.title}<span className="journey-index-dot" /></a>)}</nav>
        <span className="journey-footnote">Cada proyecto tiene su camino.<br />El compromiso se mantiene en cada etapa.</span>
      </header>
      <div className="journey-timeline"><div className="journey-rail" aria-hidden="true"><Motion.span style={{ scaleY: reduced ? 1 : scrollYProgress }} /></div>{steps.map((step,index) => <ProcessMilestone key={step.title} step={step} index={index} onActive={setActive} reduced={reduced} />)}</div>
    </div>
  </section>;
}
