import { useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, Check, Mail, Phone, User } from 'lucide-react';

const options = [
  ['software', 'Software a medida', 'var(--blue)'],
  ['automation', 'Automatización', 'var(--cyan)'],
  ['ai', 'IA aplicada', 'var(--violet)'],
  ['consulting', 'Consultoría', 'var(--magenta)'],
  ['other', 'Otro / no estoy seguro', 'rgba(255,255,255,.5)'],
];

// The character changes pose as the visitor moves through the form
const steps = [
  { label: 'Tus datos', mascot: '/mascots/mascot-lean.svg' },
  { label: 'Qué necesitás', mascot: '/mascots/mascot-point-forward.svg' },
  { label: 'Tu proyecto', mascot: '/mascots/mascot-tablet.svg' },
];

function Field({ icon, label, ...input }) {
  return (
    <label className="cf-field">
      <span className="cf-label">{label}</span>
      <span className="cf-input">
        {icon}
        <input {...input} />
      </span>
    </label>
  );
}

export default function ContactSection() {
  const reduced = useReducedMotion();
  const form = useRef(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle');

  // Each step validates only its own fields, so hidden steps never block the visitor
  const stepIsValid = () => {
    const fields = form.current.querySelectorAll(`[data-step="${step}"] input, [data-step="${step}"] textarea`);
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stepIsValid()) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    const data = form.current;
    setStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/primelogiclt@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.value,
          email: data.email.value,
          company: data.company.value,
          phone: data.phone.value,
          projectType: data.projectType.value,
          message: data.message.value,
          _subject: 'Nueva consulta desde Primelogic LT',
          _captcha: 'false',
        }),
      });
      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      data.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const done = status === 'success';
  const mascot = done ? '/mascots/mascot-celebrate.svg' : steps[step].mascot;
  const swap = reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.35 } };

  return (
    <section id="contacto" className="section">
      <div className="wrap">
        <div className="cf">
          <div className="cf-mascot" aria-hidden="true">
            <AnimatePresence mode="wait">
              <Motion.img key={mascot} src={mascot} alt="" width="400" height="620" {...swap} />
            </AnimatePresence>
          </div>

          <div className="cf-panel">
            <header className="cf-head">
              <h2 className="display">Hablemos de tu proyecto</h2>
              <p>Contanos qué necesitás y coordinamos una primera charla de diagnóstico, sin costo.</p>
            </header>

            {done ? (
              <div className="cf-done" role="status">
                <span className="cf-done-icon"><Check size={28} aria-hidden="true" /></span>
                <h3>¡Recibimos tu mensaje!</h3>
                <p>Te respondemos pronto para coordinar la charla.</p>
                <button type="button" className="cf-link" onClick={() => { setStatus('idle'); setStep(0); }}>
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form ref={form} className="cf-form" onSubmit={handleSubmit} noValidate>
                <ol className="cf-steps" aria-label="Pasos del formulario">
                  {steps.map((s, index) => (
                    <li key={s.label} className={index === step ? 'is-current' : index < step ? 'is-done' : undefined} aria-current={index === step ? 'step' : undefined}>
                      <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
                      {s.label}
                    </li>
                  ))}
                </ol>

                <fieldset data-step="0" hidden={step !== 0}>
                  <legend className="sr-only">Tus datos</legend>
                  <div className="cf-grid">
                    <Field icon={<User size={18} aria-hidden="true" />} label="Nombre y apellido *" name="name" required placeholder="Ej: Ana Pérez" autoComplete="name" />
                    <Field icon={<Mail size={18} aria-hidden="true" />} label="Email *" type="email" name="email" required placeholder="ana@empresa.com" autoComplete="email" />
                    <Field icon={<Building2 size={18} aria-hidden="true" />} label="Empresa" name="company" placeholder="Nombre de la empresa" autoComplete="organization" />
                    <Field icon={<Phone size={18} aria-hidden="true" />} label="Teléfono / WhatsApp" type="tel" name="phone" placeholder="+54 9 ..." autoComplete="tel" />
                  </div>
                </fieldset>

                <fieldset data-step="1" hidden={step !== 1}>
                  <legend className="cf-label">¿Qué necesitás? *</legend>
                  <div className="cf-chips">
                    {options.map(([value, label, color], index) => (
                      <label key={value} className="cf-chip" style={{ '--c': color }}>
                        <input type="radio" name="projectType" value={value} required={index === 0} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset data-step="2" hidden={step !== 2}>
                  <legend className="sr-only">Tu proyecto</legend>
                  <label className="cf-field">
                    <span className="cf-label">Tu proyecto *</span>
                    <textarea name="message" required rows="5" placeholder="Contanos qué querés lograr, en qué etapa está y para cuándo lo necesitás." />
                  </label>
                </fieldset>

                <div className="cf-actions">
                  {step > 0 && (
                    <button type="button" className="cf-back" onClick={() => setStep(step - 1)}>
                      <ArrowLeft size={18} aria-hidden="true" /> Volver
                    </button>
                  )}
                  <button type="submit" className="cf-submit" disabled={status === 'sending'}>
                    {step < steps.length - 1 ? 'Siguiente' : status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>

                <p className="cf-note" role="status">
                  {status === 'error'
                    ? 'No pudimos enviarlo. Probá de nuevo o escribinos a primelogiclt@gmail.com.'
                    : 'Usamos tus datos solo para responderte. También podés escribirnos a primelogiclt@gmail.com.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
