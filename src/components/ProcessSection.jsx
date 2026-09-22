import React from 'react';
import { ArrowRight, Compass, Hammer, Search, Sparkles } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { RevealText } from '../utils/animations';

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

const ProcessSection = () => {
  return (
    <section id="proceso" className="min-h-screen py-20 flex flex-col justify-center border-y border-gray-200/50 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-blue">Cómo trabajamos</p>
          <RevealText className="text-4xl font-extrabold leading-tight text-brand-black md:text-5xl" delay={0.1}>
            Claridad antes que complejidad
          </RevealText>
          <p className="mt-5 text-lg font-light leading-relaxed text-gray-600">
            Cada proyecto empieza por entender el negocio y termina con una solución que el equipo puede usar, medir y hacer evolucionar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 border-l border-gray-200 md:grid-cols-4 md:border-l-0 md:border-t">
          {steps.map((step, index) => (
            <Motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative border-b border-r border-gray-200 py-8 pl-7 pr-6 last:border-b-0 md:min-h-64 md:border-b-0 md:pl-6 md:pt-8"
            >
              <div className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full border-2 border-brand-white bg-brand-blue md:-top-[5px] md:left-6" />
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.2em] text-brand-blue">{step.number}</span>
                <step.icon className="h-5 w-5 text-brand-blue transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-black">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </Motion.article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-brand-blue">
          <span className="h-px w-10 bg-brand-blue" aria-hidden="true" />
          Un proceso pensado para avanzar con criterio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;