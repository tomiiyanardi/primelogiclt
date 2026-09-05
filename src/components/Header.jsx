import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Primelogic LT Logo" className="h-8 w-auto" />
          <span className="font-bold text-xl text-brand-blue tracking-tight">Primelogic LT</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-black">
          <a href="#ofrecemos" className="hover:text-brand-blue transition-colors">Ofrecemos</a>
          <a href="#servicios" className="hover:text-brand-blue transition-colors">Servicios</a>
          <a href="#nosotros" className="hover:text-brand-blue transition-colors">Nosotros</a>
          <a href="#clientes" className="hover:text-brand-blue transition-colors">Clientes</a>
        </nav>
        
        <button className="hidden md:block px-6 py-2 bg-brand-blue text-brand-white rounded-full font-medium hover:bg-opacity-90 transition-all">
          Contactar
        </button>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-brand-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-6 py-4 space-y-4 font-medium text-brand-black text-center">
          <a href="#ofrecemos" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Ofrecemos</a>
          <a href="#servicios" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Servicios</a>
          <a href="#nosotros" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Nosotros</a>
          <a href="#clientes" onClick={toggleMenu} className="hover:text-brand-blue transition-colors py-2 border-b border-gray-50">Clientes</a>
          <button className="w-full mt-2 px-6 py-2 bg-brand-blue text-brand-white rounded-full font-medium hover:bg-opacity-90 transition-all">
            Contactar
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
