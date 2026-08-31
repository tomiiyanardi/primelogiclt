import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { 
  ShieldCheck, Zap, Database, AppWindow, SearchCode, Settings, 
  Layers, MonitorSmartphone, Code2, MapPin, ChevronRight, CheckCircle, 
  QrCode, CreditCard, Server, Sparkles, ArrowUpRight, CheckCircle2,
  Workflow, ArrowRight, MessageSquare, CalendarClock, ShoppingBag, 
  Cpu, GitFork, RefreshCw, Smartphone, Globe, Laptop, HelpCircle
} from "lucide-react";
import Hero from "../components/Hero"; 
import ProjectsCarousel from "../components/ProjectsCarousel";
import MinimalistParticles from "../components/MinimalistParticles";
import { fadeUp, staggerContainer, TypewriterText } from "../utils/animations";

// Lazy load para el mapa (mejora radicalmente el tiempo de carga inicial en celulares)
const InteractiveMap = React.lazy(() => import('../components/InteractiveMap'));

// Stack de tecnologías verificado (logos limpios y funcionales)
const techLogos = [
  { name: ".NET Core", url: "https://cdn.simpleicons.org/dotnet/0074D9" },
  { name: "C#", url: "https://skillicons.dev/icons?i=cs" },
  { name: "React JS", url: "https://cdn.simpleicons.org/react/00D8FF" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "TypeScript", url: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Supabase", url: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "AWS", url: "https://skillicons.dev/icons?i=aws" }, 
  { name: "Tailwind", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe/635BFF" }
];

// 9 Soluciones completas de Software Factory (cubriendo cualquier tipo de sistema)
const solucionesList = [
  {
    title: "Sistemas de Gestión & ERP .NET",
    icon: <Database className="w-5 h-5 md:w-6 md:h-6" />,
    badge: ".NET 8 / C#",
    desc: "Cajas diarias, facturación electrónica AFIP, control de stock, compras y balances contables por turno sin planillas manuales."
  },
  {
    title: "Desarrollo Web & Landing Pages",
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "Alta Conversión",
    desc: "Sitios corporativos y landings futuristas con carga instantánea y optimización SEO orientadas a vender las 24hs."
  },
  {
    title: "Web Apps & Plataformas SaaS",
    icon: <MonitorSmartphone className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "React & TypeScript",
    desc: "Dashboards analíticos con métricas vivas, gestión de roles de usuario, multi-tenant y arquitecturas cloud escalables."
  },
  {
    title: "Control de Acceso Inteligente & QR",
    icon: <QrCode className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "Hardware & IoT",
    desc: "Check-in en tiempo real por código QR para gimnasios y eventos. Validación de socio habilitado/inhabilitado en <150ms."
  },
  {
    title: "Sistemas de Turnos & Reservas",
    icon: <CalendarClock className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "Booking Engine",
    desc: "Agendamiento en vivo de turnos, simuladores, canchas y recursos con pasarela de pagos integrada y recordatorios automáticos."
  },
  {
    title: "E-Commerce de Alta Conversión",
    icon: <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "MercadoPago & Stripe",
    desc: "Tiendas online a medida sin comisiones abusivas: cobros automatizados, cálculo dinámico de envíos y variantes de producto."
  },
  {
    title: "Catálogos & Stock en Tiempo Real",
    icon: <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "Supabase & Cloud",
    desc: "Catálogos interactivos con filtros dinámicos por modelo/precio, actualización instantánea de stock y panel de control seguro."
  },
  {
    title: "Integración de APIs & Automatización",
    icon: <GitFork className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "Webhooks & Bots",
    desc: "Conexión de sistemas legados, pasarelas de pago, WhatsApp Business API y automatización de procesos repetitivos."
  },
  {
    title: "Cualquier Sistema a Medida (Tu Rubro)",
    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
    badge: "100% Personalizado",
    desc: "Salud, gastronomía, logística, educación o industrias: si tu negocio lo necesita o lo tiene en Excel, lo programamos en software."
  }
];

export default function Home({ navigateTo, heroScale, heroTextY, heroTextOpacity, isFirstVisit, onOpenEstimator }) {
  const [isMobile, setIsMobile] = useState(false);
  const [footerNear, setFooterNear] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFooterNear(true);
      }
    }, { rootMargin: '300px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      {/* ESTILOS GLOBALES PARA CARRUSEL Y SCROLL */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .swiper-pagination-bullet { background: #0074D9 !important; opacity: 0.35; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { background: #00E5FF !important; opacity: 1; width: 22px !important; border-radius: 6px !important; }
      `}</style>

      {/* ── HERO PRINCIPAL ── */}
      <Hero 
        heroScale={heroScale} 
        heroTextY={heroTextY} 
        heroTextOpacity={heroTextOpacity} 
        isFirstVisit={isFirstVisit} 
        onOpenEstimator={onOpenEstimator}
        navigateTo={navigateTo}
      />

      {/* ── TICKER DE TECNOLOGÍAS Y LEYES ── */}
      <section className="min-h-[100dvh] snap-start flex flex-col justify-center bg-[#F4F4F9] py-14 md:py-20 relative">
        
        {/* Ticker infinito de tecnologías */}
        <div className="w-full bg-white border-y border-[#8A95A5]/20 py-4 md:py-5 mb-6 md:mb-8 shadow-sm flex flex-col overflow-hidden relative shrink-0">
          <span className="text-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-[#8A95A5] mb-3">
            Stack Tecnológico de Clase Mundial para Desarrollos Críticos
          </span>
          <div className="absolute left-0 bottom-0 w-16 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-16 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }} 
            className="flex items-center whitespace-nowrap w-max"
          >
            <div className="flex gap-8 md:gap-14 items-center px-6 md:px-10">
              {techLogos.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2 group cursor-default">
                  <img src={tech.url} alt={`Logo ${tech.name}`} className="h-5 md:h-7 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 object-contain" loading="lazy" />
                  <span className="font-black text-xs md:text-sm uppercase tracking-wider text-[#8A95A5]/60 group-hover:text-[#0A192F] transition-colors duration-300">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 md:gap-14 items-center px-6 md:px-10">
              {techLogos.map((tech, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-2 group cursor-default">
                  <img src={tech.url} alt={`Logo ${tech.name}`} className="h-5 md:h-7 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 object-contain" loading="lazy" />
                  <span className="font-black text-xs md:text-sm uppercase tracking-wider text-[#8A95A5]/60 group-hover:text-[#0A192F] transition-colors duration-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Las 3 Leyes de PrimeLogic */}
        <div className="px-4 md:px-6 max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-6 md:mb-8">
            <span className="inline-block px-3 py-1 text-[#0074D9] bg-[#0074D9]/10 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-1.5">
              Nuestro Estándar de Ingeniería
            </span>
            <h2 className="flex justify-center text-2xl sm:text-3xl md:text-5xl font-black text-[#0A192F] tracking-tighter">
              <TypewriterText text="Las 3 Leyes de PrimeLogic." />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { 
                num: "01",
                icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />, 
                title: "Cero Deuda Técnica", 
                desc: "Sistemas escritos a medida sin dependencias obsoletas. Arquitectura limpia, documentada y preparada para escalar durante años." 
              },
              { 
                num: "02",
                icon: <Zap className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />, 
                title: "Velocidad & Respuesta Instantánea", 
                desc: "Optimización milimétrica de bases de datos y frontend. Tiempos de carga y validación menores a 200ms para operaciones fluidas." 
              },
              { 
                num: "03",
                icon: <Database className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />, 
                title: "Arquitectura Elástica & Segura", 
                desc: "Ingeniería en .NET y React diseñada para soportar alta concurrencia, pagos online y control de accesos sin caídas ni pérdidas de datos." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="group relative bg-white p-5 md:p-8 rounded-[1.4rem] md:rounded-[1.8rem] shadow-md hover:shadow-xl hover:shadow-[#0074D9]/10 hover:-translate-y-1.5 border border-[#8A95A5]/15 transition-all duration-300 cursor-default overflow-hidden flex flex-col justify-between"
              >
                <span className="absolute top-3 right-5 text-4xl md:text-6xl font-black text-[#0A192F]/5 group-hover:text-[#0074D9]/10 transition-colors select-none">
                  {item.num}
                </span>

                <div>
                  <div className="w-11 h-11 md:w-14 md:h-14 bg-[#F4F4F9] rounded-xl flex items-center justify-center text-[#0074D9] mb-4 group-hover:bg-[#0074D9] group-hover:text-white transition-colors duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#0A192F] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#8A95A5] font-semibold text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#8A95A5]/10 flex items-center gap-1.5 text-[#0074D9] font-black text-[11px] uppercase tracking-wider">
                  <CheckCircle2 size={14} /> Garantía PrimeLogic
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID: SOLUCIONES AMPLIADAS ── */}
      <section id="soluciones" className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-transparent text-white relative py-14 md:py-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0074D9] to-transparent opacity-60"></div>
        
        <div className="max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-block px-3 py-1 text-[#00E5FF] bg-[#0074D9]/20 border border-[#0074D9]/40 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-2">
              Desarrollo Web & Aplicaciones a Medida
            </span>
            <h2 className="flex justify-center text-3xl sm:text-4xl md:text-6xl font-black mb-2 tracking-tighter text-white">
              <TypewriterText text="Armamento Digital." />
            </h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-bold px-4">
              Construimos cualquier tipo de software, web o aplicación a medida. Si tu empresa lo necesita, nosotros lo hacemos realidad.
            </motion.p>
          </div>

          {/* GRID DE 9 SOLUCIONES */}
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, amount: 0.1 }} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4.5"
          >
            {solucionesList.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="group p-4.5 md:p-5.5 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#0074D9]/60 hover:bg-[#0074D9]/15 hover:shadow-[0_0_25px_rgba(0,116,217,0.25)] rounded-[1.3rem] md:rounded-[1.5rem] transition-all duration-300 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#0074D9] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#00E5FF] bg-white/5 border border-white/10 px-2.5 py-0.8 rounded-full backdrop-blur-sm">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-black mb-1 text-white group-hover:text-[#00E5FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-semibold leading-relaxed text-[11px] sm:text-xs group-hover:text-white/90 transition-colors">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] text-white/45 group-hover:text-white/75 transition-colors">
                  <span className="font-bold">Software 100% a Medida</span>
                  <ArrowUpRight size={13} className="text-[#0074D9] group-hover:text-[#00E5FF] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROYECTOS - CARRUSEL (PERFECTAMENTE CENTRADO Y ALINEADO) ── */}
      <section id="proyectos" className="min-h-[100dvh] snap-start flex flex-col justify-center items-center bg-[#F4F4F9] py-12 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6 my-auto flex flex-col justify-center">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3 md:mb-5 gap-3 w-full">
            <div>
              <span className="inline-block px-3 py-1 text-[#0074D9] bg-[#0074D9]/10 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-1.5">
                Casos de Éxito en Producción
              </span>
              <h2 className="flex justify-start text-2xl sm:text-3xl md:text-5xl font-black text-[#0A192F] tracking-tighter mb-1.5">
                <TypewriterText text="Sistemas en Acción." />
              </h2>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-base max-w-xl">
                Explorá nuestros desarrollos reales: desde control de accesos QR y cajas en .NET hasta plataformas de reservas y e-commerce.
              </motion.p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onOpenEstimator && (
                <button 
                  onClick={onOpenEstimator}
                  className="bg-[#0A192F] hover:bg-[#0074D9] text-white px-5 py-2.5 sm:py-3 rounded-full font-black text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,116,217,0.4)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-[#00E5FF]" /> Cotizar Proyecto
                </button>
              )}
            </div>
          </div>

          {/* COMPONENTE DE CARRUSEL (ANCHO EXACTO) */}
          <ProjectsCarousel navigateTo={navigateTo} />
        </div>
      </section>

      {/* ── METODOLOGÍA: DE LA IDEA AL CÓDIGO ── */}
      <section className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-white relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full my-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block px-3 py-1 text-[#0074D9] bg-[#0074D9]/10 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-2">
              Metodología Ágil
            </span>
            <h2 className="flex justify-center text-2xl sm:text-3xl md:text-5xl font-black mb-2 tracking-tighter text-[#0A192F]">
              <TypewriterText text="De la Idea a Producción." />
            </h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="text-[#8A95A5] text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-bold px-4">
              Un proceso transparente y ágil para transformar tus necesidades comerciales en software rentable y robusto.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, amount: 0.1 }} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {[
              {
                step: "01",
                title: "Diagnóstico & Alcance",
                desc: "Analizamos tu modelo operativo, puntos críticos de fricción y definimos los requerimientos y arquitectura técnica óptima."
              },
              {
                step: "02",
                title: "Diseño UI/UX & Prototipo",
                desc: "Modelamos la experiencia de usuario interactiva y el flujo de datos para validar cada pantalla antes de codificar."
              },
              {
                step: "03",
                title: "Desarrollo Ágil & QA",
                desc: "Programamos en sprints con entregas continuas, pruebas de estrés y testeo riguroso en .NET, React y bases de datos."
              },
              {
                step: "04",
                title: "Despliegue & Soporte",
                desc: "Puesta en marcha en servidores seguros, capacitación a tu equipo y soporte evolutivo para garantizar cero interrupciones."
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="group p-5 md:p-7 bg-[#F4F4F9] rounded-[1.4rem] md:rounded-[1.8rem] hover:bg-white hover:shadow-xl hover:shadow-[#0074D9]/10 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#0074D9]/20 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl md:text-3xl font-black text-[#0074D9] mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-base md:text-lg font-black text-[#0A192F] mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#8A95A5] font-semibold leading-relaxed text-xs">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 w-6 h-1 bg-[#0074D9]/20 group-hover:w-full group-hover:bg-[#0074D9] transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NOSOTROS (TOMÁS Y LUCIANO) ── */}
      <section id="nosotros" className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-[#F4F4F9] py-14 md:py-20">
        <div className="max-w-7xl mx-auto w-full bg-white rounded-[1.6rem] md:rounded-[2.5rem] shadow-md border border-[#8A95A5]/15 overflow-hidden my-auto hover:shadow-2xl transition-shadow duration-700">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center p-5 sm:p-8 md:p-10">
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <span className="inline-block px-3 py-1 text-[#0074D9] bg-[#0074D9]/10 rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-2">
                Los Fundadores
              </span>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-5xl font-black text-[#0A192F] mb-3 md:mb-4 tracking-tighter leading-tight">
                Dos amigos, una <br className="hidden md:block"/><span className="text-[#0074D9]">visión global.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-base leading-relaxed mb-5">
                Somos <strong className="text-[#0A192F] font-black">Tomás y Luciano</strong>. Fundamos PrimeLogic LT porque nos cansamos de ver software lento, plantillas infladas y soluciones genéricas que no resuelven los problemas reales de los negocios.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-2.5 md:space-y-3 mb-5">
                {[
                  "Atención y asesoramiento directo con los fundadores.",
                  "Agilidad radical: De la idea al código funcional en semanas.",
                  "Foco obsesivo en arquitectura limpia y seguridad de datos.",
                  "Compromiso a largo plazo: Tu software nunca queda abandonado."
                ].map((text, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-2.5 text-[#0A192F] font-black text-xs md:text-sm group cursor-default">
                    <CheckCircle className="text-[#0074D9] shrink-0 w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 transition-transform duration-300" aria-hidden="true"/> 
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp}>
                <button
                  onClick={() => navigateTo("contacto")}
                  className="bg-[#0A192F] hover:bg-[#0074D9] text-white px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={14} /> Contactar Directamente
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, amount: 0.3 }} 
              className="relative h-[240px] sm:h-[300px] md:h-[400px] w-full rounded-[1.2rem] md:rounded-[2rem] bg-gradient-to-br from-[#0A192F] to-[#112240] overflow-hidden group shadow-xl flex flex-col justify-center items-center p-6 text-center border border-[#0074D9]/30"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00E5FF] via-transparent to-transparent pointer-events-none" />
              <Code2 className="w-12 h-12 md:w-20 md:h-20 text-[#0074D9] mb-3 opacity-90 group-hover:scale-110 group-hover:text-[#00E5FF] transition-all duration-700" />
              <h3 className="text-lg md:text-2xl font-black text-white mb-1.5 tracking-tight">
                El código es nuestro arte.
              </h3>
              <p className="text-white/80 font-semibold text-xs md:text-sm max-w-sm leading-relaxed">
                "Cada línea que escribimos está diseñada para que tu negocio sea más eficiente, seguro y rentable."
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00E5FF] bg-white/5 px-3.5 py-1 rounded-full border border-white/10">
                <span>Tomás & Luciano · PrimeLogic LT</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAPA INTERACTIVO (MENDOZA AL MUNDO) CON CANVAS DE PARTÍCULAS ── */}
      <section className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-[#071324] relative py-16 md:py-20 overflow-hidden text-white">
        
        {/* CANVAS DE PARTÍCULAS SUTIL */}
        <MinimalistParticles withBackground={false} interactive={false} density={0.8} />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 my-auto relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="w-full md:w-1/2 text-center md:text-left z-10">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0074D9]/40 text-[#00E5FF] font-black tracking-widest uppercase text-[10px] md:text-xs mb-4 bg-[#0074D9]/15 backdrop-blur-md">
              <MapPin size={13} /> Hecho en Mendoza, Argentina
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight">
              Talento local, <br className="hidden md:block"/>impacto <span className="text-[#0074D9]">mundial.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto md:mx-0">
              Operamos desde <strong className="text-white font-bold">Godoy Cruz, Mendoza</strong>. Exportamos ingeniería de software de alto nivel para empresas de Argentina y el mundo gracias a nuestra estructura ágil y 100% digital.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true, amount: 0.3 }} 
            className="w-full md:w-1/2 relative bg-[#0A192F]/70 rounded-[2rem] border border-white/15 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,116,217,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0074D9]/10 to-transparent z-0 pointer-events-none" />
            <div className="relative z-10 w-full h-full">
              <React.Suspense fallback={<div className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0074D9] border-t-transparent rounded-full animate-spin"></div></div>}>
                <InteractiveMap />
              </React.Suspense>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER / CTA FINAL ── */}
      <section ref={footerRef} className="relative min-h-[100dvh] snap-start flex flex-col justify-between bg-[#0A192F] overflow-hidden pt-20 md:pt-24 pb-6 px-5 md:px-16">
        <div className="absolute inset-0 z-0">
          {isMobile ? (
            <img 
              src="/nave-poster.jpg" 
              alt="Fondo nave PrimeLogic" 
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-65"
              loading="lazy"
            />
          ) : footerNear ? (
            <video autoPlay loop muted playsInline preload="auto" poster="/nave-poster.jpg" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-65">
              <source src="/nave.mp4" type="video/mp4" />
            </video>
          ) : (
            <img 
              src="/nave-poster.jpg" 
              alt="Fondo nave PrimeLogic" 
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-65"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#0A192F]/60 to-[#0A192F] z-0" />
        </div>

        <div className="relative z-10 flex-grow flex flex-col items-start justify-center max-w-[1400px] mx-auto w-full my-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-left max-w-4xl flex flex-col items-start">
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 text-[10px] md:text-xs font-black tracking-widest uppercase rounded-full border border-white/30 text-white mb-3 bg-white/10 backdrop-blur-md shadow-lg">
              Comenzá hoy tu proyecto
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="text-[10vw] sm:text-[11vw] md:text-[5.5rem] lg:text-[6.5rem] font-black text-white tracking-tighter mb-2 md:mb-3 leading-[0.92] drop-shadow-2xl">
              Es hora de aterrizar <br className="hidden lg:block"/> <span className="text-[#0074D9]">tus ideas.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/90 text-xs sm:text-sm md:text-lg font-bold mb-5 md:mb-6 drop-shadow-md max-w-2xl leading-relaxed">
              Transformamos los desafíos operativos y comerciales de tu empresa en software a medida, rentable y de máxima confiabilidad.
            </motion.p>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => navigateTo("contacto")} 
                className="bg-[#0074D9] hover:bg-[#005bb5] text-white px-6 py-3 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#0074D9]/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Contactar al Equipo <ChevronRight size={16} />
              </button>

              {onOpenEstimator && (
                <button 
                  onClick={onOpenEstimator} 
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer hover:border-white/40"
                >
                  <Sparkles size={15} className="text-[#00E5FF]" /> Cotizador Rápido
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <footer className="relative z-10 w-full pt-6 text-center border-t border-white/10">
          <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
            © 2026 PRIME LOGIC LT · SOFTWARE FACTORY · GODOY CRUZ, MENDOZA, ARGENTINA
          </div>
        </footer>
      </section>

    </motion.div>
  );
}