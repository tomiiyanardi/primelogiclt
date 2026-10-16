import { useRef } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Search, Compass, Hammer, Sparkles } from 'lucide-react';
import ChapterBackdrop from './ChapterBackdrop';

const steps = [
  {
    number: '01',
    title: 'Entender',
    description: 'Mapeamos el problema real, el contexto del negocio y las oportunidades que vale la pena priorizar.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Diseñar',
    description: 'Convertimos esa información en una solución clara, viable y alineada con tus objetivos.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Construir',
    description: 'Desarrollamos, integramos y validamos cada parte para que la tecnología funcione en la operación diaria.',
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Evolucionar',
    description: 'Medimos lo que cambia y acompañamos las siguientes mejoras para que la solución siga creciendo.',
    icon: Sparkles,
  },
];

export default function ProcessSection() {
  const reduced = useReducedMotion();

  return (
    <section id="proceso" className="min-h-screen py-20 flex flex-col justify-center relative isolate">
      <ChapterBackdrop variant="iso" label="03" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-1">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: '#00d4ff' }}>
            03 / Cómo trabajamos
          </p>
          <h2>
            <Motion.span
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: 0.1 }}
              className="inline-block text-4xl font-extrabold leading-tight text-white md:text-5xl"
            >
              Claridad antes que complejidad
            </Motion.span>
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,.45)' }}>
            Cada proyecto empieza por entender el negocio y termina con una solución que el equipo puede usar, medir y hacer evolucionar.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <Motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="process-step group"
            >
              <div className="process-dot" />
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#00d4ff' }}>{step.number}</span>
                <step.icon
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: '#00d4ff' }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>{step.description}</p>
            </Motion.article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm font-semibold" style={{ color: '#00d4ff' }}>
          <span className="h-px w-10" style={{ background: '#00d4ff' }} aria-hidden="true" />
          Un proceso pensado para avanzar con criterio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
