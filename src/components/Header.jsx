import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header({ navigateTo, scrolled, isDark }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  // EFECTO TIENDANUBE: 
  // Si no scrolleó (top), es transparente y texto blanco.
  // Si scrolleó, aplica el fondo difuminado oscuro o claro.
  const headerBgClass = scrolled 
    ? (isDark ? "bg-[#0A192F]/85 border-white/10 shadow-lg backdrop-blur-md py-2 md:py-3" : "bg-white/95 border-[#0A192F]/10 shadow-md backdrop-blur-md py-2 md:py-3")
    : "bg-transparent border-transparent shadow-none py-4 md:py-6";

  const headerTextClass = scrolled 
    ? (isDark ? "text-white" : "text-[#0A192F]")
    : "text-white"; // Al principio siempre blanco por el video

  const headerMutedClass = scrolled
    ? (isDark ? "text-white/70 hover:text-white" : "text-[#8A95A5] hover:text-[#0A192F]")
    : "text-white/80 hover:text-white drop-shadow-md";

  const menuItems = [
    { label: "Inicio", sectionId: "inicio" },
    { label: "Soluciones", sectionId: "soluciones" },
    { label: "Proyectos", sectionId: "proyectos" },
    { label: "Nosotros", sectionId: "nosotros" }
  ];

  return (
    <>
      <header className={`fixed top-0 md:top-2 left-1/2 -translate-x-1/2 z-[90] w-full md:w-[96%] max-w-[1400px] transition-all duration-500`}>
        <div className={`relative w-full px-4 md:px-6 rounded-none md:rounded-full border flex justify-between items-center transition-all duration-500 ${headerBgClass}`}>
          
          {/* LOGO */}
          <a href="#inicio" onClick={(e) => { e.preventDefault(); navigateTo("home", "inicio"); setMobileMenu(false); }} className={`flex items-center gap-2 md:gap-3 font-black text-base md:text-xl tracking-tighter shrink-0 transition-colors duration-500 ${headerTextClass}`}>
            <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-md" />
            <span className="hidden sm:inline">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
            <span className="sm:hidden tracking-wider">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
          </a>
          
          {/* LINKS ESCRITORIO */}
          <nav aria-label="Menú principal" className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            {menuItems.map(item => (
              <a key={item.sectionId} href={`#${item.sectionId}`} onClick={(e) => { e.preventDefault(); navigateTo("home", item.sectionId); }} className={`relative group transition-colors duration-300 ${headerMutedClass}`}>
                {item.label} 
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0074D9] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* BOTÓN Y MENÚ HAMBURGUESA */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#contacto" onClick={(e) => { e.preventDefault(); navigateTo("contacto"); setMobileMenu(false); }} className="bg-[#0074D9] text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-[9px] md:text-xs hover:bg-[#005bb5] hover:shadow-[0_0_20px_rgba(0,116,217,0.6)] transition-all active:scale-95 shadow-lg whitespace-nowrap">
              Agendar Demo
            </a>
            {/* Las 3 rayitas */}
            <button aria-label="Abrir menú móvil" aria-expanded={mobileMenu} onClick={() => setMobileMenu(true)} className={`md:hidden p-1.5 transition-colors duration-500 ${headerTextClass}`}>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL PANTALLA COMPLETA */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: "-100%" }} 
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-[100] bg-[#0A192F] flex flex-col md:hidden overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-black text-white text-base tracking-tighter">
                <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                <span>PRIME<span className="text-[#0074D9]">LOGIC</span></span>
              </div>
              <button onClick={() => setMobileMenu(false)} className="text-white p-2 bg-white/10 rounded-full active:scale-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center items-center gap-8 text-center font-black uppercase tracking-[0.25em] text-white/60 px-6">
              {menuItems.map((item, i) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.1) }}
                  key={item.sectionId} 
                  href={`#${item.sectionId}`} 
                  onClick={(e) => { e.preventDefault(); navigateTo("home", item.sectionId); setMobileMenu(false); }} 
                  className="text-2xl sm:text-3xl hover:text-white group relative py-2 w-full border-b border-white/5"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                href="#contacto" 
                onClick={(e) => { e.preventDefault(); navigateTo("contacto"); setMobileMenu(false); }} 
                className="bg-[#0074D9] text-white w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#005bb5] shadow-lg mt-4"
              >
                Agendar Demo
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}