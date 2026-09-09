import React from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../utils/animations';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-brand-white text-brand-black flex flex-col justify-center items-center pt-20 px-8 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center relative">
        
        {/* Personaje animado inyectado */}
        <motion.img 
          src="/Personaje1.png" 
          alt="Personaje Hero" 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 } 
          }}
          className="absolute -top-36 -right-10 md:-right-32 lg:-right-56 w-64 md:w-80 lg:w-[30rem] h-auto drop-shadow-xl z-20 mix-blend-multiply"
        />

        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/logo.svg" 
          alt="Primelogic LT Logo" 
          className="w-32 md:w-40 h-auto mb-10"
        />
        <RevealText className="text-5xl md:text-7xl font-black mb-6 tracking-tight" delay={0.2}>
          Primelogic LT
        </RevealText>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light"
        >
          Transformando ideas en realidades tecnológicas. Somos tu socio estratégico en innovación, desarrollo y automatización.
        </motion.p>
      </div>
      
      <div className="hero-signal absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <span className="signal-node signal-node-one"></span>
        <span className="signal-node signal-node-two"></span>
        <span className="signal-node signal-node-three"></span>
        <span className="signal-line signal-line-one"></span>
        <span className="signal-line signal-line-two"></span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-blue/[0.03] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
