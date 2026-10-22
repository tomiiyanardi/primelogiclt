import { useEffect, useRef, useState } from 'react';

const services = [
  {
    kicker: 'Productos digitales a tu medida',
    title: ['Software', 'a medida'],
    text: 'Aplicaciones web, móviles y sistemas que convierten una operación compleja en una experiencia clara, rápida y preparada para crecer.',
    bullets: ['Web apps y aplicaciones móviles', 'Paneles de gestión y reportes', 'Sistemas pensados para tu operación'],
    color: 'var(--blue)',
    value: 'software',
  },
  {
    kicker: 'Menos tareas, más posibilidades',
    title: ['Automatización'],
    text: 'Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo se enfoque en aportar valor real.',
    bullets: ['Procesos conectados de punta a punta', 'Integraciones con los sistemas que ya usás', 'Reportes que se arman solos'],
    color: 'var(--cyan)',
    value: 'automation',
  },
  {
    kicker: 'Inteligencia aplicada a tu negocio',
    title: ['IA', 'aplicada'],
    text: 'IA generativa y análisis predictivo para potenciar decisiones y transformar información en nuevas oportunidades.',
    bullets: ['Asistentes con IA para tu equipo', 'Análisis predictivo', 'Datos convertidos en decisiones'],
    color: 'var(--violet)',
    value: 'ai',
  },
  {
    kicker: 'Una base sólida, un futuro abierto',
    title: ['Consultoría'],
    text: 'Acompañamiento técnico para priorizar, modernizar y sostener una plataforma que crezca con tu empresa.',
    bullets: ['Arquitectura escalable', 'Modernización de sistemas', 'Soporte y evolución continua'],
    color: 'var(--magenta)',
    value: 'consulting',
  },
];

/** Marks the service in the contact form so the visitor doesn't have to pick it again. */
const pickService = (value) => {
  const input = document.querySelector(`input[name="projectType"][value="${value}"]`);
  if (input) input.checked = true;
};

export default function ProductsSection() {
  const [active, setActive] = useState(0);
  const cards = useRef([]);

  // On phones the cards are stacked: the one crossing the middle of the screen opens
  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)');
    let observer;
    const setup = () => {
      observer?.disconnect();
      if (!media.matches) return;
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number(entry.target.dataset.index))),
        { rootMargin: '-45% 0px -45% 0px' },
      );
      cards.current.forEach((card) => card && observer.observe(card));
    };
    setup();
    media.addEventListener('change', setup);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', setup);
    };
  }, []);

  return (
    <section id="servicios" className="section">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Servicios</p>
          <h2 className="display">Cuatro formas de hacer<br />avanzar tu negocio.</h2>
        </header>

        <div className="svc-row">
          {services.map((service, index) => {
            const open = active === index;
            return (
              <article
                key={service.value}
                ref={(node) => { cards.current[index] = node; }}
                data-index={index}
                className={`svc ${open ? 'is-open' : ''}`}
                style={{ '--c': service.color }}
                onMouseEnter={() => setActive(index)}
              >
                <h3 className="svc-title">
                  <button type="button" aria-expanded={open} aria-controls={`svc-${index}`} onClick={() => setActive(index)} onFocus={() => setActive(index)}>
                    <span className="svc-kicker">{service.kicker}</span>
                    {service.title.map((line) => <span key={line} className="svc-line">{line}</span>)}
                  </button>
                </h3>
                <div className="svc-body" id={`svc-${index}`}>
                  <p>{service.text}</p>
                  <ul>
                    {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <div className="svc-actions">
                    <a className="pill pill-light" href="#contacto" onClick={() => pickService(service.value)} tabIndex={open ? 0 : -1}>
                      Quiero este servicio <span aria-hidden="true">→</span>
                    </a>
                    <a className="link-under" href="#proyectos" tabIndex={open ? 0 : -1}>Ver proyectos →</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
