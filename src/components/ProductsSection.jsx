import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Bot, Code2, Compass } from 'lucide-react';
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
      desc: "Conectamos tus herramientas, eliminamos tareas repetitivas y sumamos IA donde realmente aporta valor al negocio.",
      icon: Bot,
    },
    { 
      name: "Consultoría y evolución",
      desc: "Acompañamiento técnico para priorizar, modernizar y sostener una plataforma que crezca con tu empresa.",
      icon: Compass,
    },
  ];

  return (
    <section id="servicios" className="min-h-screen flex flex-col justify-center py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Nuestros Servicios</h2>
          <RevealText className="text-4xl font-extrabold text-brand-black" delay={0.1}>
            Soluciones Tecnológicas Integrales
          </RevealText>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <RevealGroup className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16" delay={0.12}>
            {products.map((product) => (
              <Motion.div key={product.name} variants={revealItem} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/5">
                <product.icon className="mb-5 h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="text-xl font-bold text-brand-black mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.desc}
                </p>
              </Motion.div>
            ))}
          </RevealGroup>

          <div className="hidden lg:flex w-1/3 justify-center sticky top-32 min-h-[30rem] items-center">
            <Motion.img
              src="/products-char.png"
              alt="Especialista trabajando en una solución digital"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="h-[30rem] w-auto max-w-full object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
