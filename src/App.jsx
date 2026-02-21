import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ChevronRight, LineChart, Layers, Cpu, MapPin, Mail, 
  Code2, MonitorSmartphone, MessageCircle, Instagram, 
  ArrowLeft, CheckCircle, Menu, X, ShieldCheck, Zap, Database
} from "lucide-react";

/* --- VARIANTES DE ANIMACIÓN --- */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Componente para el texto que se escribe solo
const TypewriterText = ({ text, className }) => {
  const letters = text.split("");
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={fadeUp} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("dark");

  const scrollRef = useRef(null);
  const isFirstVisit = useRef(true);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    // Tiempo ajustado para permitir que aparezca el logo al final
    const timer = setTimeout(() => {
      setLoading(false);
      isFirstVisit.current = false;
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrolled(scrollTop > 30);
    
    const windowHeight = window.innerHeight;
    const sectionIndex = Math.round(scrollTop / windowHeight);
    
    if ([0, 2, 5].includes(sectionIndex)) {
      setHeaderTheme("dark");
    } else {
      setHeaderTheme("light");
    }
  };

  const navigateTo = (newView, sectionId = null) => {
    setMobileMenu(false);
    
    if (newView === "home" && view === "contacto") {
      setView("home");
      setHeaderTheme("dark");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (newView === "home") {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setView(newView);
      setHeaderTheme("dark");
    }
  };

  const isDark = headerTheme === "dark";
  const headerBgClass = isDark ? "bg-[#0A192F]/40 border-white/10 shadow-black/20" : "bg-white/80 border-[#0A192F]/10 shadow-[#0A192F]/5";
  const headerTextClass = isDark ? "text-white" : "text-[#0A192F]";
  const headerMutedClass = isDark ? "text-white/70 hover:text-white" : "text-[#8A95A5] hover:text-[#0A192F]";

  return (
    <div className="bg-[#0A192F] font-sans selection:bg-[#0074D9]/30 overflow-hidden h-[100dvh] w-full relative">
      
      {/* 1. PRE-LOADER MINIMALISTA OSCURO */}
      <AnimatePresence>
        {loading && (
          // CAMBIO: bg-black para fondo negro
          <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
            
            {/* Animación de Estrella Fugaz (BLANCO AMARILLENTO CÁLIDO) */}
            <motion.div
              initial={{ x: "-50vw", y: "-30vh", opacity: 0 }}
              animate={{ x: "150vw", y: "70vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              // CAMBIO: Gradiente usando #FFFACD (LemonChiffon) para un tono blanco amarillento
              className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[2px] bg-gradient-to-r from-transparent via-[#FFFACD] to-transparent -rotate-[30deg] pointer-events-none"
            >
               {/* Cabeza de la estrella cálida */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#FFFACD] rounded-full blur-[1px] shadow-[0_0_20px_2px_#FFFACD80]"></div>
            </motion.div>

            {/* Secuencia de Texto Minimalista y Fina */}
            <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center flex-grow pb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.8 }}
                // CAMBIOS: text-white, tamaño mucho más chico (xl a 3xl), font-light para estilo fino
                className="text-xl sm:text-2xl md:text-3xl font-light text-white flex items-center justify-center gap-2 sm:gap-3 tracking-wide"
              >
                <div className="relative inline-flex items-center justify-center">
                  
                  <span className="relative z-10">
                    Pide
                    {/* Línea de tachado blanca y fina */}
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 2.0, ease: "easeInOut" }}
                      className="absolute top-1/2 left-0 w-full h-[1px] bg-white/80 -translate-y-1/2 origin-left z-20"
                    />
                  </span>
                  
                  {/* La corrección "Cumple" */}
                  <motion.span 
                    initial={{ opacity: 0, y: 5, rotate: 0 }}
                    animate={{ opacity: 1, y: "-70%", rotate: -3 }}
                    transition={{ duration: 0.5, delay: 2.4, ease: "backOut" }}
                    // font-normal para que destaque apenas sobre el light, color azul
                    className="absolute left-0 -top-1 text-[#0074D9] text-[0.8em] z-30 font-normal whitespace-nowrap"
                  >
                    Cumple
                  </motion.span>
                </div>

                <span>un deseo.</span>
              </motion.h2>
            </div>

            {/* Logo Inferior Pequeño (Adaptado a fondo negro) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 font-bold tracking-wider text-xs md:text-sm text-center"
            >
                {/* CAMBIO: text-white para la parte principal */}
                <span className="text-white">PRIME</span>
                <span className="text-[#0074D9]">LOGIC</span>
                <span className="text-white/60 ml-0.5 text-[10px]">LT</span>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HEADER LIQUID GLASS */}
      <header className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[90] w-[96%] max-w-[1400px] transition-all duration-500`}>
        <div className={`relative w-full px-3 md:px-6 py-2.5 md:py-3 rounded-full border backdrop-blur-2xl flex justify-between items-center transition-colors duration-700 ${headerBgClass} ${scrolled ? 'py-2 md:py-3' : 'py-3 md:py-5'}`}>
          <button onClick={() => navigateTo("home")} className={`flex items-center gap-2 md:gap-3 font-black text-base md:text-xl tracking-tighter shrink-0 transition-colors duration-500 ${headerTextClass}`}>
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-[0.4rem] md:rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isDark ? 'bg-[#0074D9] text-white' : 'bg-[#0A192F] text-white'}`}>
              <span className="text-[7px] md:text-[10px]">LT</span>
            </div>
            <span className="hidden sm:inline">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
            <span className="sm:hidden tracking-wider">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
          </button>
          
          <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            <button onClick={() => navigateTo("home")} className={`transition-colors duration-300 ${headerMutedClass}`}>Inicio</button>
            <button onClick={() => navigateTo("home", "soluciones")} className={`transition-colors duration-300 ${headerMutedClass}`}>Soluciones</button>
            <button onClick={() => navigateTo("home", "proyectos")} className={`transition-colors duration-300 ${headerMutedClass}`}>Proyectos</button>
            <button onClick={() => navigateTo("home", "nosotros")} className={`transition-colors duration-300 ${headerMutedClass}`}>Nosotros</button>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => navigateTo("contacto")} className="bg-[#0074D9] text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-[9px] md:text-xs hover:bg-[#005bb5] transition-all active:scale-95 shadow-lg shadow-[#0074D9]/30">
              Agendar Demo
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className={`md:hidden p-1.5 transition-colors duration-500 ${headerTextClass}`}>
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 10, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl rounded-[1.5rem] p-6 border border-white/40 shadow-2xl md:hidden mt-2 z-[100]">
              <div className="flex flex-col gap-6 text-center font-black uppercase tracking-widest text-xs text-[#8A95A5]">
                <button onClick={() => navigateTo("home")} className="hover:text-[#0A192F] py-2">Inicio</button>
                <button onClick={() => navigateTo("home", "soluciones")} className="hover:text-[#0A192F] py-2">Soluciones</button>
                <button onClick={() => navigateTo("home", "proyectos")} className="hover:text-[#0A192F] py-2">Proyectos</button>
                <button onClick={() => navigateTo("home", "nosotros")} className="hover:text-[#0A192F] py-2">Nosotros</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main ref={scrollRef} onScroll={handleScroll} className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth relative z-10">
        
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* --- HERO SECTION (Ventana 1) --- */}
              <section className="relative min-h-[100dvh] snap-start pt-20 md:pt-28 px-2 md:px-4 pb-2 md:pb-4 flex flex-col items-center overflow-hidden">
                <motion.div 
                  initial={{ y: 50, opacity: 0, scale: 0.98 }} 
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  style={{ scale: heroScale }} 
                  transition={{ duration: 0.8, delay: isFirstVisit.current ? 4.2 : 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="relative w-full h-full flex-grow rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between group bg-[#0A192F]"
                >
                  <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 z-0">
                    <source src="/cielo.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40 z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent z-0"></div>

                  <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                    
                    <div className="flex-grow flex items-center justify-center pt-16 md:pt-20">
                      <h1 className="text-[14vw] md:text-[9rem] lg:text-[13rem] font-black text-white tracking-tighter leading-none flex items-start drop-shadow-2xl">
                        primelogic<span className="text-[4vw] md:text-5xl lg:text-7xl mt-[1vw] md:mt-4 lg:mt-8 ml-1 text-white/80">LT</span>
                      </h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-5 md:p-12 gap-6 md:gap-4">
                      <div className="max-w-2xl">
                        <h2 className="text-xl sm:text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight drop-shadow-lg">
                          El cielo no es el límite.
                        </h2>
                        <p className="text-white/90 text-xs sm:text-sm md:text-xl font-bold leading-relaxed drop-shadow-md">
                          Potenciar el negocio. <strong className="text-white font-black">Construimos motores financieros de tecnología pura</strong> que hacen escalar tu negocio.
                        </p>
                      </div>
                      <div className="text-left md:text-right text-white/90 text-[9px] md:text-sm shrink-0 drop-shadow-md pb-2 md:pb-0">
                        <p className="font-black text-white mb-0.5 md:mb-1">made in Mendoza, Argentina</p>
                        <p className="font-semibold">Hacia el resto del mundo</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </section>

              {/* --- LEYES & MARQUEE (Ventana 2) --- */}
              <section className="min-h-[100dvh] snap-start flex flex-col justify-center bg-[#F4F4F9] pt-24 pb-12 md:pt-28 md:pb-20 relative">
                <div className="py-3 md:py-10 border-y border-[#8A95A5]/20 bg-white overflow-hidden flex relative mb-8 md:mb-16 shrink-0 shadow-sm">
                  <div className="absolute left-0 top-0 w-8 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                  <div className="absolute right-0 top-0 w-8 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
                  <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }} className="flex gap-6 md:gap-16 items-center px-4 md:px-10 font-black text-sm md:text-2xl uppercase tracking-widest text-[#8A95A5]/40 whitespace-nowrap">
                    <span>React JS</span> <span>•</span> <span>Node.js</span> <span>•</span> <span>Vite</span> <span>•</span> <span>PostgreSQL</span> <span>•</span> <span>TailwindCSS</span> <span>•</span> <span>AWS</span> <span>•</span> <span>Docker</span> <span>•</span> <span>React JS</span>
                  </motion.div>
                </div>

                <div className="px-4 md:px-6 max-w-7xl mx-auto w-full">
                  <div className="text-center mb-8 md:mb-16">
                    <span className="text-[#0074D9] font-black tracking-widest uppercase text-[9px] md:text-sm mb-2 md:mb-4 block">Nuestro Diferencial</span>
                    <TypewriterText text="Las 3 Leyes de PrimeLogic." className="text-2xl sm:text-3xl md:text-6xl font-black text-[#0A192F] tracking-tighter justify-center" />
                  </div>
                  
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                    {[
                      { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: "Cero Deuda Técnica", desc: "Sistemas escritos desde cero. Código inmortal y escalable, sin plantillas." },
                      { icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, title: "Velocidad Absoluta", desc: "Optimizamos el servidor para que tu plataforma cargue en milisegundos." },
                      { icon: <Database className="w-6 h-6 md:w-8 md:h-8" />, title: "Arquitectura Elástica", desc: "Ingeniería preparada para hiper-crecimiento con bases de datos sólidas." }
                    ].map((item, i) => (
                      <motion.div key={i} variants={fadeUp} className="bg-white p-5 md:p-10 rounded-[1.2rem] md:rounded-[2rem] shadow-xl shadow-black/5 border border-[#8A95A5]/10 md:hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-[#F4F4F9] rounded-xl flex items-center justify-center text-[#0A192F] mb-3 md:mb-6">{item.icon}</div>
                        <h3 className="text-lg md:text-2xl font-black text-[#0A192F] mb-1 md:mb-4">{item.title}</h3>
                        <p className="text-[#8A95A5] font-bold text-xs md:text-base leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* --- SOLUCIONES (Ventana 3) --- */}
              <section id="soluciones" className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-[#0A192F] text-white relative pt-28 pb-12 md:pt-32 md:pb-20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0074D9] to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto w-full">
                  <div className="text-center mb-10 md:mb-24">
                    <TypewriterText text="Armamento Digital." className="text-3xl sm:text-4xl md:text-7xl font-black mb-2 md:mb-6 tracking-tighter text-white justify-center" />
                    <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-white/80 text-xs sm:text-sm md:text-xl max-w-2xl mx-auto font-bold px-4">
                      Soluciones desarrolladas para dominar el entorno web.
                    </motion.p>
                  </div>
                  
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {[
                      { title: "Landing Pages", icon: <Layers className="w-6 h-6 md:w-8 md:h-8"/>, desc: "Interfaces líquidas que capturan leads y venden por vos 24/7." },
                      { title: "Plataformas Web App", icon: <MonitorSmartphone className="w-6 h-6 md:w-8 md:h-8"/>, desc: "Sistemas complejos, dashboards y SaaS con React." },
                      { title: "Arquitectura Cloud", icon: <Code2 className="w-6 h-6 md:w-8 md:h-8"/>, desc: "Bases de datos estructuradas para no caerse jamás." }
                    ].map((item, i) => (
                      <motion.div key={i} variants={fadeUp} className="group p-5 md:p-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[1.2rem] md:rounded-[2.5rem] md:hover:bg-[#0074D9]/10 transition-all duration-500">
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-[#0074D9] rounded-xl flex items-center justify-center text-white mb-3 md:mb-8 shadow-lg">{item.icon}</div>
                        <h3 className="text-base md:text-2xl font-black mb-1 md:mb-4">{item.title}</h3>
                        <p className="text-white/70 font-semibold leading-relaxed text-[11px] md:text-base">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* --- CASOS DE ÉXITO (Ventana 4) --- */}
              <section id="proyectos" className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-[#F4F4F9] pt-28 pb-12 md:pt-32 md:pb-20">
                <div className="max-w-7xl mx-auto w-full">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
                      <div>
                        <TypewriterText text="Sistemas en Acción." className="text-3xl sm:text-4xl md:text-7xl font-black text-[#0A192F] tracking-tighter mb-2 md:mb-4 justify-start" />
                        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-xl max-w-xl">
                          Lo que construimos no se rompe. Explorá cómo la ingeniería LT impacta en la industria.
                        </motion.p>
                      </div>
                      <button onClick={() => navigateTo("contacto")} className="bg-[#0A192F] text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full font-black text-[9px] md:text-sm hover:bg-[#0074D9] transition-all shrink-0">
                        Quiero un sistema así
                      </button>
                   </div>

                   <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                      <motion.div variants={fadeUp} className="group relative h-[180px] md:h-[450px] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90"></div>
                        <div className="absolute bottom-3 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                           <span className="text-[#0074D9] font-black text-[8px] md:text-xs uppercase tracking-widest mb-0.5 md:mb-2 block">Fintech App</span>
                           <h3 className="text-white font-black text-sm md:text-2xl">Dashboard Financiero</h3>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={fadeUp} className="group relative h-[180px] md:h-[450px] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer hidden md:block">
                        <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800" alt="Ecommerce" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90"></div>
                        <div className="absolute bottom-3 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                           <span className="text-green-400 font-black text-[8px] md:text-xs uppercase tracking-widest mb-0.5 md:mb-2 block">E-Commerce</span>
                           <h3 className="text-white font-black text-sm md:text-2xl">Plataforma Automotriz</h3>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp} className="group relative h-[180px] md:h-[450px] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer md:col-span-2 lg:col-span-1">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" alt="Logistica" className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90"></div>
                        <div className="absolute bottom-3 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                           <span className="text-purple-400 font-black text-[8px] md:text-xs uppercase tracking-widest mb-0.5 md:mb-2 block">Enterprise</span>
                           <h3 className="text-white font-black text-sm md:text-2xl">Software SaaS Médico</h3>
                        </div>
                      </motion.div>
                   </motion.div>
                </div>
              </section>

              {/* --- NOSOTROS (Ventana 5) --- */}
              <section id="nosotros" className="min-h-[100dvh] snap-start flex flex-col justify-center px-4 md:px-6 bg-[#F4F4F9] pt-24 pb-12 md:pt-32 md:pb-20">
                <div className="max-w-7xl mx-auto w-full bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-sm border border-[#8A95A5]/10 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center p-5 md:p-10">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                      <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0A192F] mb-3 md:mb-8 tracking-tighter">
                        Fundadores de la <br className="hidden md:block"/><span className="text-[#0074D9]">nueva era.</span>
                      </motion.h2>
                      <motion.p variants={fadeUp} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-xl leading-relaxed mb-4 md:mb-8">
                        Somos <strong className="text-[#0A192F] font-black">Tomás y Luciano</strong>. PrimeLogic LT es nuestra respuesta a la falta de software verdaderamente eficiente.
                      </motion.p>
                      <motion.ul variants={staggerContainer} className="space-y-3 md:space-y-6">
                        {["Código auditado con estándares globales.", "Metodología ágil sin burocracia.", "Enfoque absoluto en UX/UI."].map((text, i) => (
                          <motion.li key={i} variants={fadeUp} className="flex items-center gap-2 md:gap-4 text-[#0A192F] font-black text-[10px] sm:text-xs md:text-lg">
                            <CheckCircle className="text-[#0074D9] shrink-0 w-4 h-4 md:w-6 md:h-6"/> {text}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="relative h-[200px] md:h-[500px] w-full rounded-[1rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 right-4 md:right-10">
                        <h3 className="text-lg md:text-4xl font-black text-white mb-0.5 md:mb-2 drop-shadow-lg">Mendoza, Argentina</h3>
                        <p className="text-white/80 font-bold text-[9px] md:text-base">Operando a nivel internacional.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* --- ATERRIZAJE NAVE (Ventana 6) --- */}
              <section className="relative min-h-[100dvh] snap-start flex flex-col bg-[#0A192F] overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted playsInline preload="auto" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70">
                      <source src="/nave.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-x-0 top-0 h-20 md:h-40 bg-gradient-to-b from-[#0A192F] to-transparent z-0"></div>
                  </div>

                  <div className="relative z-10 flex-grow flex flex-col items-start justify-center pt-24 md:pt-28 pb-12 md:pb-16 px-5 md:px-16 max-w-[1400px] mx-auto w-full">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-left max-w-4xl flex flex-col items-start">
                      <motion.span variants={fadeUp} className="inline-block px-3 py-1.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black tracking-widest uppercase rounded-full border border-white/30 text-white mb-3 md:mb-4 bg-white/10 backdrop-blur-md shadow-lg">
                        Fase final del proyecto
                      </motion.span>
                      
                      <motion.h2 variants={fadeUp} className="text-[12vw] md:text-[7rem] lg:text-[7.5rem] font-black text-white tracking-tighter mb-2 md:mb-5 leading-[0.9] drop-shadow-2xl">
                        Es hora de aterrizar <br className="hidden lg:block"/> <span className="text-[#0074D9]">tus ideas.</span>
                      </motion.h2>
                      
                      <motion.p variants={fadeUp} className="text-white/90 text-[11px] sm:text-sm md:text-2xl font-bold mb-5 md:mb-8 drop-shadow-md max-w-2xl">
                        Dejemos los conceptos en el aire. Las transformamos en plataformas reales, sólidas y altamente rentables.
                      </motion.p>
                      
                      <motion.button variants={fadeUp} onClick={() => navigateTo("contacto")} className="group flex items-center gap-2 md:gap-3 text-white font-bold text-sm sm:text-base md:text-2xl transition-all">
                        <span className="relative pb-0.5 md:pb-1">
                          Contactar al Equipo
                          <div className="absolute bottom-0 left-0 w-0 h-[1px] md:h-[2px] bg-[#0074D9] group-hover:w-full transition-all duration-300"></div>
                        </span>
                        <ChevronRight className="text-[#0074D9] transform group-hover:translate-x-2 transition-transform duration-300 w-4 h-4 md:w-6 md:h-6" />
                      </motion.button>
                    </motion.div>
                  </div>

                  <footer className="relative z-10 w-full py-4 md:py-6 px-4 border-t border-white/10 bg-[#0A192F]/40 backdrop-blur-md shrink-0">
                    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                      <div className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/60">
                        © 2026 PRIME LOGIC LT · INGENIERÍA EN SISTEMAS
                      </div>
                    </div>
                  </footer>
              </section>

            </motion.div>
          ) : (
            
            /* --- SECCIÓN CONTACTO PREMIUM --- */
            <motion.section 
              key="contacto" 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98 }} 
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="relative min-h-[100dvh] snap-start flex flex-col items-center justify-center bg-[#F4F4F9] p-2 md:p-4 overflow-hidden"
            >
              <div className="relative w-full h-full min-h-[90dvh] max-w-[1600px] rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden bg-[#0A192F] shadow-2xl flex items-center justify-center p-4 md:p-12">
                
                <div className="absolute inset-0 z-0">
                  <video autoPlay loop muted playsInline preload="auto" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-50 mix-blend-lighten z-0">
                    <source src="/humonave.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-[#0A192F]/30 z-0"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center h-full pt-14 md:pt-0">
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                    
                    {/* TÍTULO GIGANTE LET'S TALK */}
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="order-1 lg:order-2 text-center lg:text-left">
                      <h2 className="text-[18vw] md:text-[8rem] font-black text-white mb-1 md:mb-4 tracking-tighter leading-none drop-shadow-2xl">
                        Let's <br className="hidden lg:block"/> talk.
                      </h2>
                      <p className="text-white/90 text-[11px] md:text-xl font-bold max-w-md mx-auto lg:mx-0 drop-shadow-md px-2 md:px-0">
                        Contanos sobre tu empresa. Tomás y Luciano te asesorarán sin compromiso.
                      </p>
                    </motion.div>

                    {/* TARJETA CONTACTO PREMIUM (SUTIL) */}
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="order-2 lg:order-1 relative w-full rounded-[1.2rem] md:rounded-[3rem] overflow-hidden p-[1px] bg-gradient-to-br from-white/10 via-[#0074D9]/30 to-white/5 shadow-2xl shadow-black/20 group">
                      
                      {/* Sheen Effect */}
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none"
                      />

                      <div className="relative z-10 bg-[#0A192F]/70 backdrop-blur-xl p-5 md:p-10 rounded-[calc(1.2rem-1px)] md:rounded-[calc(3rem-1px)] h-full w-full">
                        <h3 className="text-lg md:text-3xl font-black text-white mb-1 tracking-tighter">¿Preparados para el despegue?</h3>
                        <p className="text-white/70 font-bold text-[10px] md:text-sm mb-4 md:mb-8">Seleccioná tu canal. Respondemos rápido.</p>

                        <div className="flex flex-col gap-2.5 md:gap-4">
                          <ContactCardHorizontal icon={<MessageCircle className="w-4 h-4 md:w-5 md:h-5"/>} title="WhatsApp" value="+54 261 2533823" link="https://wa.me/2612533823" color="text-green-500" bgColor="bg-green-500/10" />
                          <ContactCardHorizontal icon={<Mail className="w-4 h-4 md:w-5 md:h-5"/>} title="Email" value="primelogiclt@gmail.com" link="mailto:primelogiclt@gmail.com" color="text-[#0074D9]" bgColor="bg-[#0074D9]/10" />
                          <ContactCardHorizontal icon={<Instagram className="w-4 h-4 md:w-5 md:h-5"/>} title="Instagram" value="@primelogiclt" link="https://instagram.com/primelogiclt" color="text-pink-500" bgColor="bg-pink-500/10" />
                        </div>
                      </div>
                    </motion.div>

                    {/* BOTON VOLVER */}
                    <div className="order-3 col-span-1 lg:col-span-2 flex justify-center lg:justify-start lg:absolute lg:bottom-12 lg:right-12">
                      <button onClick={() => navigateTo("home")} className="inline-flex items-center gap-2 text-white/70 font-black text-[9px] md:text-xs uppercase tracking-widest hover:text-white transition-all bg-white/5 border border-white/20 px-5 md:px-6 py-2.5 md:py-3 rounded-full backdrop-blur-md hover:bg-white/10">
                        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Volver al Inicio
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ContactCardHorizontal({ icon, title, value, link, color, bgColor }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="group flex items-center gap-3 md:gap-5 p-2.5 md:p-4 rounded-[0.8rem] md:rounded-[1.5rem] border border-white/5 hover:border-white/20 md:hover:bg-white/5 transition-all duration-300 bg-[#0A192F]/40 md:bg-[#0A192F]/30 backdrop-blur-md relative overflow-hidden">
      
      <div className={`w-9 h-9 md:w-14 md:h-14 shrink-0 ${bgColor} ${color} rounded-full flex items-center justify-center md:group-hover:scale-110 shadow-sm transition-transform duration-300 relative z-10 border border-white/10`}>
        {icon}
      </div>
      <div className="text-left overflow-hidden relative z-10">
        <h3 className="text-xs md:text-lg font-black text-white mb-0.5">{title}</h3>
        <span className={`text-[8px] md:text-[11px] font-black ${color} uppercase tracking-widest block truncate transition-colors opacity-80 md:group-hover:opacity-100`}>{value}</span>
      </div>
    </a>
  );
}