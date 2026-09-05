import React from 'react';

const AboutSection = () => {
  return (
    <section id="nosotros" className="min-h-screen flex flex-col justify-center py-24 bg-brand-white">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
            <img 
              src="/jon2.png" 
              alt="Jon trabajando enfocado" 
              className="w-full max-w-md object-contain drop-shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 order-1 lg:order-2 space-y-12">
            <div>
              <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">¿Quiénes Somos?</h2>
              <p className="text-4xl font-extrabold text-brand-black mb-6">
                El motor detrás de la lógica
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Somos dos amigos con ganas de ir para adelante. Nos apasiona sumergirnos en los desafíos de nuestros clientes y construir la infraestructura que necesitan para crecer. No somos solo un proveedor, somos parte de tu equipo.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Misión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Implementar, desarrollar, y soportar sistemas e infraestructuras de IT para solucionar y/o ayudar a clientes a que el negocio mejore. Sumergiéndonos en el mismo como si fuese propio, compartiendo el mismo interés de beneficios. (Querer que el negocio del cliente esté bien como si fuese nuestro negocio).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-3">Visión</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Ser referencia regional de sistemas de alta calidad, donde seamos conocidos por implementar soluciones innovadoras, y poder solucionar problemas tecnológicos complejos.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
