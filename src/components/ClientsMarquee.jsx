import { Link } from 'react-router-dom';

const clients = [
  ['sfcervantes', 'SportFitness Cervantes', 'logoSFC'],
  ['sftrapiche', 'SportFitness Trapiche', 'logoSFT'],
  ['importadoralyl', 'Importadora LyL', 'logoImportadoraLyL'],
  ['flomstore', 'Flom Store', 'logoflom'],
  ['alcorta', 'Alcorta Descartables', 'logoalcorta'],
  ['curvauno', 'Curva Uno', 'logo-curvauno'],
];

export default function ClientsMarquee() {
  return (
    <section id="clientes" className="logos" aria-labelledby="logos-title">
      <h2 id="logos-title" className="eyebrow eyebrow-center">Quienes ya confiaron en nosotros</h2>
      <div className="logos-mask">
        <div className="logos-track">
          {[0, 1].map((copy) =>
            clients.map(([id, name, logo]) => (
              <Link
                key={`${copy}-${id}`}
                to={`/proyecto/${id}`}
                className="logos-item"
                aria-hidden={copy ? 'true' : undefined}
                tabIndex={copy ? -1 : undefined}
              >
                <img src={`/${logo}.webp`} alt={copy ? '' : name} className={id === 'alcorta' ? 'is-badge' : undefined} width="240" height="120" loading="lazy" decoding="async" />
              </Link>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
