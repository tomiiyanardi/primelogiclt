import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

// Accenture-style tall cards: a title on an image, the text opens on hover or tap
const cards = [
  {
    title: 'Tiempo para lo importante',
    text: 'Automatizamos procesos clave para que tu equipo deje de repetir tareas y pueda enfocarse en hacer crecer el negocio.',
    art: 'art-violet',
    image: '/mascots/mascot-sitting-laptop.svg',
  },
  {
    title: 'Tu crecimiento nos mueve',
    text: 'Nos involucramos en los desafíos de tu empresa. Si a vos te va bien, estamos haciendo bien nuestro trabajo.',
    art: 'art-blue',
    image: '/mascots/mascot-celebrate.svg',
  },
  {
    title: 'El compromiso es compartido',
    text: 'Diseñamos, construimos y acompañamos cada solución con el mismo interés que vos ponés en tu negocio.',
    art: 'art-magenta',
    image: '/mascots/mascot-wave.svg',
  },
  {
    title: 'Tu proyecto, nuestra lógica',
    text: 'No hacemos tecnología por moda: creamos soluciones específicas para destrabar cuellos de botella y multiplicar la rentabilidad.',
    art: 'art-paper',
    image: '/mascots/mascot-point-forward.svg',
  },
];

export default function OfferingsSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="enfoque" className="section">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">Nuestro enfoque</p>
          <h2 className="display">El negocio primero.<br />La tecnología, después.</h2>
        </header>

        <div className="insight-row">
          {cards.map((card, index) => {
            const isOpen = open === index;
            return (
              <article key={card.title} className={`insight ${card.art} ${isOpen ? 'is-open' : ''}`}>
                {card.image && <img className="insight-img" src={card.image} alt="" width="400" height="620" loading="lazy" />}
                <h3>{card.title}</h3>
                <div className="insight-more" id={`insight-${index}`}>
                  <p>{card.text}</p>
                </div>
                <button
                  type="button"
                  className="insight-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`insight-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  {isOpen ? <>Cerrar <X size={16} aria-hidden="true" /></> : <>Ver más <ChevronRight size={16} aria-hidden="true" /></>}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
