import { motion as Motion, useReducedMotion } from 'framer-motion';
import ChapterBackdrop from './ChapterBackdrop';

const values = [
  ['01', 'Tiempo para lo importante.', 'Automatizamos procesos clave para que tu equipo deje de repetir tareas y pueda enfocarse en hacer crecer el negocio.'],
  ['02', 'Tu crecimiento nos mueve.', 'Nos involucramos en los desafíos de tu empresa. Si a vos te va bien, estamos haciendo bien nuestro trabajo.'],
  ['03', 'El compromiso es compartido.', 'Diseñamos, construimos y acompañamos cada solución con el mismo interés que vos ponés en tu negocio.'],
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function OfferingsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="ofrecemos" className="manifesto-window">
      <ChapterBackdrop variant="topo" label="01" />
      <div className="chapter-content">
        <p className="chapter-kicker">
          01 / NUESTRO ENFOQUE <span>EL NEGOCIO PRIMERO</span>
        </p>

        <h2 className="manifesto-heading">
          <Motion.span
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="inline-block"
          >
            Tu próximo paso merece
          </Motion.span>{' '}
          <em>un equipo de tu lado.</em>
        </h2>

        <Motion.div
          className="value-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {values.map(([n, title, text]) => (
            <Motion.article variants={itemVariants} key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
