import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

const steps = [
  {
    title: 'Entender',
    text: 'Mapeamos el problema real, el contexto del negocio y las oportunidades que vale la pena priorizar.',
    tags: ['Entrevistas', 'Diagnóstico', 'Prioridades'],
    color: 'var(--violet)',
  },
  {
    title: 'Diseñar',
    text: 'Convertimos esa información en una solución clara: prototipamos y validamos con personas reales antes de construir.',
    tags: ['UX/UI', 'Prototipos', 'Validación'],
    color: 'var(--ochre)',
  },
  {
    title: 'Construir',
    text: 'Desarrollamos, integramos y probamos cada parte para que la tecnología funcione en la operación diaria.',
    tags: ['Desarrollo', 'Integraciones', 'Pruebas'],
    color: 'var(--magenta)',
  },
  {
    title: 'Evolucionar',
    text: 'Medimos lo que cambia y acompañamos las siguientes mejoras para que la solución siga creciendo.',
    tags: ['Métricas', 'Soporte', 'Mejoras'],
    color: 'var(--cyan)',
  },
];

/** A circle with its label written along the bottom edge. */
function Bubble({ step, index, onOpen }) {
  return (
    <button type="button" className={`bubble bubble-${index}`} style={{ '--c': step.color }} onClick={(event) => onOpen(index, event.currentTarget)}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={`arc-${index}`} d="M 32 108 A 68 68 0 0 0 168 108" />
        </defs>
        <text>
          <textPath href={`#arc-${index}`} startOffset="50%" textAnchor="middle">{step.title}</textPath>
        </text>
      </svg>
      <span className="sr-only">Ver la etapa {step.title}</span>
    </button>
  );
}

export default function ProcessSection() {
  const reduced = useReducedMotion();
  const section = useRef(null);
  const closeButton = useRef(null);
  const [open, setOpen] = useState(null);

  const openStep = (index, origin) => {
    const box = section.current.getBoundingClientRect();
    const dot = origin?.getBoundingClientRect();
    setOpen({
      index,
      x: dot ? dot.left + dot.width / 2 - box.left : box.width / 2,
      y: dot ? dot.top + dot.height / 2 - box.top : box.height / 2,
      r: dot ? dot.width / 2 : 0,
    });
  };

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);

  const step = open ? steps[open.index] : null;
  const from = open ? `circle(${open.r}px at ${open.x}px ${open.y}px)` : undefined;
  const to = open ? `circle(150% at ${open.x}px ${open.y}px)` : undefined;

  return (
    <section
      id="proceso"
      ref={section}
      className="process"
      onKeyDown={(event) => event.key === 'Escape' && setOpen(null)}
    >
      <span className="process-ring ring-a" aria-hidden="true" />
      <span className="process-ring ring-b" aria-hidden="true" />

      <div className="process-copy">
        <p className="eyebrow eyebrow-dark">Nuestro proceso</p>
        <h2 className="display display-dark">Trabajo de punta a punta</h2>
        <p>Negocio, diseño y desarrollo trabajando juntos desde el primer día. Tocá cada círculo para conocer cómo lo hacemos.</p>
      </div>

      <div className="bubbles">
        {steps.map((s, index) => <Bubble key={s.title} step={s} index={index} onOpen={openStep} />)}
      </div>

      <AnimatePresence>
        {step && (
          <Motion.div
            key="panel"
            className="process-panel"
            style={{ '--c': step.color }}
            role="dialog"
            aria-modal="false"
            aria-label={`Etapa ${step.title}`}
            initial={reduced ? { opacity: 0 } : { clipPath: from }}
            animate={reduced ? { opacity: 1 } : { clipPath: to }}
            exit={reduced ? { opacity: 0 } : { clipPath: from }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="panel-outline top" aria-hidden="true"><span>{`${step.title} · `.repeat(8)}</span></div>
            <div className="panel-outline bottom" aria-hidden="true"><span>{`${step.title} · `.repeat(8)}</span></div>

            <button ref={closeButton} type="button" className="panel-close" onClick={() => setOpen(null)} aria-label="Cerrar">
              <X size={22} />
            </button>

            <AnimatePresence mode="wait">
              <Motion.div
                key={open.index}
                className="panel-content"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="panel-kicker"><span>0{open.index + 1}</span> Nuestro proceso</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ul>
                  {step.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </Motion.div>
            </AnimatePresence>

            <div className="panel-pager" role="group" aria-label="Etapas">
              {steps.map((s, index) => (
                <button
                  key={s.title}
                  type="button"
                  aria-current={index === open.index ? 'step' : undefined}
                  onClick={() => setOpen({ ...open, index })}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
