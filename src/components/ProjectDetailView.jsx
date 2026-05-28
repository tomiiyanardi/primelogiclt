import React from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code2, Globe } from "lucide-react";

export default function ProjectDetailView({ title, category, time, image, description, features, link, onBack }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.98 }} 
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} 
      className="relative min-h-[100dvh] flex flex-col items-center bg-black/40 px-4 md:px-8 pt-32 md:pt-40 pb-12 overflow-y-auto overflow-x-hidden backdrop-blur-[2px]"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col relative z-10">
        
        {/* ENCABEZADO DE BOTONES ACCIONABLES */}
        <div className="mb-8 md:mb-12 w-full flex justify-between items-center flex-wrap gap-4">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 bg-[#0074D9]/20 hover:bg-[#0074D9]/40 border border-[#0074D9]/50 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(0,116,217,0.3)]"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#00E5FF] transform group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
            Volver a Proyectos
          </button>

          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 bg-[#0074D9] hover:bg-[#005bb5] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#0074D9]/30 hover:shadow-[0_0_20px_rgba(0,116,217,0.5)]"
            >
              Visitar Sitio <Globe className="w-4 h-4 text-[#00E5FF] transform group-hover:rotate-12 transition-transform duration-300" />
            </a>
          )}
        </div>

        {/* METADATA */}
        <div className="mb-8 md:mb-12">
          <span className="inline-block px-3 py-1.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black tracking-widest uppercase rounded-full border border-[#0074D9]/30 text-[#00E5FF] mb-4 bg-[#0074D9]/10 shadow-[0_0_15px_rgba(0,116,217,0.2)]">
            {category}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4 md:mb-6">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-white/80 font-bold text-xs md:text-sm uppercase tracking-widest">
            <Clock size={16} className="text-[#0074D9]"/> Tiempo de desarrollo: <span className="text-white">{time}</span>
          </div>
        </div>

        {/* IMAGEN DEL PROYECTO */}
        <div className="w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/20 mb-12 md:mb-16 relative aspect-video">
          <img src={image} alt={`Captura de pantalla de ${title}`} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent opacity-60"></div>
        </div>

        {/* DETALLES */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start pb-20">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tighter">Sobre el proyecto</h3>
            <p className="text-white/80 text-sm md:text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>
          <div className="bg-[#0A192F]/60 backdrop-blur-xl rounded-[1.5rem] p-6 md:p-10 border border-white/10 shadow-2xl">
            <h3 className="text-lg md:text-2xl font-black text-white mb-6 tracking-tighter flex items-center gap-2">
              <Code2 className="text-[#00E5FF]"/> Características & Tecnologías
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 md:gap-4 group">
                  <div className="mt-0.5 text-[#00E5FF] group-hover:scale-125 transition-transform duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-white/80 font-semibold text-xs md:text-base leading-snug group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}