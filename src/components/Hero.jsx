import React from 'react';
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero({ heroScale, heroTextY, heroTextOpacity, isFirstVisit }) {
  return (
    <section id="inicio" className="relative min-h-[100dvh] w-full snap-start flex flex-col items-center overflow-hidden bg-[#0A192F]">
      <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} style={{ scale: heroScale }} transition={{ duration: 1.2, delay: isFirstVisit.current ? 4.2 : 0.2, ease: "easeOut" }} className="absolute inset-0 w-full h-full z-0">
        
        {/* Lee directo de la carpeta public/ */}
        <video autoPlay loop muted playsInline preload="metadata" poster="/cielo-poster.jpg" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
          <source src="/cielo.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-transparent to-[#0A192F]/90 z-0"></div>
      </motion.div>
      
      <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="relative z-10 flex flex-col w-full h-[100dvh] max-w-[1400px] mx-auto p-6 md:p-12 pointer-events-none">
        <div className="pt-36 md:pt-32 flex justify-center w-full shrink-0">
          <div className="text-[15vw] md:text-[9rem] lg:text-[13rem] font-black text-white tracking-tighter leading-none flex items-start drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            primelogic<span className="text-[4vw] md:text-5xl lg:text-7xl mt-[2vw] md:mt-4 lg:mt-8 ml-1 text-white/80">LT</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end w-full pb-8 md:pb-4 relative">
          <div className="max-w-2xl mt-auto mb-10 md:mb-0">
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
              El cielo no es el límite.
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-xl font-bold leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              Potenciar el negocio. <strong className="text-white font-black">Construimos motores financieros de tecnología pura</strong> que hacen escalar tu negocio.
            </p>
          </div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center text-white/60 drop-shadow-md">
            <span className="text-[10px] uppercase tracking-widest font-bold mb-2">Scroll</span>
            <ChevronDown size={20} aria-hidden="true" />
          </motion.div>
          <div className="text-left md:text-right text-white/90 text-[11px] md:text-sm shrink-0 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            <p className="font-black text-white mb-0.5 md:mb-1">made in Mendoza, Argentina</p>
            <p className="font-semibold">Hacia el resto del mundo</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}