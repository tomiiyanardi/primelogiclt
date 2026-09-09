import React from 'react';
import { motion } from 'framer-motion';
import { RevealGroup, RevealText, revealItem } from '../utils/animations';

const ProductsSection = () => {
  const products = [
    { 
      name: "Aplicaciones Web", 
      desc: "Soluciones a medida accesibles desde el navegador para optimizar tu presencia y operativas diarias, asegurando rendimiento y escalabilidad." 
    },
    { 
      name: "Aplicaciones Móviles", 
      desc: "Desarrollo nativo o multiplataforma para conectar con tus usuarios en cualquier dispositivo y lugar." 
    },
    { 
      name: "Desarrollo de Sistema a Medida", 
      desc: "Software diseñado y construido específicamente para adaptarse a los flujos y procesos únicos de tu negocio." 
    },
    { 
      name: "IT Outsourcing", 
      desc: "Ampliamos tu capacidad técnica con profesionales capacitados que se integran de manera transparente a tu equipo." 
    },
    { 
      name: "Guía y Consultoría IT", 
      desc: "Asesoramiento estratégico para tomar las mejores decisiones tecnológicas y planificar el futuro de tu infraestructura." 
    },
    { 
      name: "Automatización de Sistemas", 
      desc: "Reducción de tareas manuales repetitivas mediante scripts y flujos automatizados para ahorrar tiempo y recursos." 
    },
    { 
      name: "Integración de Sistemas e IA", 
      desc: "Conectamos tus diferentes plataformas y sumamos agentes inteligentes (IA) para maximizar el valor de tus datos." 
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
            {products.map((product, index) => (
              <motion.div key={index} variants={revealItem} className="flex flex-col">
                <h3 className="text-xl font-bold text-brand-black mb-3 border-b-2 border-brand-blue pb-2 inline-block w-fit">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.desc}
                </p>
              </motion.div>
            ))}
          </RevealGroup>

          <div className="hidden lg:flex w-1/3 justify-center sticky top-32">
            {/* Personaje Products */}
            <motion.img 
              src="/Personaje3.png" 
              alt="Personaje mostrando soluciones tecnológicas" 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-2xl mix-blend-multiply cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
