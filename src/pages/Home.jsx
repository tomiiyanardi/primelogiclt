import React from 'react';
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Database, AppWindow, SearchCode, Settings, Layers, MonitorSmartphone, Code2, MapPin, ChevronRight, CheckCircle } from "lucide-react";
import Hero from "../components/Hero"; 
import { fadeUp, staggerContainer, TypewriterText } from "../utils/animations";
import InteractiveMap from "../components/InteractiveMap";

// Los logos de tecnologías
const techLogos = [
  { name: "React JS", url: "https://cdn.simpleicons.org/react" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "AWS", url: "https://skillicons.dev/icons?i=aws" }, 
  { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker" },
  { name: "Tailwind", url: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe" },
  { name: "Java", url: "https://skillicons.dev/icons?i=java" }, 
  { name: "Spring", url: "https://cdn.simpleicons.org/springboot" }
];

// Array de Proyectos para el Carrusel
const proyectosData = [
  {
    id: "proyecto_alcorta",
    title: "Alcorta\nDescartable",
    category: "Dashboard & Gestión",
    image: "/alcortadescartablepantallas.png",
    tags: "Contabilidad • Stock • Historial de Ventas"
  },
  {
    id: "proyecto_curva",
    title: "Curva Uno\nBooking System",
    category: "Reserva de Simuladores",
    image: "/curvaunopantallas.png",
    tags: "Google Auth • ABM • Pagos MercadoPago"
  },
  {
    id: "proyecto_ecommerce",
    title: "E-Commerce\nIntegral",
    category: "Plataforma de Ventas",
    image: "/ecommerce.png",
    tags: "MercadoPago • Envíos • Variantes"
  },
  {
    id: "proyecto_flomstore",
    title: "Flom Store\nApple Shop",
    category: "Premium Retail & Stock",
    image: "/flomstore.png",
    tags: "Landing Dinámica • Dashboard • Filtros Avanzados"
  }
];

export default function Home({ navigateTo, heroScale, heroTextY, heroTextOpacity, isFirstVisit }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      {/* ESTILO PARA OCULTAR LA BARRA DE SCROLL EN EL CARRUSEL */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Hero heroScale={heroScale} heroTextY={heroTextY} heroTextOpacity={heroTextOpacity} isFirstVisit={isFirstVisit} />

      {/* TECNOLOGÍAS Y LEYES */}
      <section className="min-h-[100dvh] snap-start flex flex-col bg-[#F4F4F9] pt-24 pb-12 md:pt-36 md:pb-20 relative">
        <div className="w-full bg-white border-y border-[#8A95A5]/20 py-6 md:py-8 mb-8 md:mb-12 shadow-sm flex flex-col overflow-hidden relative shrink-0">
          <span className="text-center text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#8A95A5] mb-5 md:mb-8">
            Tecnologías de clase mundial que potencian nuestros sistemas
          </span>
          <div className="absolute left-0 bottom-0 w-12 md:w-40 h-16 md:h-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 w-12 md:w-40 h-16 md:h-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 35 }} className="flex items-center whitespace-nowrap w-max">
            <div className="flex gap-12 md:gap-20 items-center px-6 md:px-10">
              {techLogos.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3 group cursor-default">
                  <img src={tech.url} alt={`Logo de ${tech.name}`} className="h-6 md:h-9 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 object-contain" loading="lazy" />
                  <span className="font-black text-sm md:text-lg uppercase tracking-widest text-[#8A95A5]/40 group-hover:text-[#0A192F] transition-colors duration-500">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-12 md:gap-20 items-center px-6 md:px-10">
              {techLogos.map((tech, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-3 group cursor-default">
                  <img src={tech.url} alt={`Logo de ${tech.name}`} className="h-6 md:h-9 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 object-contain" loading="lazy" />
                  <span className="font-black text-sm md:text-lg uppercase tracking-widest text-[#8A95A5]/40 group-hover:text-[#0A192F] transition-colors duration-500">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="px-4 md:px-6 max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-[#0074D9] font-black tracking-widest uppercase text-[9px] md:text-sm mb-2 md:mb-4 block">Nuestro Diferencial</span>
            <h2 className="flex justify-center text-2xl sm:text-3xl md:text-6xl font-black text-[#0A192F] tracking-tighter">
              <TypewriterText text="Las 3 Leyes de PrimeLogic." />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
            {[
              { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />, title: "Cero Deuda Técnica", desc: "Sistemas escritos desde cero. Código inmortal y escalable." },
              { icon: <Zap className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />, title: "Velocidad Absoluta", desc: "Optimizamos el servidor para que tu plataforma cargue en milisegundos." },
              { icon: <Database className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />, title: "Arquitectura Elástica", desc: "Ingeniería preparada para hiper-crecimiento sólido." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="group bg-white p-5 md:p-10 rounded-[1.2rem] md:rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-[#0074D9]/10 hover:-translate-y-2 border border-[#8A95A5]/10 transition-all duration-500 cursor-default">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#F4F4F9] rounded-xl flex items-center justify-center text-[#0A192F] mb-3 md:mb-6 group-hover:bg-[#0074D9] group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" })}
                </div>
                <h3 className="text-lg md:text-2xl font-black text-[#0A192F] mb-1 md:mb-4">{item.title}</h3>
                <p className="text-[#8A95A5] font-bold text-xs md:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <section className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-white relative pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-10 md:mb-20">
            <span className="text-[#0074D9] font-black tracking-widest uppercase text-[9px] md:text-sm mb-2 md:mb-4 block">Nuestra Promesa</span>
            <h2 className="flex justify-center text-3xl sm:text-4xl md:text-6xl font-black mb-2 md:mb-6 tracking-tighter text-[#0A192F]">
              <TypewriterText text="Filosofía de Trabajo." />
            </h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-[#8A95A5] text-xs sm:text-sm md:text-xl max-w-2xl mx-auto font-bold px-4">
              Construimos herramientas digitales que se adaptan a tu negocio, no al revés.
            </motion.p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Diseño 100% Responsive", icon: <AppWindow className="w-8 h-8 md:w-10 md:h-10 text-[#0074D9]" aria-hidden="true"/>, desc: "Tu sistema se verá y funcionará impecable en cualquier dispositivo. Desde monitores ultrawide hasta teléfonos móviles, la experiencia de usuario está garantizada." },
              { title: "Software a Medida", icon: <SearchCode className="w-8 h-8 md:w-10 md:h-10 text-[#0074D9]" aria-hidden="true"/>, desc: "No usamos plantillas prefabricadas. Analizamos tu modelo de negocio y programamos soluciones únicas, pensadas exclusivamente para potenciar tu empresa." },
              { title: "Adaptabilidad Total", icon: <Settings className="w-8 h-8 md:w-10 md:h-10 text-[#0074D9]" aria-hidden="true"/>, desc: "Nos ajustamos exactamente a lo que necesites. Tu plataforma puede evolucionar y escalar sumando nuevas funcionalidades sin limitaciones técnicas." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="group p-6 md:p-10 bg-[#F4F4F9] rounded-[1.2rem] md:rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-[#0074D9]/5 hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-[#0074D9]/10 cursor-default">
                <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">{item.icon}</div>
                <h3 className="text-lg md:text-2xl font-black text-[#0A192F] mb-2 md:mb-4">{item.title}</h3>
                <p className="text-[#8A95A5] font-semibold leading-relaxed text-[12px] md:text-base group-hover:text-[#0A192F]/70 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section id="soluciones" className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-transparent text-white relative pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0074D9] to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="flex justify-center text-3xl sm:text-4xl md:text-7xl font-black mb-2 md:mb-6 tracking-tighter text-white">
              <TypewriterText text="Armamento Digital." />
            </h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-white/80 text-xs sm:text-sm md:text-xl max-w-2xl mx-auto font-bold px-4">
              Soluciones desarrolladas para dominar el entorno web.
            </motion.p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { title: "Landing Pages", icon: <Layers className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true"/>, desc: "Interfaces líquidas que capturan leads y venden por vos 24/7." },
              { title: "Plataformas Web App", icon: <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true"/>, desc: "Sistemas complejos, dashboards y SaaS con React." },
              { title: "Arquitectura Cloud", icon: <Code2 className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true"/>, desc: "Bases de datos estructuradas para no caerse jamás." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="group p-5 md:p-10 bg-white/5 backdrop-blur-lg border border-white/5 hover:border-[#0074D9]/50 hover:bg-[#0074D9]/10 hover:shadow-[0_0_30px_rgba(0,116,217,0.2)] rounded-[1.2rem] md:rounded-[2.5rem] transition-all duration-500 cursor-default">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#0074D9] rounded-xl flex items-center justify-center text-white mb-3 md:mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">{item.icon}</div>
                <h3 className="text-base md:text-2xl font-black mb-1 md:mb-4 text-white group-hover:text-[#0074D9] transition-colors">{item.title}</h3>
                <p className="text-white/70 font-semibold leading-relaxed text-[11px] md:text-base group-hover:text-white/90 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROYECTOS - EL NUEVO CARRUSEL HORIZONTAL */}
      <section id="proyectos" className="min-h-[100dvh] snap-start flex flex-col bg-[#F4F4F9] pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-8 gap-4 md:gap-6">
            <div>
              <h2 className="flex justify-start text-3xl sm:text-4xl md:text-7xl font-black text-[#0A192F] tracking-tighter mb-2 md:mb-4">
                <TypewriterText text="Sistemas en Acción." />
              </h2>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-xl max-w-xl">
                Lo que construimos no se rompe. Explorá cómo la ingeniería de PrimeLogic impacta en la industria deslizando nuestros últimos casos de éxito.
              </motion.p>
            </div>
            <button onClick={() => navigateTo("contacto")} className="bg-[#0A192F] text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full font-black text-[9px] md:text-sm hover:bg-[#0074D9] hover:shadow-[0_0_20px_rgba(0,116,217,0.4)] transition-all shrink-0 z-10">
              Quiero un sistema así
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL CARRUSEL SWIPEABLE */}
        <div className="w-full mt-4 md:mt-8">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-10 pb-12 pt-4 px-4 md:px-12 lg:px-[calc((100vw-1280px)/2)] scroll-smooth hide-scrollbar">
            {proyectosData.map((proy) => (
              <motion.div 
                key={proy.id}
                onClick={() => navigateTo(proy.id)} 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true, amount: 0.2 }}
                className="group relative w-[85vw] md:w-[700px] lg:w-[900px] shrink-0 snap-center rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer aspect-video bg-[#112240] border border-[#8A95A5]/20"
              >
                <img 
                  src={proy.image} 
                  alt={proy.title.replace('\n', ' ')} 
                  loading="lazy" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90 group-hover:opacity-100 group-hover:bg-[#0A192F]/70 transition-all duration-500"></div>
                <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 right-5 md:right-10 group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-500">
                  <span className="text-[#00E5FF] font-black text-[9px] md:text-sm uppercase tracking-widest mb-1 md:mb-3 block shadow-black drop-shadow-md">
                    {proy.category}
                  </span>
                  <h3 className="text-white font-black text-2xl md:text-5xl leading-tight drop-shadow-xl">
                    {proy.title.split('\n').map((line, j) => (
                      <React.Fragment key={j}>
                        {line}<br className="hidden md:block"/>
                      </React.Fragment>
                    ))}
                  </h3>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none px-4 text-center">
                  <span className="text-white font-bold text-xs md:text-lg mb-3 bg-[#0074D9] px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl">
                    Ver Caso de Estudio <ChevronRight size={20}/>
                  </span>
                  <span className="text-white/90 font-black text-[10px] md:text-sm uppercase tracking-widest leading-relaxed drop-shadow-md">
                    {proy.tags}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-[#F4F4F9] pt-12 pb-12 md:pt-20 md:pb-20">
        <div className="max-w-7xl mx-auto w-full bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-sm border border-[#8A95A5]/10 overflow-hidden my-auto hover:shadow-2xl transition-shadow duration-700">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center p-5 md:p-10">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0A192F] mb-3 md:mb-8 tracking-tighter leading-tight">
                Dos amigos, una <br className="hidden md:block"/><span className="text-[#0074D9]">visión global.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-xl leading-relaxed mb-4 md:mb-8">
                Somos <strong className="text-[#0A192F] font-black">Tomás y Luciano</strong>. Empezamos en una habitación y construimos PrimeLogic LT porque nos cansamos de ver software lento y genérico.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-3 md:space-y-6">
                {["Atención directa con los fundadores.", "Agilidad radical: De idea a código en semanas.", "Foco obsesivo en arquitectura limpia."].map((text, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-2 md:gap-4 text-[#0A192F] font-black text-[10px] sm:text-xs md:text-lg group cursor-default">
                    <CheckCircle className="text-[#0074D9] shrink-0 w-4 h-4 md:w-6 md:h-6 group-hover:scale-125 transition-transform duration-300" aria-hidden="true"/> {text}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="relative h-[250px] md:h-[500px] w-full rounded-[1rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0A192F] to-[#112240] overflow-hidden group shadow-2xl flex flex-col justify-center items-center p-8 text-center border border-[#0074D9]/20">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00E5FF] via-transparent to-transparent pointer-events-none"></div>
              <Code2 className="w-16 h-16 md:w-24 md:h-24 text-[#0074D9] mb-6 opacity-80 group-hover:scale-110 group-hover:text-[#00E5FF] transition-all duration-700" />
              <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-4 tracking-tight">El código es nuestro arte.</h3>
              <p className="text-white/70 font-semibold text-[10px] md:text-sm max-w-sm">"Cada línea que escribimos está diseñada para que tu negocio sea más rentable."</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-transparent relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 my-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="w-full md:w-1/2 text-center md:text-left z-10">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0074D9]/30 text-[#00E5FF] font-black tracking-widest uppercase text-[9px] md:text-xs mb-6 bg-[#0074D9]/10">
              <MapPin size={14} /> Hecho en Mendoza
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
              Talento local, <br className="hidden md:block"/>impacto <span className="text-[#0074D9]">mundial.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-sm md:text-xl font-medium leading-relaxed max-w-md mx-auto md:mx-0">
              Operamos desde <strong className="text-white font-bold">Godoy Cruz, Mendoza</strong>. No necesitamos oficinas de cristal para exportar ingeniería de software de alta gama aprovechando la agilidad de nuestra estructura nativa digital.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: false, amount: 0.3 }} className="w-full md:w-1/2 relative bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,116,217,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0074D9]/10 to-transparent z-0 pointer-events-none"></div>
            <div className="relative z-10 w-full h-full">
              <InteractiveMap />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="relative min-h-[100dvh] snap-start flex flex-col bg-transparent overflow-hidden pt-28 md:pt-36 pb-6 md:pb-8 px-5 md:px-16">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline preload="metadata" poster="/nave-poster.jpg" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70">
            <source src="/nave.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-transparent backdrop-blur-[2px]"></div>
          <div className="absolute inset-x-0 top-0 h-20 md:h-40 bg-gradient-to-b from-[#0A192F] to-transparent z-0"></div>
        </div>
        <div className="relative z-10 flex-grow flex flex-col items-start justify-center max-w-[1400px] mx-auto w-full my-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-left max-w-4xl flex flex-col items-start">
            <motion.span variants={fadeUp} className="inline-block px-3 py-1.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black tracking-widest uppercase rounded-full border border-white/30 text-white mb-3 md:mb-4 bg-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Fase final del proyecto
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[12vw] md:text-[7rem] lg:text-[7.5rem] font-black text-white tracking-tighter mb-2 md:mb-5 leading-[0.9] drop-shadow-2xl">
              Es hora de aterrizar <br className="hidden lg:block"/> <span className="text-[#0074D9]">tus ideas.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/90 text-[11px] sm:text-sm md:text-2xl font-bold mb-5 md:mb-8 drop-shadow-md max-w-2xl">
              Dejemos los conceptos en el aire. Las transformamos en plataformas reales, sólidas y altamente rentables.
            </motion.p>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); navigateTo("contacto"); }} className="group flex items-center gap-2 md:gap-3 text-white font-bold text-sm sm:text-base md:text-2xl transition-all">
              <span className="relative pb-0.5 md:pb-1">
                Contactar al Equipo
                <div className="absolute bottom-0 left-0 w-0 h-[1px] md:h-[2px] bg-[#0074D9] group-hover:w-full group-hover:shadow-[0_0_10px_#0074D9] transition-all duration-300"></div>
              </span>
              <ChevronRight className="text-[#0074D9] transform group-hover:translate-x-2 transition-transform duration-300 w-4 h-4 md:w-6 md:h-6" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
        <footer className="relative z-10 w-full pt-8 text-center">
          <div className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/60">
            © 2026 PRIME LOGIC LT · DERECHOS RESERVADOS · GODOY CRUZ, MENDOZA, ARGENTINA
          </div>
        </footer>
      </section>
    </motion.div>
  );
}