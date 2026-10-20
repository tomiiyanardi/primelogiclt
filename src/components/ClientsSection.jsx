import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ChapterBackdrop from './ChapterBackdrop';

const clients = [
  ['sfcervantes', 'SportFitness Cervantes', 'logoSFC'],
  ['sftrapiche', 'SportFitness Trapiche', 'logoSFT'],
  ['importadoralyl', 'Importadora LyL', 'logoImportadoraLyL'],
  ['flomstore', 'Flom Store', 'logoflom'],
  ['alcorta', 'Alcorta Descartables', 'logoalcorta'],
  ['curvauno', 'Curva Uno', 'logo-curvauno'],
];

export default function ClientsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="clientes" className="landing-window relative isolate" style={{ background: '#0d1a24', padding: '80px 0', minHeight: '70svh', borderRadius: '28px 28px 0 0', marginTop: '-24px' }}>
      <ChapterBackdrop variant="grid" label="05" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-1">
        <p className="section-label">05 / Negocios reales. Trabajo compartido.</p>
        <h2>
          <Motion.span
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="inline-block text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Empresas que confían en nosotros
          </Motion.span>
        </h2>
        <div className="clients-grid">
          {clients.map(([id, name, logo], index) => (
            <Motion.div
              key={id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link to={`/proyecto/${id}`} className="client-card" style={{ display: 'block' }}>
                <img src={`/${logo}.webp`} alt={name} className={id === 'alcorta' ? 'is-badge' : undefined} width="240" height="120" loading="lazy" decoding="async" />
                <span>
                  {name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
