import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="nosotros" className="min-h-screen flex flex-col justify-center py-24 bg-brand-white">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1 relative w-full"
          >
            {/* INYECTAR_IMAGEN_AQUI: Foto de Tomás y Luciano o asset representativo */}
            {/* Si utilizas jon2.png coméntalo o reemplázalo */}
            <div className="absolute inset-0 bg-brand-blue/5 rounded-[3rem] -z-10 transform -rotate-2 scale-105"></div>
            
            <img 
              src="/jon2.png" 
              alt="Personaje o fundadores" 
              className="w-full max-w-md object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            />
            
            {/* Placeholder de comentario */}
            {/* 
            <div className="w-full max-w-md aspect-[3/4] border-2 border-dashed border-brand-blue/40 rounded-[3rem] flex items-center justify-center bg-brand-blue/5">
              <span className="text-brand-blue font-bold text-center">Espacio reservado para<br/>Personaje / Imagen</span>
            </div>
            */}
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 order-1 lg:order-2 space-y-12"
          >
            <div>
              <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Quiénes Somos?</h2>
              <p className="text-4xl font-extrabold text-brand-black mb-6">
                El motor detrás de la lógica
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Somos dos amigos con ganas de ir para adelante. Nos apasiona sumergirnos en los desafíos de nuestros clientes y construir la infraestructura que necesitan para crecer. No somos solo un proveedor, somos parte de tu equipo.
              </p>
            </div>

            <div className="space-y-10">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl hover:bg-brand-blue/5 transition-colors">
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Misión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Implementar, desarrollar, y soportar sistemas e infraestructuras de IT para solucionar y/o ayudar a clientes a que el negocio mejore. Sumergiéndonos en el mismo como si fuese propio, compartiendo el mismo interés de beneficios.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl hover:bg-brand-blue/5 transition-colors">
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Visión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Ser referencia regional de sistemas de alta calidad, donde seamos conocidos por implementar soluciones innovadoras, y poder solucionar problemas tecnológicos complejos.
                </p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
