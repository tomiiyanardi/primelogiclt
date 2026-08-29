import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Send } from "lucide-react";

export default function Header({ navigateTo, scrolled, isDark, onOpenEstimator }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  // Estilos de barra según estado de scroll y tema de la sección
  const headerBgClass = scrolled 
    ? (isDark 
        ? "bg-[#0A192F]/90 border-white/15 shadow-xl backdrop-blur-xl py-2.5 md:py-3" 
        : "bg-white/95 border-[#0A192F]/10 shadow-lg backdrop-blur-xl py-2.5 md:py-3")
    : "bg-transparent border-transparent shadow-none py-4 md:py-6";

  const headerTextClass = scrolled 
    ? (isDark ? "text-white" : "text-[#0A192F]")
    : "text-white";

  const headerMutedClass = scrolled
    ? (isDark ? "text-white/70 hover:text-white" : "text-[#8A95A5] hover:text-[#0A192F]")
    : "text-white/80 hover:text-white drop-shadow-md";

  // Estilo adaptativo del botón "Cotizar" para que NUNCA quede invisible en fondo blanco
  const cotizarBtnClass = scrolled
    ? (isDark
        ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
        : "bg-[#0A192F]/8 hover:bg-[#0A192F]/15 border-[#0A192F]/20 text-[#0A192F] font-black")
    : "bg-white/15 hover:bg-white/25 border-white/30 text-white";

  const cotizarIconClass = scrolled && !isDark ? "text-[#0074D9]" : "text-[#00E5FF]";

  const menuItems = [
    { label: "Inicio", sectionId: "inicio" },
    { label: "Soluciones", sectionId: "soluciones" },
    { label: "Proyectos", sectionId: "proyectos" },
    { label: "Nosotros", sectionId: "nosotros" }
  ];

  return (
    <>
      <header className={`fixed top-0 md:top-2 left-1/2 -translate-x-1/2 z-[90] w-full md:w-[96%] max-w-[1400px] transition-all duration-500`}>
        <div className={`relative w-full px-4 md:px-7 rounded-none md:rounded-full border flex justify-between items-center transition-all duration-500 ${headerBgClass}`}>
          
          {/* LOGO */}
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); navigateTo("home", "inicio"); setMobileMenu(false); }} 
            className={`flex items-center gap-2 md:gap-3 font-black text-base md:text-xl tracking-tighter shrink-0 transition-colors duration-500 ${headerTextClass}`}
          >
            <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-md" />
            <span className="inline">PRIME<span className="text-[#0074D9]">LOGIC</span><span className="text-[#00E5FF] ml-0.5 text-xs font-bold">LT</span></span>
          </a>
          
          {/* LINKS ESCRITORIO */}
          <nav aria-label="Menú principal" className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.22em]">
            {menuItems.map(item => (
              <a 
                key={item.sectionId} 
                href={`#${item.sectionId}`} 
                onClick={(e) => { e.preventDefault(); navigateTo("home", item.sectionId); }} 
                className={`relative group transition-colors duration-300 py-1 ${headerMutedClass}`}
              >
                {item.label} 
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0074D9] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* BOTONES DE ACCIÓN Y MENÚ MÓVIL */}
          <div className="flex items-center gap-2 md:gap-3">
            {onOpenEstimator && (
              <button
                onClick={onOpenEstimator}
                className={`hidden sm:inline-flex items-center gap-1.5 border px-3.5 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider transition-all backdrop-blur-sm cursor-pointer ${cotizarBtnClass}`}
              >
                <Sparkles size={13} className={cotizarIconClass} /> Cotizar
              </button>
            )}

            <a 
              href="#contacto" 
              onClick={(e) => { e.preventDefault(); navigateTo("contacto"); setMobileMenu(false); }} 
              className="bg-[#0074D9] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider hover:bg-[#005bb5] hover:shadow-[0_0_20px_rgba(0,116,217,0.6)] transition-all active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
            >
              Contacto
            </a>

            {/* Botón hamburguesa */}
            <button 
              aria-label="Abrir menú móvil" 
              aria-expanded={mobileMenu} 
              onClick={() => setMobileMenu(true)} 
              className={`md:hidden p-1.5 transition-colors duration-500 ${headerTextClass} cursor-pointer`}
            >
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
            className="fixed inset-0 z-[100] bg-[#0A192F]/98 backdrop-blur-2xl flex flex-col md:hidden overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10">
              <div className="flex items-center gap-2 font-black text-white text-base tracking-tighter">
                <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                <span>PRIME<span className="text-[#0074D9]">LOGIC</span></span>
              </div>
              <button 
                onClick={() => setMobileMenu(false)} 
                className="text-white p-2 bg-white/10 rounded-full active:scale-90 transition-transform cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center items-center gap-6 text-center font-black uppercase tracking-[0.25em] text-white/70 px-6">
              {menuItems.map((item, i) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 + (i * 0.08) }}
                  key={item.sectionId} 
                  href={`#${item.sectionId}`} 
                  onClick={(e) => { e.preventDefault(); navigateTo("home", item.sectionId); setMobileMenu(false); }} 
                  className="text-2xl sm:text-3xl hover:text-white group relative py-2 w-full border-b border-white/5 cursor-pointer"
                >
                  {item.label}
                </motion.a>
              ))}
              
              {onOpenEstimator && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 0.45 }}
                  onClick={() => {
                    setMobileMenu(false);
                    onOpenEstimator();
                  }}
                  className="bg-white/10 border border-white/20 text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 shadow-lg mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={18} className="text-[#00E5FF]" /> Cotizador Rápido
                </motion.button>
              )}

              <motion.a 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.5 }}
                href="#contacto" 
                onClick={(e) => { e.preventDefault(); navigateTo("contacto"); setMobileMenu(false); }} 
                className="bg-[#0074D9] text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#005bb5] shadow-xl shadow-[#0074D9]/40 mt-1 cursor-pointer"
              >
                Agendar Consulta
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}