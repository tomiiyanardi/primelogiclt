import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const projects = [
  { id: 'sfcervantes', name: 'SportFitness Cervantes', category: 'Sistema de gestión', image: '/SportFitness.webp' },
  { id: 'alcorta', name: 'Alcorta Descartables', category: 'Gestión comercial', image: '/alcortadescartablepantallas.webp' },
  { id: 'importadoralyl', name: 'Importadora LyL', category: 'E-commerce', image: '/lyl-1.png' },
  { id: 'flomstore', name: 'Flom Store', category: 'Tienda online', image: '/flomstore.webp' },
  { id: 'curvauno', name: 'Curva Uno', category: 'Experiencia digital', image: '/curvaunopantallas.webp' },
  { id: 'sftrapiche', name: 'SportFitness Trapiche', category: 'Infraestructura', image: '/SportFitness.webp' },
];

/** Counts up from zero the first time it scrolls into view. */
function CountUp({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="section section-graphite">
      <div className="wrap">
        <header className="proj-head">
          <div>
            <p className="eyebrow">Proyectos</p>
            <h2 className="display">Lo que ya<br />construimos.</h2>
          </div>
          <a className="proj-link" href="#casos">
            Ver casos
            <span className="proj-arrow" aria-hidden="true"><ArrowUpRight size={30} strokeWidth={2.2} /></span>
          </a>
        </header>

        <div className="bento">
          <div className="bento-card bento-paper">
            <span className="bento-num"><CountUp to={100} suffix="%" /></span>
            <span className="bento-label">a medida</span>
            <span className="bento-stripes" aria-hidden="true" />
          </div>
          <div className="bento-card" style={{ '--c': 'var(--cyan)' }}>
            <span className="bento-label">empresas que confían</span>
            <span className="bento-num"><CountUp to={6} prefix="+" /></span>
          </div>
          <div className="bento-card" style={{ '--c': 'var(--blue)' }}>
            <span className="bento-label">áreas de servicio</span>
            <span className="bento-num"><CountUp to={4} /></span>
          </div>
          <div className="bento-card bento-ink">
            <span className="bento-label">también hacemos</span>
            <span className="bento-text">Infraestructura y redes</span>
          </div>
        </div>

        <div id="casos" className="case-row">
          {projects.map((project, index) => (
            <Link key={project.id} to={`/proyecto/${project.id}`} className={`case ${index === 3 ? 'case-violet' : ''}`}>
              <span className="case-kicker">{project.category}</span>
              <span className="case-title">{project.name}</span>
              <span className="case-media">
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="case-more">
                Ver caso <ChevronRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <p className="case-hint">Deslizá para ver más <ArrowUpRight size={14} aria-hidden="true" /></p>
      </div>
    </section>
  );
}
