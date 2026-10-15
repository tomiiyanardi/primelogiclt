import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [['ofrecemos', 'Enfoque'], ['servicios', 'Servicios'], ['proceso', 'Proceso'], ['nosotros', 'Nosotros'], ['clientes', 'Clientes']];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); event.currentTarget.querySelector('button').focus(); } }}>
      <nav aria-label="Navegación principal" className="site-nav">
        <Link to="/#inicio" onClick={() => setOpen(false)} aria-label="Primelogic LT, inicio"><img src="/logo.svg" alt="Primelogic LT" width="160" height="36" /></Link>
        <div className="desktop-nav">{links.map(([id, label]) => <Link key={id} to={`/#${id}`}>{label}</Link>)}</div>
        <Link className="nav-contact" to="/#contacto" onClick={() => setOpen(false)}>Hablemos <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <nav id="mobile-navigation" aria-label="Navegación móvil" className="mobile-nav">{links.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>}
    </header>
  );
}
