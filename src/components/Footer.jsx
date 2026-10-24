import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Instagram } from 'lucide-react';

export default function Footer() {
  return <footer className="site-footer">
    <div className="wrap">
      <div className="footer-invitation"><div><p className="eyebrow">EL PRÓXIMO PASO, JUNTOS</p><h2>BUENAS IDEAS.<br /><span>MEJORES NEGOCIOS.</span></h2></div><Link to="/#contacto" className="footer-start" aria-label="Hablemos de tu próximo proyecto"><ArrowUpRight aria-hidden="true" /><span>Empecemos<br />algo bueno.</span></Link></div>
      <div className="footer-grid">
        <div className="footer-about"><Link to="/#inicio" className="nav-brand" aria-label="Primelogic LT, inicio"><span className="nav-brand-symbol"><img src="/logo.svg" alt="" width="28" height="28" /></span><span>primelogic<small>LT</small></span></Link><p>La lógica detrás de tu crecimiento.<br />Tecnología con personas del otro lado.</p><span className="footer-origin"><i /> Mendoza, Argentina · Trabajamos sin fronteras.</span></div>
        <nav aria-label="Secciones" className="footer-directory"><p>EXPLORÁ</p><Link to="/#enfoque">Nuestro enfoque</Link><Link to="/#servicios">Servicios</Link><Link to="/#proceso">Cómo trabajamos</Link><Link to="/#proyectos">Proyectos</Link><Link to="/#equipo">Equipo</Link></nav>
        <div className="footer-connect"><p>CONECTEMOS</p><a href="mailto:primelogiclt@gmail.com">primelogiclt@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://instagram.com/primelogiclt" target="_blank" rel="noopener noreferrer"><Instagram size={16} aria-hidden="true" /> Instagram <ArrowUpRight size={16} aria-hidden="true" /></a><span>Tu negocio importa.<br />Nos involucramos para hacerlo crecer.</span></div>
      </div>
      <div className="footer-signature" aria-hidden="true">primelogic<span>↗</span></div>
      <div className="footer-legal"><span>© {new Date().getFullYear()} Primelogic LT</span><Link to="/#inicio">Volver al inicio <ArrowUp size={15} aria-hidden="true" /></Link></div>
    </div>
  </footer>;
}
