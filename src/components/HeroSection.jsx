import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-brand-white text-brand-black flex flex-col justify-center items-center pt-20 px-8 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center relative">
        
        {/* INYECTAR_IMAGEN_AQUI: Personaje o asset del Hero (ej. mascota 3D flotando) */}
        <div className="absolute -top-10 -right-4 md:-right-16 lg:-right-32 w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-brand-blue/30 rounded-2xl flex items-center justify-center opacity-60">
          <span className="text-[10px] md:text-xs text-brand-blue font-bold text-center">Placeholder<br/>Personaje</span>
        </div>

        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/logo.svg" 
          alt="Primelogic LT Logo" 
          className="w-32 md:w-40 h-auto mb-10"
        />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-brand-blue"
        >
          Primelogic LT
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light"
        >
          Transformando ideas en realidades tecnológicas. Somos tu socio estratégico en innovación, desarrollo y automatización.
        </motion.p>
      </div>
      
      {/* Subtle modern background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-blue/[0.03] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
