import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const ClientsSection = () => {
  const baseClients = [
    { 
      name: "SportFitness Cervantes", 
      logo: "/logoSFC.png",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-100" 
    },
    { 
      name: "SportFitness Trapiche", 
      logo: "/logoSFT.png",
      bg: "bg-gradient-to-br from-indigo-50 to-purple-100"
    },
    { 
      name: "Importadora LyL", 
      logo: "/logoImportadoraLyL.png",
      bg: "bg-gradient-to-br from-purple-50 to-pink-100"
    },
    { 
      name: "Flom Store", 
      logo: "/logoflom.png",
      bg: "bg-gradient-to-br from-pink-50 to-rose-100"
    },
    { 
      name: "Alcorta Descartables", 
      logo: "/logoalcorta.png",
      bg: "bg-gradient-to-br from-rose-50 to-orange-100"
    },
    { 
      name: "Curva Uno", 
      logo: "/logo-curvauno.png",
      bg: "bg-gradient-to-br from-orange-50 to-amber-100"
    }
  ];

  // Duplicate the array to ensure the infinite loop has enough slides to never break seamlessly
  const clients = [...baseClients, ...baseClients];

  return (
    <section id="clientes" className="min-h-screen flex flex-col justify-center bg-gray-50 border-t border-gray-100 overflow-hidden py-10">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Nuestros Clientes</h2>
          <p className="text-4xl font-extrabold text-brand-black">
            Empresas que confían en nosotros
          </p>
        </div>

        <div className="w-full">
          {/* DESKTOP VIEW: Carousel with Swiper */}
          <div className="hidden md:block w-full border-y border-gray-200 shadow-2xl relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={3}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={true}
              className="w-full"
            >
              {clients.map((client, index) => (
                <SwiperSlide key={index}>
                  <div className={`
                    group relative flex flex-col items-center justify-center 
                    aspect-square 
                    border-r border-white/20
                    ${client.bg}
                    overflow-hidden
                    transition-all duration-700
                    hover:z-10 hover:shadow-2xl hover:scale-[1.02]
                  `}>
                    
                    {/* Background Animation Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent transition-opacity duration-700"></div>

                    {/* Logo Container - Perfectly Centered */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                      <img 
                        src={client.logo} 
                        alt={`Logo de ${client.name}`} 
                        className="
                          max-w-full max-h-full object-contain 
                          grayscale opacity-70 
                          group-hover:grayscale-0 group-hover:opacity-100 
                          group-hover:scale-110
                          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                        "
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* MOBILE VIEW: Stacked Rectangles */}
          <div className="md:hidden flex flex-col w-full border-y border-gray-200">
            {baseClients.map((client, index) => (
              <div 
                key={index} 
                className={`
                  group relative flex flex-col items-center justify-center 
                  h-40 w-full
                  border-b border-white/20 last:border-b-0
                  ${client.bg}
                  overflow-hidden
                  transition-all duration-500
                `}
              >
                {/* Logo Container - Perfectly Centered */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                  <img 
                    src={client.logo} 
                    alt={`Logo de ${client.name}`} 
                    className="
                      max-w-full max-h-full object-contain 
                      grayscale opacity-80 
                      transition-all duration-500
                    "
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
