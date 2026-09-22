import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Bot, Code2, Compass, BrainCircuit } from 'lucide-react';
import { RevealGroup, RevealText, revealItem } from '../utils/animations';

const ProductsSection = () => {
  const products = [
    { 
      name: "Productos digitales",
      desc: "Aplicaciones web, móviles y sistemas a medida que convierten una operación compleja en una experiencia clara, rápida y escalable.",
      icon: Code2,
    },
    { 
      name: "Automatización e integración",
      desc: "Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo se enfoque en aportar valor real.",
      icon: Bot,
    },
    { 
      name: "Inteligencia Artificial",
      desc: "Implementamos soluciones de IA generativa y análisis predictivo para potenciar la toma de decisiones y crear ventajas competitivas.",
      icon: BrainCircuit,
    },
    { 
      name: "Consultoría y evolución",
      desc: "Acompañamiento técnico constante para priorizar, modernizar y sostener una plataforma que crezca orgánicamente con tu empresa.",
      icon: Compass,
    },
  ];

  return (
    <section id="servicios" className="min-h-screen py-20 flex flex-col justify-center bg-white/40 backdrop-blur-sm border-y border-gray-200/50 relative">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/5 to-transparent pointer-events-none overflow-hidden"></div>
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Nuestros Servicios</h2>
          <RevealText className="text-4xl lg:text-5xl font-extrabold text-brand-black" delay={0.1}>
            Soluciones Tecnológicas Integrales
          </RevealText>
        </div>

        <RevealGroup className="flex flex-col space-y-8" delay={0.12}>
          {products.map((product) => (
            <Motion.div key={product.name} variants={revealItem} className="flex items-start gap-6 group cursor-pointer max-w-4xl">
              <div className="flex-shrink-0 mt-1">
                <product.icon className="h-8 w-8 text-gray-400 group-hover:text-brand-blue transition-colors duration-300" aria-hidden="true" />
              </div>
              <div className="border-b border-gray-200 pb-6 w-full group-hover:border-brand-blue/30 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-brand-black mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-500 font-light text-lg leading-relaxed">
                  {product.desc}
                </p>
              </div>
            </Motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default ProductsSection;
