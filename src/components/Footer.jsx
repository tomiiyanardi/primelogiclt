import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Primelogic LT Logo" className="h-10 w-auto brightness-0 invert opacity-90" />
            <span className="font-bold text-2xl tracking-tight opacity-90">Primelogic LT</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#ofrecemos" className="hover:text-white transition">Ofrecemos</a>
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="#nosotros" className="hover:text-white transition">Nosotros</a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 border-t border-gray-800 pt-8">
          © {new Date().getFullYear()} Primelogic LT. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
