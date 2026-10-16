import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import ChapterBackdrop from './ChapterBackdrop';

export default function ContactSection() {
  const [status, setStatus] = useState('idle');
  const reduced = useReducedMotion();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/primelogiclt@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          projectType: form.projectType.value,
          challenge: form.challenge.value,
          message: form.message.value,
          _subject: 'Nueva consulta desde Primelogic LT',
          _captcha: 'false',
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contacto"
      className="min-h-screen py-24 flex flex-col justify-center relative isolate"
      style={{ borderRadius: '28px 28px 0 0', marginTop: '-24px' }}
    >
      <ChapterBackdrop variant="topo" label="06" />
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-1">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#00d4ff' }}>
              06 / Hablemos
            </h2>
            <Motion.span
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: 0.1 }}
              className="inline-block text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              Contanos qué necesita tu negocio.
            </Motion.span>
            <p style={{ color: 'rgba(255,255,255,.4)' }} className="text-lg max-w-md mx-auto lg:mx-0">
              Escribinos y empecemos a construir el futuro de tu negocio hoy mismo. Un equipo especializado está listo para asesorarte.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-1 w-full max-w-xl contact-form-wrapper">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="text-sm font-semibold">¿Qué estás buscando?</label>
                <select name="projectType" id="projectType" required defaultValue="">
                  <option value="" disabled>Seleccioná una opción</option>
                  <option value="software">Software o plataforma a medida</option>
                  <option value="automation">Automatización o integración</option>
                  <option value="consulting">Consultoría y evolución tecnológica</option>
                  <option value="other">Todavía no lo tengo definido</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="challenge" className="text-sm font-semibold">¿Cuál es el principal desafío?</label>
                <input
                  type="text"
                  name="challenge"
                  id="challenge"
                  required
                  placeholder="Ej.: perdemos tiempo cargando datos manualmente"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold">Mensaje</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  placeholder="Contanos sobre tu idea o proyecto..."
                  className="resize-none"
                />
              </div>

              <label className="flex items-start gap-3 text-sm mt-2" style={{ color: 'rgba(255,255,255,.45)' }}>
                <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 accent-cyan-400" />
                <span>Acepto que Primelogic LT use estos datos para responder mi consulta.</span>
              </label>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </div>

              {status === 'success' && (
                <p role="status" className="text-sm font-semibold text-emerald-400 text-center">
                  Recibimos tu consulta. Te responderemos pronto.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-sm font-semibold text-red-400 text-center">
                  No pudimos enviar el mensaje. Revisá los datos o escribinos directamente.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
