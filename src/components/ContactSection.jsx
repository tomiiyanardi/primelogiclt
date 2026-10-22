import { useState } from 'react';

const options = [
  ['software', 'Software a medida', 'var(--violet)'],
  ['automation', 'Automatización', 'var(--ochre)'],
  ['ai', 'IA aplicada', 'var(--magenta)'],
  ['consulting', 'Consultoría', 'var(--cyan)'],
  ['other', 'Otro / no estoy seguro', 'rgba(255,255,255,.35)'],
];

const steps = [
  ['Nos contás el desafío', 'var(--violet)'],
  ['Charlamos sin costo', 'var(--ochre)'],
  ['Te proponemos un camino concreto', 'var(--magenta)'],
];

export default function ContactSection() {
  const [status, setStatus] = useState('idle');

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
          company: form.company.value,
          phone: form.phone.value,
          projectType: form.projectType.value,
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
    <section id="contacto" className="section">
      <div className="wrap">
        <div className="contact">
          <span className="blob blob-a" aria-hidden="true" />
          <span className="blob blob-b" aria-hidden="true" />
          <span className="blob blob-c" aria-hidden="true" />

          <div className="contact-side">
            <p className="contact-tag">contacto</p>
            <h2 className="display">Hablemos de<br />tu proyecto</h2>
            <p className="lead">Contanos qué necesitás y coordinamos una primera charla de diagnóstico, sin costo.</p>
            <ol className="contact-steps">
              {steps.map(([text, color], index) => (
                <li key={text} style={{ '--c': color }}>
                  <span>{index + 1}</span> {text}
                </li>
              ))}
            </ol>
            <p className="contact-mail">
              O si preferís, escribinos a:<br />
              <a href="mailto:primelogiclt@gmail.com">primelogiclt@gmail.com</a>
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend><span>01</span> Tus datos</legend>
              <div className="field-grid">
                <label className="field">
                  <span>Nombre y apellido *</span>
                  <input name="name" id="name" required placeholder="Ej: Ana Pérez" autoComplete="name" />
                </label>
                <label className="field">
                  <span>Email *</span>
                  <input type="email" name="email" id="email" required placeholder="ana@empresa.com" autoComplete="email" />
                </label>
                <label className="field">
                  <span>Empresa</span>
                  <input name="company" id="company" placeholder="Nombre de la empresa" autoComplete="organization" />
                </label>
                <label className="field">
                  <span>Teléfono / WhatsApp</span>
                  <input type="tel" name="phone" id="phone" placeholder="+54 9 ..." autoComplete="tel" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend><span>02</span> ¿Qué necesitás? *</legend>
              <div className="chips">
                {options.map(([value, label, color], index) => (
                  <label key={value} className="chip" style={{ '--c': color }}>
                    <input type="radio" name="projectType" value={value} required={index === 0} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>03</span> Tu proyecto *</legend>
              <label className="field">
                <span className="sr-only">Tu proyecto</span>
                <textarea name="message" id="message" rows="3" required placeholder="Contanos brevemente qué querés lograr, en qué etapa está y para cuándo lo necesitás." />
              </label>
            </fieldset>

            <button type="submit" className="pill pill-light pill-send" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              <span className="send-dot" aria-hidden="true">→</span>
            </button>

            <p className="form-note" role="status">
              {status === 'success' && 'Recibimos tu mensaje. Te respondemos pronto.'}
              {status === 'error' && 'No pudimos enviarlo. Probá de nuevo o escribinos a primelogiclt@gmail.com.'}
              {(status === 'idle' || status === 'sending') && 'Usamos tus datos solo para responderte.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
