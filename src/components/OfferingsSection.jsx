import React from 'react';

const OfferingsSection = () => {
  return (
    <section id="ofrecemos" className="min-h-screen flex flex-col justify-center py-24 bg-brand-white">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text Side - Clean Typography Layout */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Qué Ofrecemos?</h2>
              <p className="text-4xl font-extrabold text-brand-black leading-tight">
                Tu éxito es nuestro objetivo principal
              </p>
            </div>

            <div className="space-y-10 pl-4 border-l border-gray-200">
              <div className="relative">
                <div className="absolute -left-[17px] top-2 w-2 h-2 bg-brand-blue rounded-full"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Optimización Real</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  Queremos que nuestros clientes ganen plata o tiempo automatizando procesos clave de su negocio.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[17px] top-2 w-2 h-2 bg-brand-blue rounded-full"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Beneficio Mutuo</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  Si nuestros clientes ganan, nosotros también. Nuestra mayor satisfacción es el éxito y crecimiento de nuestros clientes.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[17px] top-2 w-2 h-2 bg-brand-blue rounded-full"></div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Compromiso Total</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  Tenemos el mismo compromiso. Nosotros queremos tanto como el cliente alcanzar la mejor versión de sus proyectos y sistemas.
                </p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img 
              src="/jon1.png" 
              alt="Jon, ingeniero" 
              className="w-full max-w-md object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
