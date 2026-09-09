import React from 'react';
import { motion } from 'framer-motion';

const OfferingsSection = () => {
  return (
    <section id="ofrecemos" className="min-h-screen flex flex-col justify-center py-24 bg-brand-white">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Text Side - Clean Typography Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex-1 space-y-12"
          >
            <div>
              <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Qué Ofrecemos?</h2>
              <p className="text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight">
                Tu éxito es nuestro objetivo principal
              </p>
            </div>

            <div className="space-y-10 pl-4 border-l-2 border-brand-blue/20">
              <motion.div whileHover={{ x: 5 }} className="relative transition-transform duration-300">
                <div className="absolute -left-[21px] top-2 w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Optimización Real</h3>
                <p className="text-gray-500 leading-relaxed font-light text-lg">
                  Queremos que nuestros clientes ganen plata o tiempo automatizando procesos clave de su negocio.
                </p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="relative transition-transform duration-300">
                <div className="absolute -left-[21px] top-2 w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Beneficio Mutuo</h3>
                <p className="text-gray-500 leading-relaxed font-light text-lg">
                  Si nuestros clientes ganan, nosotros también. Nuestra mayor satisfacción es el éxito y crecimiento de nuestros clientes.
                </p>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="relative transition-transform duration-300">
                <div className="absolute -left-[21px] top-2 w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,116,217,0.5)]"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Compromiso Total</h3>
                <p className="text-gray-500 leading-relaxed font-light text-lg">
                  Tenemos el mismo compromiso. Nosotros queremos tanto como el cliente alcanzar la mejor versión de sus proyectos y sistemas.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end w-full relative"
          >
            
            <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl -z-10 transform rotate-3 scale-105"></div>
            
            <motion.img 
              src="/Personaje3.png" 
              alt="Personaje Offerings" 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl mix-blend-multiply cursor-pointer hover:scale-105"
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
