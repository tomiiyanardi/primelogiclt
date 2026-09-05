import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-brand-white text-brand-black flex flex-col justify-center items-center pt-20 px-8 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center relative">
        
        {/* Personaje animado inyectado */}
        <motion.img 
          src="/hero-char.png" 
          alt="Personaje Hero" 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 } 
          }}
          className="absolute -top-32 -right-4 md:-right-24 lg:-right-40 w-40 md:w-56 lg:w-72 h-auto drop-shadow-xl z-20 mix-blend-multiply"
        />

        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/logo.svg" 
          alt="Primelogic LT Logo" 
          className="w-32 md:w-40 h-auto mb-10"
        />
        <motion.h1 
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
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
