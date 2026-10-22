import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <Link to="/#inicio" className="nav-brand" aria-label="Primelogic LT, inicio">
          <img src="/logo.svg" alt="" width="28" height="28" />
          <span>primelogic<small>LT</small></span>
        </Link>
        <nav aria-label="Secciones" className="footer-links">
          <Link to="/#servicios">Servicios</Link>
          <Link to="/#proyectos">Proyectos</Link>
          <Link to="/#equipo">Equipo</Link>
          <a href="https://instagram.com/primelogiclt" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:primelogiclt@gmail.com">primelogiclt@gmail.com</a>
        </nav>
      </div>
      <div className="wrap footer-legal">
        <span>© {new Date().getFullYear()} Primelogic LT</span>
        <span>Mendoza, Argentina</span>
      </div>
    </footer>
  );
};

export default Footer;
