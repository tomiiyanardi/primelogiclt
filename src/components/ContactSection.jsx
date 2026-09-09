import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { RevealText } from "../utils/animations";

const ContactSection = () => {
  return (
    <section id="contacto" className="min-h-screen flex flex-col justify-center py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Contáctanos</h2>
        </div>

        <CardContainer className="inter-var w-full">
          <CardBody className="bg-brand-white relative group/card border-gray-200 w-full sm:w-[35rem] h-auto rounded-3xl p-10 border shadow-2xl shadow-brand-blue/10">
            <CardItem
              translateZ="50"
              className="text-3xl font-extrabold text-brand-black mb-2"
            >
              <RevealText delay={0.1}>¿Qué esperas para que tu idea sea realidad?</RevealText>
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-gray-500 text-sm max-w-sm mt-2 mb-10"
            >
              Escríbenos y comencemos a construir el futuro de tu negocio hoy mismo.
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <form action="https://formsubmit.co/primelogiclt@gmail.com" method="POST" className="flex flex-col gap-6">
                {/* Anti-spam honey pot and config for formsubmit */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Nombre</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all bg-gray-50"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all bg-gray-50"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">Mensaje</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows="4" 
                    required
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all bg-gray-50 resize-none"
                    placeholder="Cuéntanos sobre tu idea o proyecto..."
                  ></textarea>
                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-opacity-90 hover:scale-105 transition-all w-full shadow-lg shadow-brand-blue/30"
                  >
                    Contact US
                  </button>
                </div>
              </form>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export default ContactSection;
