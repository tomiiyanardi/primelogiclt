import React from 'react';
import { motion } from "framer-motion";
import { MessageCircle, Mail, Instagram, ArrowLeft } from "lucide-react";
import ContactCardHorizontal from "../components/ContactCardHorizontal";

export default function Contacto({ navigateTo }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} 
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="relative min-h-[100dvh] snap-start flex flex-col items-center bg-[#0A192F] px-0 md:px-8 pt-0 md:pt-28 pb-0 md:pb-12 overflow-hidden"
    >
      <div className="relative w-full flex-grow max-w-[1400px] rounded-none md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 md:p-12 pt-28 md:pt-12 border-none md:border border-white/5 my-auto">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline preload="metadata" poster="/humonave-poster.jpg" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-50 mix-blend-lighten z-0">
            <source src="/humonave.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-[#0A192F]/30 z-0"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center h-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center flex-grow">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="order-1 lg:order-2 text-center lg:text-left mt-8 md:mt-0">
              <h2 className="text-[14vw] md:text-[6.5rem] font-black text-white mb-2 md:mb-4 tracking-tighter leading-none drop-shadow-2xl">Iniciá el <br className="hidden lg:block"/> sistema.</h2>
              <p className="text-white/90 text-xs md:text-lg font-bold max-w-md mx-auto lg:mx-0 drop-shadow-md px-2 md:px-0">Contactate con nosotros. A la brevedad te responderemos y cotizaremos tu proyecto sin compromiso.</p>
            </motion.div>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="order-2 lg:order-1 relative w-full max-w-md mx-auto rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden p-[3px] shadow-[0_0_40px_-5px_rgba(0,116,217,0.4)] group">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[1.2rem] md:rounded-[2.5rem]">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute top-1/2 left-1/2 w-[250%] h-[250%] origin-center -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_40%,#00E5FF_80%,#0074D9_100%)] z-0" />
              </div>
              <div className="relative z-10 bg-[#0A192F]/95 backdrop-blur-xl p-5 md:p-8 rounded-[calc(1.2rem-3px)] md:rounded-[calc(2.5rem-3px)] h-full w-full">
                <h3 className="text-lg md:text-2xl font-black text-white mb-1 tracking-tighter">¿Preparados para el despegue?</h3>
                <p className="text-white/70 font-bold text-[10px] md:text-xs mb-5 md:mb-6">Respondemos en menos de 24hs.</p>
                <div className="flex flex-col gap-3 md:gap-4">
                  <ContactCardHorizontal icon={<MessageCircle size={20} />} title="WhatsApp" value="+54 261 2533823" link="https://wa.me/2612533823" color="text-green-500" bgColor="bg-green-500/10" />
                  <ContactCardHorizontal icon={<Mail size={20} />} title="Email" value="primelogiclt@gmail.com" link="mailto:primelogiclt@gmail.com" color="text-[#0074D9]" bgColor="bg-[#0074D9]/10" />
                  <ContactCardHorizontal icon={<Instagram size={20} />} title="Instagram" value="@primelogiclt" link="https://instagram.com/primelogiclt" color="text-pink-500" bgColor="bg-pink-500/10" />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="w-full flex justify-center mt-10 md:mt-16 pb-8 md:pb-0 relative z-20">
            <button onClick={() => navigateTo("home", "proyectos")} className="group inline-flex items-center gap-2 text-white/50 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-white transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" /> Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}