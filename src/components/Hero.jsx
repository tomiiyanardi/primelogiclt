import React from 'react';
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, MapPin } from "lucide-react";

export default function Hero({ heroScale, heroTextY, heroTextOpacity, isFirstVisit, onOpenEstimator, navigateTo }) {
  return (
    <section id="inicio" className="relative h-[100dvh] max-h-[100dvh] w-full snap-start flex flex-col justify-between overflow-hidden bg-[#0A192F]">
      
      {/* VIDEO DE FONDO */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }} 
        animate={{ opacity: 1, scale: 1 }} 
        style={{ scale: heroScale }} 
        transition={{ duration: 1.2, delay: isFirstVisit.current ? 4.2 : 0.2, ease: "easeOut" }} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata" 
          poster="/cielo-poster.jpg" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/cielo.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/45 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/85 via-transparent to-[#0A192F] z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0074D9]/20 blur-[140px] rounded-full" />
      </motion.div>
      
      {/* CONTENIDO HERO CON ALTURA EXACTA Y PROPORCIONES PERFECTAS */}
      <motion.div 
        style={{ y: heroTextY, opacity: heroTextOpacity }} 
        className="relative z-10 flex flex-col justify-between w-full h-[100dvh] max-w-[1400px] mx-auto pt-20 sm:pt-24 md:pt-28 pb-5 sm:pb-6 md:pb-8 px-5 sm:px-8 md:px-12 pointer-events-auto"
      >
        {/* PARTE SUPERIOR: STATUS BADGE + LOGOTIPO */}
        <div className="flex flex-col items-center justify-center text-center w-full shrink-0">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Software Factory · Mendoza para el Mundo</span>
          </motion.div>

          {/* Logotipo Tipográfico Gigante pero Proporcional */}
          <h1 className="text-[12vw] sm:text-[11vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem] font-black text-white tracking-tighter leading-none flex items-start drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)] select-none">
            primelogic<span className="text-[3.5vw] md:text-3xl lg:text-5xl mt-[1.5vw] md:mt-3 lg:mt-5 ml-1 text-[#00E5FF]">LT</span>
          </h1>
        </div>

        {/* PARTE INFERIOR: MENSAJE, BOTONES Y UBICACIÓN (SIEMPRE 100% VISIBLES) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 sm:gap-6 relative">
          
          {/* Mensaje & Acciones */}
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1.5 sm:mb-2 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
              Ingeniería de software <br className="hidden sm:inline"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5FF] to-[#0074D9]">
                sin límites ni plantillas.
              </span>
            </h2>
            
            <p className="text-white/85 text-[11px] sm:text-xs md:text-sm lg:text-base font-bold leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] mb-4 max-w-xl">
              Construimos sistemas empresariales en <strong className="text-white font-extrabold">.NET, React y Arquitecturas Cloud</strong> diseñados para resolver operaciones complejas, facturación, control de accesos y acelerar tu rentabilidad.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button 
                onClick={() => {
                  const el = document.getElementById("proyectos");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#0074D9] hover:bg-[#005bb5] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#0074D9]/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Explorar Proyectos <ArrowRight size={15} />
              </button>

              {onOpenEstimator ? (
                <button
                  onClick={onOpenEstimator}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer hover:border-white/40"
                >
                  <Sparkles size={15} className="text-[#00E5FF]" /> Cotizador Rápido
                </button>
              ) : (
                <button
                  onClick={() => navigateTo && navigateTo("contacto")}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer"
                >
                  Contactar al Equipo
                </button>
              )}
            </div>
          </div>

          {/* Indicador de Scroll Central */}
          <motion.div 
            animate={{ y: [0, 6, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="hidden lg:flex absolute bottom-1 left-1/2 -translate-x-1/2 flex-col items-center text-white/60 drop-shadow-md cursor-pointer pointer-events-auto"
            onClick={() => {
              const el = document.getElementById("soluciones");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-[9px] uppercase tracking-widest font-black mb-0.5 text-white/70">Scroll</span>
            <ChevronDown size={18} className="text-[#00E5FF]" aria-hidden="true" />
          </motion.div>

          {/* Tag de Ubicación */}
          <div className="text-left md:text-right text-white/90 text-[10px] sm:text-xs shrink-0 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] bg-white/5 md:bg-transparent p-2.5 md:p-0 rounded-xl border border-white/10 md:border-none backdrop-blur-sm md:backdrop-blur-none">
            <p className="font-black text-white uppercase tracking-wider flex items-center md:justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span> Godoy Cruz, Mendoza
            </p>
            <p className="font-semibold text-white/70">Ingeniería pura para escala global</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}