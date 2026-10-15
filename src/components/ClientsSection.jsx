import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealText } from '../utils/animations';

const clients = [
  ['sfcervantes', 'SportFitness Cervantes', 'logoSFC'],
  ['sftrapiche', 'SportFitness Trapiche', 'logoSFT'],
  ['importadoralyl', 'Importadora LyL', 'logoImportadoraLyL'],
  ['flomstore', 'Flom Store', 'logoflom'],
  ['alcorta', 'Alcorta Descartables', 'logoalcorta'],
  ['curvauno', 'Curva Uno', 'logo-curvauno'],
];
export default function ClientsSection() {
  return <section id="clientes" className="landing-window canvas-light">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <p className="section-label">Negocios reales. Trabajo compartido.</p>
      <h2><RevealText className="text-3xl md:text-5xl font-extrabold tracking-tight">Empresas que confían en nosotros</RevealText></h2>
      <div className="clients-grid">{clients.map(([id, name, logo]) => <Link key={id} to={`/proyecto/${id}`} className="client-card">
        <img src={`/${logo}.webp`} alt={name} width="240" height="120" loading="lazy" decoding="async" />
        <span>{name}<ArrowUpRight size={16} aria-hidden="true" /></span>
      </Link>)}</div>
    </div>
  </section>;
}
