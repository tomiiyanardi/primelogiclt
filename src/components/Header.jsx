import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  ['enfoque', 'Enfoque'],
  ['servicios', 'Servicios'],
  ['proceso', 'Proceso'],
  ['proyectos', 'Proyectos'],
  ['equipo', 'Equipo'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`site-header ${scrolled || open ? 'is-solid' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <nav aria-label="Navegación principal" className="site-nav">
        <Link to="/#inicio" onClick={close} className="nav-brand" aria-label="Primelogic LT, inicio">
          <img src="/logo.svg" alt="" width="28" height="28" />
          <span>primelogic<small>LT</small></span>
        </Link>

        <div className="nav-links">
          {links.map(([id, label]) => (
            <Link key={id} to={`/#${id}`}>{label}</Link>
          ))}
        </div>

        <Link className="pill pill-light nav-cta" to="/#contacto" onClick={close}>
          Hablemos <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="nav-mobile">
          {[...links, ['contacto', 'Contacto']].map(([id, label]) => (
            <Link key={id} to={`/#${id}`} onClick={close}>{label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
