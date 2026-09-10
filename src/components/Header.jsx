import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="Primelogic LT Logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-bold text-xl text-brand-blue tracking-tight">Primelogic LT</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-black">
          <Link to="/#ofrecemos" className="hover:text-brand-blue transition-colors">Ofrecemos</Link>
          <Link to="/#servicios" className="hover:text-brand-blue transition-colors">Servicios</Link>
          <Link to="/#proceso" className="hover:text-brand-blue transition-colors">Proceso</Link>
          <Link to="/#nosotros" className="hover:text-brand-blue transition-colors">Nosotros</Link>
          <Link to="/#clientes" className="hover:text-brand-blue transition-colors">Clientes</Link>
        </nav>
        
        <Link to="/#contacto" className="hidden md:block px-6 py-2 bg-brand-blue text-brand-white rounded-full font-medium hover:bg-opacity-90 hover:-translate-y-0.5 transition-all">
          Contactar
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div id="mobile-navigation" className={`md:hidden absolute top-20 left-0 w-full bg-brand-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col px-6 py-4 space-y-4 font-medium text-brand-black text-center">
          <Link to="/#ofrecemos" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Ofrecemos</Link>
          <Link to="/#servicios" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Servicios</Link>
          <Link to="/#proceso" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Proceso</Link>
          <Link to="/#nosotros" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Nosotros</Link>
          <Link to="/#clientes" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Clientes</Link>
          <Link to="/#contacto" onClick={toggleMenu} className="w-full mt-2 px-6 py-2 bg-brand-blue text-brand-white rounded-full font-medium hover:bg-opacity-90 transition-all text-center">
            Contactar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
