import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Ofrecemos', section: 'ofrecemos' },
  { label: 'Servicios', section: 'servicios' },
  { label: 'Proceso', section: 'proceso' },
  { label: 'Nosotros', section: 'nosotros' },
  { label: 'Clientes', section: 'clientes' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ['inicio', ...navLinks.map(n => n.section), 'contacto'];
      let current = 'inicio';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const scrollToSection = (section) => {
    setIsOpen(false);
    if (section === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <>
      {/* --- NAVBAR PREMIUM (Estilo Curva Uno adaptado) --- */}
      <nav className={`fixed top-4 md:top-6 left-0 right-0 mx-auto w-[92%] max-w-6xl z-[200] px-4 md:px-8 py-2.5 md:py-3 transition-all duration-500 ease-out rounded-full shadow-lg ${scrolled || isOpen ? 'bg-brand-white/90 backdrop-blur-xl border border-gray-200 shadow-gray-200/50' : 'bg-brand-white/70 backdrop-blur-md border border-gray-100 shadow-transparent'}`}>
        <div className="flex items-center justify-between w-full">

          {/* LOGO */}
          <div className="flex items-center z-50 cursor-pointer group" onClick={() => scrollToSection('inicio')}>
            <img src="/logo.svg" alt="Primelogic LT Logo" className="h-6 md:h-8 w-auto group-hover:scale-105 transition-transform" />
          </div>

          {/* DESKTOP LINKS — indicador tipo LED de telemetría, adaptado a azul */}
          <ul className="hidden md:flex items-center gap-1 px-2">
            {navLinks.map(({ label, section }) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className="relative px-4 py-1.5 font-bold text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: active === section ? '#1D4ED8' : '#e5e7eb', // brand-blue vs gray-200
                      boxShadow: active === section ? '0 0 8px 2px rgba(29,78,216,0.4)' : 'none',
                    }}
                  />
                  <span className={active === section ? 'text-brand-black' : 'text-gray-500 hover:text-brand-black'}>{label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/#contacto" onClick={() => scrollToSection('contacto')}>
              <button className="px-5 py-2 rounded-full bg-brand-blue hover:bg-opacity-90 transition-all shadow-md group border border-transparent">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors">Contactar</span>
              </button>
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON — Animado con Framer Motion */}
          <button className="md:hidden relative z-50 w-11 h-11 -mr-2 flex flex-col items-end justify-center gap-[5px]" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-5 h-[2px] block origin-center transition-transform bg-brand-black" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1, width: isOpen ? 0 : 16 }} className="h-[2px] block transition-all bg-brand-black" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? 20 : 12 }} className="h-[2px] block origin-center transition-all bg-brand-black" />
          </button>
        </div>
      </nav>

      {/* --- OVERLAY MENÚ MÓVIL (Fullscreen como en Curva Uno) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-[100dvh] bg-brand-white/98 backdrop-blur-3xl flex flex-col items-center justify-center z-[190]"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navLinks.map(({ label, section }, i) => (
                <motion.li key={section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                  <button onClick={() => scrollToSection(section)} className="flex items-center justify-center gap-3 font-black text-2xl tracking-[0.15em] uppercase transition-colors duration-200">
                    <span
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: active === section ? '#1D4ED8' : '#e5e7eb',
                        boxShadow: active === section ? '0 0 10px 3px rgba(29,78,216,0.3)' : 'none',
                      }}
                    />
                    <span className={active === section ? 'text-brand-black' : 'text-gray-500'}>{label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16 flex flex-col gap-4 w-full max-w-xs px-8">
              <Link to="/#contacto" onClick={() => scrollToSection('contacto')} className="w-full">
                <button className="w-full py-4 bg-brand-blue text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-lg">Contactar</button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
