import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Instagram, ArrowLeft, Copy, Check, Sparkles, Send } from "lucide-react";
import ContactCardHorizontal from "../components/ContactCardHorizontal";
import MinimalistParticles from "../components/MinimalistParticles";

export default function Contacto({ navigateTo, onOpenEstimator }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("primelogiclt@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.98 }} 
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="relative min-h-[100dvh] snap-start flex flex-col items-center bg-[#071324] px-0 md:px-8 pt-0 md:pt-24 pb-0 md:pb-12 overflow-hidden"
    >
      {/* CANVAS DE PARTÍCULAS INTERACTIVO DE FONDO */}
      <MinimalistParticles withBackground={false} interactive={!isMobile} density={0.85} className="opacity-75" />

      <div className="relative w-full flex-grow max-w-[1400px] rounded-none md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 md:p-12 pt-24 md:pt-12 border-none md:border border-white/10 my-auto">
        
        {/* Fondo con atmósfera: póster optimizado en móvil / video en desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isMobile ? (
            <img 
              src="/humonave-poster.jpg" 
              alt="Fondo Contacto" 
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-35 mix-blend-lighten z-0"
              loading="lazy"
            />
          ) : (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto" 
              poster="/humonave-poster.jpg" 
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-35 mix-blend-lighten z-0"
            >
              <source src="/humonave.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/85 to-[#071324]/40 z-0" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center h-full">
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center flex-grow">
            
            {/* Columna Izquierda: Mensaje y Fundadores */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.4, duration: 0.7 }} 
              className="order-1 lg:order-2 text-center lg:text-left mt-4 md:mt-0"
            >
              <span className="inline-block px-3.5 py-1 text-[#00E5FF] bg-[#0074D9]/20 border border-[#0074D9]/40 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-3 backdrop-blur-md">
                Contacto Directo
              </span>
              <h2 className="text-[12vw] sm:text-[14vw] md:text-[5.5rem] lg:text-[6.5rem] font-black text-white mb-2 md:mb-4 tracking-tighter leading-none drop-shadow-2xl">
                Iniciá el <br className="hidden lg:block"/> sistema.
              </h2>
              <p className="text-white/85 text-xs sm:text-sm md:text-lg font-bold max-w-md mx-auto lg:mx-0 drop-shadow-md leading-relaxed mb-6">
                Escribinos. Respondemos en menos de 24 horas y cotizamos la arquitectura de tu software sin compromiso.
              </p>

              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="inline-flex items-center gap-2 bg-[#0074D9] hover:bg-[#005bb5] text-white px-7 py-3.5 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#0074D9]/40 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles size={16} className="text-[#00E5FF]" /> Abrir Cotizador Rápido
                </button>
              )}
            </motion.div>

            {/* Columna Derecha: Tarjetas de Contacto */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.7 }} 
              className="order-2 lg:order-1 relative w-full max-w-md mx-auto rounded-[1.4rem] md:rounded-[2.5rem] overflow-hidden p-[2.5px] shadow-[0_0_50px_-5px_rgba(0,116,217,0.4)] group"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[1.4rem] md:rounded-[2.5rem]">
                <motion.div 
                  animate={{ rotate: [0, 360] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }} 
                  className="absolute top-1/2 left-1/2 w-[250%] h-[250%] origin-center -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_35%,#00E5FF_75%,#0074D9_100%)] z-0" 
                />
              </div>

              <div className="relative z-10 bg-[#0A192F]/95 backdrop-blur-2xl p-6 md:p-8 rounded-[calc(1.4rem-2.5px)] md:rounded-[calc(2.5rem-2.5px)] h-full w-full">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    Canales de Atención
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-white/60 font-semibold text-xs mb-6">
                  Tomás & Luciano · Godoy Cruz, Mendoza
                </p>

                <div className="flex flex-col gap-3 md:gap-4">
                  {/* WhatsApp */}
                  <ContactCardHorizontal 
                    icon={<MessageCircle size={22} />} 
                    title="WhatsApp Directo" 
                    value="+54 261 2533823" 
                    link="https://wa.me/542612533823?text=Hola%20Tomás%20y%20Luciano,%20estoy%20interesado%20en%20desarrollar%20un%20proyecto%20con%20PrimeLogic%20LT." 
                    color="text-emerald-400" 
                    bgColor="bg-emerald-500/15" 
                  />

                  {/* Email con botón de copiar */}
                  <div className="relative group/email">
                    <ContactCardHorizontal 
                      icon={<Mail size={22} />} 
                      title="Email Corporativo" 
                      value="primelogiclt@gmail.com" 
                      link="mailto:primelogiclt@gmail.com" 
                      color="text-[#00E5FF]" 
                      bgColor="bg-[#0074D9]/15" 
                    />
                    <button
                      onClick={handleCopyEmail}
                      title="Copiar email"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-[#0074D9] text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Instagram */}
                  <ContactCardHorizontal 
                    icon={<Instagram size={22} />} 
                    title="Instagram" 
                    value="@primelogiclt" 
                    link="https://instagram.com/primelogiclt" 
                    color="text-pink-400" 
                    bgColor="bg-pink-500/15" 
                  />
                </div>

                {/* Notificación al copiar email */}
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-3 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 py-1.5 rounded-lg border border-emerald-500/20"
                    >
                      ✓ Email copiado al portapapeles
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>

          {/* Botón para volver al home */}
          <div className="w-full flex justify-center mt-8 md:mt-12 pb-6 md:pb-0 relative z-20">
            <button 
              onClick={() => navigateTo("home", "inicio")} 
              className="group inline-flex items-center gap-2 text-white/60 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" /> 
              Volver al Inicio
            </button>
          </div>

        </div>
      </div>
    </motion.section>
  );
}