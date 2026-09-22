import React from 'react';
import { motion as Motion } from 'framer-motion';
import { RevealGroup, RevealText, revealItem } from '../utils/animations';

const OfferingsSection = () => {
  return (
    <section id="ofrecemos" className="min-h-screen py-20 flex flex-col justify-center bg-transparent relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(29,78,216,0.05)_0,transparent_60%)] pointer-events-none overflow-hidden" />
      <div className="max-w-6xl w-full mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Qué Ofrecemos?</h2>
          <RevealText className="text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight max-w-4xl mx-auto" delay={0.1}>
            Tu éxito es nuestro objetivo principal
          </RevealText>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-12" delay={0.16}>
          <Motion.div variants={revealItem} whileHover={{ y: -5 }} className="relative transition-transform duration-300 text-center">
            <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-4">Optimización Real</h3>
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              Queremos que nuestros clientes ganen plata o tiempo automatizando procesos clave de su negocio.
            </p>
          </Motion.div>
          <Motion.div variants={revealItem} whileHover={{ y: -5 }} className="relative transition-transform duration-300 text-center">
            <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-4">Beneficio Mutuo</h3>
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              Si nuestros clientes ganan, nosotros también. Nuestra mayor satisfacción es el éxito y crecimiento de nuestros clientes.
            </p>
          </Motion.div>
          <Motion.div variants={revealItem} whileHover={{ y: -5 }} className="relative transition-transform duration-300 text-center">
            <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-4">Compromiso Total</h3>
            <p className="text-gray-500 leading-relaxed font-light text-lg">
              Tenemos el mismo compromiso. Nosotros queremos tanto como el cliente alcanzar la mejor versión de sus proyectos y sistemas.
            </p>
          </Motion.div>
        </RevealGroup>
      </div>
    </section>
  );
};

export default OfferingsSection;
