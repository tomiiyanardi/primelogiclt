import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { RevealText } from "../utils/animations";

const ContactSection = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/primelogiclt@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: event.currentTarget.name.value,
          email: event.currentTarget.email.value,
          message: event.currentTarget.message.value,
          _subject: 'Nueva consulta desde Primelogic LT',
          _captcha: 'false',
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      event.currentTarget.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

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
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 accent-brand-blue" />
                  <span>Acepto que Primelogic LT use estos datos para responder mi consulta.</span>
                </label>

                <div className="flex justify-end mt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="px-8 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-opacity-90 hover:scale-[1.02] transition-all w-full shadow-lg shadow-brand-blue/30 disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                  </button>
                </div>
                {status === 'success' && <p role="status" className="text-sm font-semibold text-emerald-700">Recibimos tu consulta. Te responderemos pronto.</p>}
                {status === 'error' && <p role="alert" className="text-sm font-semibold text-red-700">No pudimos enviar el mensaje. Revisá los datos o escribinos directamente.</p>}
              </form>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export default ContactSection;
