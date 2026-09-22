import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <header id="inicio" className="relative z-[60] h-[calc(100svh-5rem)] min-h-[450px] flex flex-col justify-center items-center bg-transparent">
      {/* Fondo minimalista */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.02)_0,transparent_50%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        <Motion.img
          src="/logo.svg"
          alt="Primelogic LT"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 sm:h-16 md:h-20 w-auto object-contain mb-4 drop-shadow-sm"
        />

        <Motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight leading-tight max-w-2xl"
        >
          Ingeniería digital para negocios que quieren avanzar
        </Motion.h1>

        <Motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-sm md:text-base text-gray-500 font-medium uppercase tracking-[0.2em] leading-relaxed max-w-xl"
        >
          Automatización, software y evolución tecnológica
        </Motion.p>

        <Motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7 }} 
          className="mt-12 flex flex-col sm:flex-row items-center gap-8"
        >
          <Link to="/#contacto" className="group flex items-center justify-center gap-3 bg-brand-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/30 transition-all duration-300">
            Iniciar un proyecto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link to="/#clientes" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-blue transition-all group flex items-center gap-2">
            Ver casos de éxito <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </Motion.div>
      </div>
    </header>
  );
};

export default HeroSection;