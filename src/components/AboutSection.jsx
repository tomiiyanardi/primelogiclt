import React from 'react';
import { motion as Motion } from 'framer-motion';
import { RevealGroup, RevealText, revealItem } from '../utils/animations';

const AboutSection = () => {
  return (
    <section id="nosotros" className="min-h-screen flex flex-col justify-center py-24 bg-brand-white">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1 relative w-full min-h-[24rem] sm:min-h-[30rem] items-center"
          >
            <div className="absolute inset-0 bg-brand-blue/5 rounded-[3rem] -z-10 transform -rotate-2 scale-105"></div>
            
            <Motion.img
              src="/about-char.png"
              alt="Especialista desarrollando una solución desde su computadora"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="h-[24rem] sm:h-[30rem] w-auto max-w-full object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </Motion.div>

          {/* Text Content */}
          <Motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex-1 order-1 lg:order-2 space-y-12"
          >
            <div>
              <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Quiénes Somos?</h2>
              <RevealText className="text-4xl font-extrabold text-brand-black mb-6" delay={0.1}>
                El motor detrás de la lógica
              </RevealText>
              <Motion.p variants={revealItem} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="text-lg text-gray-600 font-light leading-relaxed">
                Somos dos amigos con ganas de potenciar negocios reales a través de la tecnología. Nos apasiona involucrarnos profundamente en los desafíos de cada cliente para diseñar y construir la infraestructura exacta que necesitan para escalar. No buscamos ser un proveedor más; nos convertimos en el engranaje tecnológico de tu equipo.
              </Motion.p>
            </div>

            <RevealGroup className="space-y-10" delay={0.15}>
              <Motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl hover:bg-brand-blue/5 transition-colors">
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Misión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Implementar, desarrollar, y soportar sistemas e infraestructuras de IT para solucionar y/o ayudar a clientes a que el negocio mejore. Sumergiéndonos en el mismo como si fuese propio, compartiendo el mismo interés de beneficios.
                </p>
              </Motion.div>

              <Motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl hover:bg-brand-blue/5 transition-colors">
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Visión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Ser referencia regional de sistemas de alta calidad, donde seamos conocidos por implementar soluciones innovadoras, y poder solucionar problemas tecnológicos complejos.
                </p>
              </Motion.div>
            </RevealGroup>

          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
