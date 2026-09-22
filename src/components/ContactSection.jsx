import React, { useState } from "react";
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
          projectType: event.currentTarget.projectType.value,
          challenge: event.currentTarget.challenge.value,
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
    <section id="contacto" className="min-h-screen py-24 flex flex-col justify-center bg-transparent border-t border-gray-200/50">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Texto Izquierda */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Contáctanos</h2>
            <RevealText className="text-4xl lg:text-5xl font-extrabold text-brand-black mb-6 leading-tight" delay={0.1}>
              ¿Qué esperas para que tu idea sea realidad?
            </RevealText>
            <p className="text-gray-500 text-lg max-w-md mx-auto lg:mx-0">
              Escríbenos y comencemos a construir el futuro de tu negocio hoy mismo. Un equipo experto está listo para asesorarte.
            </p>
          </div>

          {/* Formulario Derecha */}
          <div className="flex-1 w-full max-w-xl bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-200 shadow-xl shadow-brand-blue/5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                <label htmlFor="projectType" className="text-sm font-semibold text-gray-700">¿Qué estás buscando?</label>
                <select
                  name="projectType"
                  id="projectType"
                  required
                  defaultValue=""
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all bg-gray-50 text-gray-700"
                >
                  <option value="" disabled>Seleccioná una opción</option>
                  <option value="software">Software o plataforma a medida</option>
                  <option value="automation">Automatización o integración</option>
                  <option value="consulting">Consultoría y evolución tecnológica</option>
                  <option value="other">Todavía no lo tengo definido</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="challenge" className="text-sm font-semibold text-gray-700">¿Cuál es el principal desafío?</label>
                <input
                  type="text"
                  name="challenge"
                  id="challenge"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all bg-gray-50"
                  placeholder="Ej.: perdemos tiempo cargando datos manualmente"
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

              <label className="flex items-start gap-3 text-sm text-gray-600 mt-2">
                <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 accent-brand-blue" />
                <span>Acepto que Primelogic LT use estos datos para responder mi consulta.</span>
              </label>

              <div className="flex justify-end mt-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="px-8 py-3.5 rounded-xl bg-brand-blue text-white font-bold hover:bg-opacity-90 hover:scale-[1.02] transition-all w-full shadow-lg shadow-brand-blue/30 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </div>
              {status === 'success' && <p role="status" className="text-sm font-semibold text-emerald-700 text-center">Recibimos tu consulta. Te responderemos pronto.</p>}
              {status === 'error' && <p role="alert" className="text-sm font-semibold text-red-700 text-center">No pudimos enviar el mensaje. Revisá los datos o escribinos directamente.</p>}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
