import { revealItem } from '../utils/motionVariants';
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { RevealGroup, RevealText } from '../utils/animations';

const AboutSection = () => {
  return (
    <section id="nosotros" className="min-h-screen py-20 flex flex-col justify-center bg-transparent">
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
            {/* Ambient backdrop glow */}
            <div className="absolute inset-4 bg-brand-blue/10 rounded-[3rem] blur-2xl -z-10 transform -rotate-1"></div>
            <div className="absolute inset-0 bg-brand-blue/5 rounded-[3rem] -z-10 transform -rotate-2 scale-105 border border-brand-blue/10"></div>
            
            <Motion.div
              
              
              className="relative flex items-center justify-center"
            >
              <picture>
                <source srcSet="/mascota-laptop.webp" type="image/webp" />
                <img
                  src="/mascota-laptop.webp" width="768" height="1024" decoding="async"
                  alt="Primelogic Tech Mascot"
                  className="h-[22rem] sm:h-[28rem] lg:h-[32rem] w-auto max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(15,23,42,0.18)]"
                  loading="lazy"
                />
              </picture>

              {/* Floating tech badge */}
              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-2 bg-white/95 backdrop-blur-md border border-brand-blue/20 shadow-xl shadow-brand-blue/10 rounded-2xl p-3.5 flex items-center gap-3 select-none"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black text-sm">
                  PL
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-xs font-bold text-brand-black">100% Desarrollo Propio</p>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">Arquitectura & IA a medida</p>
                </div>
              </Motion.div>
            </Motion.div>
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


