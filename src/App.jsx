import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ChevronRight, LineChart, Layers, Cpu, MapPin, Mail, 
  Code2, MonitorSmartphone, MessageCircle, Instagram, 
  ArrowLeft, CheckCircle, Menu, X, ShieldCheck, Zap, Database, AppWindow, Settings, SearchCode, ChevronDown, Globe,
  Calendar, Clock, LayoutDashboard, CreditCard, Users
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Sphere, Graticule } from "react-simple-maps";

/* --- VARIANTES DE ANIMACIÓN --- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
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

/* --- COMPONENTE DE MAPA INTERACTIVO MUNDIAL (3D) --- */
const InteractiveMap = () => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const mendozaCoords = [-68.84, -32.92];
  
  const [rotation, setRotation] = useState([68.84, 32.92, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef([0, 0, 0]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = rotation;
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    const newRotation = [
      rotationStart.current[0] + deltaX * 0.4,
      Math.max(-90, Math.min(90, rotationStart.current[1] - deltaY * 0.4)),
      0
    ];
    setRotation(newRotation);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="w-full h-full min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center p-4 cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: rotation,
          scale: 300
        }}
        className="w-full h-full max-h-[500px]"
      >
        <Sphere stroke="#233554" strokeWidth={0.5} fill="rgba(10, 25, 47, 0.5)" />
        <Graticule stroke="#233554" strokeWidth={0.3} opacity={0.4} />
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isArgentina = geo.properties.name === "Argentina";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isArgentina ? "#0074D9" : "#112240"}
                  stroke="#233554"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: isArgentina ? "#00E5FF" : "#1d2d50", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        <Marker coordinates={mendozaCoords}>
          <motion.circle
            r={8}
            fill="#00E5FF"
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <circle r={4} fill="#00E5FF" stroke="#ffffff" strokeWidth={1.5} />
          <text
            textAnchor="start"
            x={12}
            y={4}
            className="fill-white text-[10px] md:text-[14px] font-black uppercase tracking-tighter"
            style={{ pointerEvents: "none", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Mendoza
          </text>
        </Marker>
      </ComposableMap>
    </div>
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
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      isFirstVisit.current = false;
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view !== "home") {
      setHeaderTheme("dark");
    }
  }, [view]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrolled(scrollTop > 30);
    
    if (view === "home") {
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollTop / windowHeight);
      
      if ([0, 2, 4, 6, 7].includes(sectionIndex)) {
        setHeaderTheme("dark");
      } else {
        setHeaderTheme("light");
      }
    }
  };

  const navigateTo = (newView, sectionId = null) => {
    setMobileMenu(false);
    
    if (newView === "home" && view !== "home") {
      setView("home");
      setHeaderTheme("dark"); 
      setTimeout(() => {
        const el = document.getElementById(sectionId || "inicio");
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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
      if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 }); 
    }
  };

  const isDark = headerTheme === "dark";
  const headerBgClass = isDark ? "bg-[#0A192F]/40 border-white/10 shadow-black/20 backdrop-blur-md" : "bg-white/90 border-[#0A192F]/10 shadow-[#0A192F]/5 backdrop-blur-md";
  const headerTextClass = isDark ? "text-white" : "text-[#0A192F]";
  const headerMutedClass = isDark ? "text-white/70 hover:text-white" : "text-[#8A95A5] hover:text-[#0A192F]";

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

  return (
    <div className="bg-[#0A192F] font-sans selection:bg-[#0074D9]/30 overflow-hidden h-[100dvh] w-full relative overscroll-none">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#0074D9] origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <AnimatePresence>
        {loading && (
          <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
            <motion.div
              initial={{ x: "-50vw", y: "-50vh", opacity: 0 }}
              animate={{ x: "150vw", y: "150vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 left-0 w-[400px] md:w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#FFFACD] to-transparent -rotate-45 pointer-events-none"
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#FFFACD] rounded-full blur-[1px] shadow-[0_0_20px_2px_#FFFACD80]"></div>
            </motion.div>

            <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center flex-grow pb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl font-light text-white flex items-center justify-center gap-2 sm:gap-3 tracking-wide"
              >
                <div className="relative inline-flex items-center justify-center">
                  <span className="relative z-10">
                    Pide
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 2.0, ease: "easeInOut" }}
                      className="absolute top-1/2 left-0 w-full h-[1px] bg-white/80 -translate-y-1/2 origin-left z-20"
                    />
                  </span>
                  <motion.span 
                    initial={{ opacity: 0, y: 5, rotate: 0 }}
                    animate={{ opacity: 1, y: "-70%", rotate: -3 }}
                    transition={{ duration: 0.5, delay: 2.4, ease: "backOut" }}
                    className="absolute left-0 -top-1 text-[#0074D9] text-[0.8em] z-30 font-normal whitespace-nowrap"
                  >
                    Cumple
                  </motion.span>
                </div>
                <span>un deseo.</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 font-bold tracking-wider text-xs md:text-sm text-center"
            >
                <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                <div>
                  <span className="text-white">PRIME</span>
                  <span className="text-[#0074D9]">LOGIC</span>
                  <span className="text-white/60 ml-0.5 text-[10px]">LT</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[90] w-[96%] max-w-[1400px] transition-all duration-500`}>
        <div className={`relative w-full px-3 md:px-6 py-2.5 md:py-3 rounded-full border flex justify-between items-center transition-colors duration-700 ${headerBgClass} ${scrolled ? 'py-2 md:py-3' : 'py-3 md:py-5'}`}>
          <a href="#inicio" onClick={(e) => { e.preventDefault(); navigateTo("home", "inicio"); }} className={`flex items-center gap-2 md:gap-3 font-black text-base md:text-xl tracking-tighter shrink-0 transition-colors duration-500 ${headerTextClass}`}>
            <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
            <span className="hidden sm:inline">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
            <span className="sm:hidden tracking-wider">PRIME<span className="text-[#0074D9]">LOGIC</span></span>
          </a>
          
          <nav aria-label="Menú principal" className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            <a href="#inicio" onClick={(e) => { e.preventDefault(); navigateTo("home", "inicio"); }} className={`relative group transition-colors duration-300 ${headerMutedClass}`}>Inicio <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0074D9] transition-all group-hover:w-full"></span></a>
            <a href="#soluciones" onClick={(e) => { e.preventDefault(); navigateTo("home", "soluciones"); }} className={`relative group transition-colors duration-300 ${headerMutedClass}`}>Soluciones <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0074D9] transition-all group-hover:w-full"></span></a>
            <a href="#proyectos" onClick={(e) => { e.preventDefault(); navigateTo("home", "proyectos"); }} className={`relative group transition-colors duration-300 ${headerMutedClass}`}>Proyectos <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0074D9] transition-all group-hover:w-full"></span></a>
            <a href="#nosotros" onClick={(e) => { e.preventDefault(); navigateTo("home", "nosotros"); }} className={`relative group transition-colors duration-300 ${headerMutedClass}`}>Nosotros <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0074D9] transition-all group-hover:w-full"></span></a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="#contacto" onClick={(e) => { e.preventDefault(); navigateTo("contacto"); }} className="bg-[#0074D9] text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-[9px] md:text-xs hover:bg-[#005bb5] hover:shadow-[0_0_20px_rgba(0,116,217,0.6)] transition-all active:scale-95 shadow-lg shadow-[#0074D9]/30 whitespace-nowrap">
              Agendar Demo
            </a>
            <button aria-label="Abrir menú móvil" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)} className={`md:hidden p-1.5 transition-colors duration-500 ${headerTextClass}`}>
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 10, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl rounded-[1.5rem] p-6 border border-white/40 shadow-2xl md:hidden mt-2 z-[100]">
              <nav aria-label="Menú de navegación móvil" className="flex flex-col gap-6 text-center font-black uppercase tracking-widest text-xs text-[#8A95A5]">
                <a href="#inicio" onClick={(e) => { e.preventDefault(); navigateTo("home", "inicio"); }} className="hover:text-[#0A192F] py-2">Inicio</a>
                <a href="#soluciones" onClick={(e) => { e.preventDefault(); navigateTo("home", "soluciones"); }} className="hover:text-[#0A192F] py-2">Soluciones</a>
                <a href="#proyectos" onClick={(e) => { e.preventDefault(); navigateTo("home", "proyectos"); }} className="hover:text-[#0A192F] py-2">Proyectos</a>
                <a href="#nosotros" onClick={(e) => { e.preventDefault(); navigateTo("home", "nosotros"); }} className="hover:text-[#0A192F] py-2">Nosotros</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main ref={scrollRef} onScroll={handleScroll} className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth relative z-10 overscroll-y-none" style={{ WebkitOverflowScrolling: "touch" }}>
        
        <h1 className="sr-only">PrimeLogic LT - Agencia de Desarrollo de Software a Medida y Diseño Web</h1>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* --- HERO SECTION MODIFICADA A PANTALLA COMPLETA --- */}
              <section id="inicio" className="relative min-h-[100dvh] w-full snap-start flex flex-col items-center overflow-hidden bg-[#0A192F]">
                
                {/* 1. FONDO VIDEO PANTALLA COMPLETA (Edge-to-Edge) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 1.05 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ scale: heroScale }} // Aplica el parallax de forma elegante
                  transition={{ duration: 1.2, delay: isFirstVisit.current ? 4.2 : 0.2, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full z-0"
                >
                  <video autoPlay loop muted playsInline preload="metadata" poster="/cielo-poster.jpg" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
                    <source src="/cielo.mp4" type="video/mp4" />
                  </video>
                  {/* Capas oscuras para contrastar perfecto el menú superior y los textos */}
                  <div className="absolute inset-0 bg-black/40 z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-transparent to-[#0A192F]/90 z-0"></div>
                </motion.div>

                {/* 2. LOS TEXTOS ORIGINALES UBICADOS SOBRE EL VIDEO */}
                <motion.div 
                  style={{ y: heroTextY, opacity: heroTextOpacity }} 
                  className="relative z-10 flex flex-col w-full h-[100dvh] max-w-[1400px] mx-auto p-6 md:p-12 pointer-events-none"
                >
                  <div className="pt-28 md:pt-20 flex justify-center w-full shrink-0">
                    <div className="text-[15vw] md:text-[9rem] lg:text-[13rem] font-black text-white tracking-tighter leading-none flex items-start drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                      primelogic<span className="text-[4vw] md:text-5xl lg:text-7xl mt-[2vw] md:mt-4 lg:mt-8 ml-1 text-white/80">LT</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end w-full pb-8 md:pb-4 relative">
                    <div className="max-w-2xl mt-auto mb-10 md:mb-0">
                      <h2 className="text-[28px] sm:text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
                        El cielo no es el límite.
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base md:text-xl font-bold leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                        Potenciar el negocio. <strong className="text-white font-black">Construimos motores financieros de tecnología pura</strong> que hacen escalar tu negocio.
                      </p>
                    </div>
                    
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center text-white/60 drop-shadow-md">
                      <span className="text-[10px] uppercase tracking-widest font-bold mb-2">Scroll</span>
                      <ChevronDown size={20} aria-hidden="true" />
                    </motion.div>
                    
                    <div className="text-left md:text-right text-white/90 text-[11px] md:text-sm shrink-0 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                      <p className="font-black text-white mb-0.5 md:mb-1">made in Mendoza, Argentina</p>
                      <p className="font-semibold">Hacia el resto del mundo</p>
                    </div>
                  </div>
                </motion.div>

              </section>

              {/* SECCIONES INTACTAS */}
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

              <section id="soluciones" className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-[#0A192F] text-white relative pt-28 pb-12 md:pt-36 md:pb-20">
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

              <section id="proyectos" className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-[#F4F4F9] pt-28 pb-12 md:pt-36 md:pb-20">
                <div className="max-w-7xl mx-auto w-full my-auto">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
                      <div>
                        <h2 className="flex justify-start text-3xl sm:text-4xl md:text-7xl font-black text-[#0A192F] tracking-tighter mb-2 md:mb-4">
                          <TypewriterText text="Sistemas en Acción." />
                        </h2>
                        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} className="text-[#8A95A5] font-bold text-xs sm:text-sm md:text-xl max-w-xl">
                          Lo que construimos no se rompe. Explorá cómo la ingeniería de PrimeLogic impacta en la industria con nuestros últimos casos de éxito.
                        </motion.p>
                      </div>
                      <button onClick={() => navigateTo("contacto")} className="bg-[#0A192F] text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full font-black text-[9px] md:text-sm hover:bg-[#0074D9] hover:shadow-[0_0_20px_rgba(0,116,217,0.4)] transition-all shrink-0">
                        Quiero un sistema así
                      </button>
                   </div>
                   
                   <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      
                      <motion.div onClick={() => navigateTo("proyecto_alcorta")} variants={fadeUp} className="group relative h-[250px] md:h-[500px] rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer">
                        <img src="/alcortadescartablepantallas.png" alt="Dashboard de Alcorta Descartable" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent opacity-90 group-hover:opacity-100 group-hover:bg-[#0A192F]/80 transition-all duration-500"></div>
                        <div className="absolute bottom-4 md:bottom-8 left-5 md:left-8 right-5 md:right-8 group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-500">
                           <span className="text-[#00E5FF] font-black text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block">Dashboard & Gestión</span>
                           <h3 className="text-white font-black text-xl md:text-4xl leading-tight">Alcorta <br className="hidden md:block"/> Descartable</h3>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none px-4 text-center">
                          <span className="text-white font-bold text-xs md:text-base mb-3 bg-[#0074D9] px-4 py-2 rounded-full flex items-center gap-2">Ver Caso de Estudio <ChevronRight size={16}/></span>
                          <span className="text-white/80 font-black text-[9px] md:text-sm uppercase tracking-widest leading-relaxed">Contabilidad • Stock • Historial de Ventas</span>
                        </div>
                      </motion.div>

                      <motion.div onClick={() => navigateTo("proyecto_curva")} variants={fadeUp} className="group relative h-[250px] md:h-[500px] rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer">
                        <img src="/curvaunopantallas.png" alt="Plataforma Curva Uno" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent opacity-90 group-hover:opacity-100 group-hover:bg-[#0A192F]/80 transition-all duration-500"></div>
                        <div className="absolute bottom-4 md:bottom-8 left-5 md:left-8 right-5 md:right-8 group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-500">
                           <span className="text-[#00E5FF] font-black text-[9px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block">Reserva de Simuladores</span>
                           <h3 className="text-white font-black text-xl md:text-4xl leading-tight">Curva Uno <br className="hidden md:block"/> Booking System</h3>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none px-4 text-center">
                          <span className="text-white font-bold text-xs md:text-base mb-3 bg-[#0074D9] px-4 py-2 rounded-full flex items-center gap-2">Ver Caso de Estudio <ChevronRight size={16}/></span>
                          <span className="text-white/80 font-black text-[9px] md:text-sm uppercase tracking-widest leading-relaxed">Google Auth • ABM • Pagos MercadoPago</span>
                        </div>
                      </motion.div>

                   </motion.div>
                </div>
              </section>

              <section id="nosotros" className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-[#F4F4F9] pt-28 pb-12 md:pt-36 md:pb-20">
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

              <section className="min-h-[100dvh] snap-start flex flex-col px-4 md:px-6 bg-[#0A192F] relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden text-white">
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

              <section className="relative min-h-[100dvh] snap-start flex flex-col bg-[#0A192F] overflow-hidden pt-28 md:pt-36 pb-6 md:pb-8 px-5 md:px-16">
                  <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted playsInline preload="metadata" poster="/nave-poster.jpg" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70">
                      <source src="/nave.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-[2px]"></div>
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
          )}

          {/* --- VISTA: CONTACTO --- */}
          {view === "contacto" && (
            <motion.section 
              key="contacto" 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98 }} 
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="relative min-h-[100dvh] snap-start flex flex-col items-center bg-[#0A192F] px-0 md:px-8 pt-0 md:pt-28 pb-0 md:pb-12 overflow-hidden"
            >
              <div className="relative w-full flex-grow max-w-[1400px] rounded-none md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 md:p-12 pt-28 md:pt-12 border-none md:border border-white/5 my-auto">
                <div className="absolute inset-0 z-0">
                  <video autoPlay loop muted playsInline preload="metadata" poster="/humonave-poster.jpg" className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-50 mix-blend-lighten z-0">
                    <source src="/humonave.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-[#0A192F]/30 z-0"></div>
                </div>
                <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center h-full">
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center flex-grow">
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="order-1 lg:order-2 text-center lg:text-left mt-8 md:mt-0">
                      <h2 className="text-[14vw] md:text-[6.5rem] font-black text-white mb-2 md:mb-4 tracking-tighter leading-none drop-shadow-2xl">Iniciá el <br className="hidden lg:block"/> sistema.</h2>
                      <p className="text-white/90 text-xs md:text-lg font-bold max-w-md mx-auto lg:mx-0 drop-shadow-md px-2 md:px-0">Contactate con nosotros. A la brevedad te responderemos y cotizaremos tu proyecto sin compromiso.</p>
                    </motion.div>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="order-2 lg:order-1 relative w-full max-w-md mx-auto rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden p-[3px] shadow-[0_0_40px_-5px_rgba(0,116,217,0.4)] group">
                      <div className="absolute inset-0 z-0 overflow-hidden rounded-[1.2rem] md:rounded-[2.5rem]">
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute top-1/2 left-1/2 w-[250%] h-[250%] origin-center -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_40%,#00E5FF_80%,#0074D9_100%)] z-0" />
                      </div>
                      <div className="relative z-10 bg-[#0A192F]/95 backdrop-blur-xl p-5 md:p-8 rounded-[calc(1.2rem-3px)] md:rounded-[calc(2.5rem-3px)] h-full w-full">
                        <h3 className="text-lg md:text-2xl font-black text-white mb-1 tracking-tighter">¿Preparados para el despegue?</h3>
                        <p className="text-white/70 font-bold text-[10px] md:text-xs mb-5 md:mb-6">Respondemos en menos de 24hs.</p>
                        <div className="flex flex-col gap-3 md:gap-4">
                          <ContactCardHorizontal icon={<MessageCircle size={20} />} title="WhatsApp" value="+54 261 2533823" link="https://wa.me/2612533823" color="text-green-500" bgColor="bg-green-500/10" />
                          <ContactCardHorizontal icon={<Mail size={20} />} title="Email" value="primelogiclt@gmail.com" link="mailto:primelogiclt@gmail.com" color="text-[#0074D9]" bgColor="bg-[#0074D9]/10" />
                          <ContactCardHorizontal icon={<Instagram size={20} />} title="Instagram" value="@primelogiclt" link="https://instagram.com/primelogiclt" color="text-pink-500" bgColor="bg-pink-500/10" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="w-full flex justify-center mt-10 md:mt-16 pb-8 md:pb-0 relative z-20">
                    <button onClick={() => navigateTo("home", "proyectos")} className="group inline-flex items-center gap-2 text-white/50 font-bold text-[10px] md:text-sm uppercase tracking-widest hover:text-white transition-colors duration-300">
                      <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" /> Volver al Inicio
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- VISTA: PROYECTO ALCORTA --- */}
          {view === "proyecto_alcorta" && (
            <ProjectDetailView 
              key="alcorta"
              title="Alcorta Descartable"
              category="Dashboard Administrativo Integral"
              time="4 Semanas"
              image="/alcortadescartablepantallas.png"
              description="Sistema a medida para gestión centralizada y administración. Ideal para empresas del rubro de cotillon y descartables que necesitan precisión absoluta. Proveemos una interfaz intuitiva que elimina el uso de planillas genéricas y automatiza los flujos financieros diarios. Pudiendo registrar todas las ventas que se realizan diariamnente, contabilizando cada movimiento en tiempo real. Además, el sistema incluye un módulo de gestión de stock con alertas inteligentes para evitar faltantes o excesos, y un historial completo de ventas con métricas detalladas para optimizar la toma de decisiones estratégicas."
              features={[
                { icon: <LineChart size={18}/>, text: "Contabilidad automatizada y balances en tiempo real." },
                { icon: <Database size={18}/>, text: "Gestión de Stock inteligente con alertas de reposición." },
                { icon: <CheckCircle size={18}/>, text: "Historial completo de ventas y métricas de rendimiento." },
                { icon: <ShieldCheck size={18}/>, text: "Base de datos robusta, segura y escalable." }
              ]}
              onBack={() => navigateTo("home", "proyectos")}
            />
          )}

          {/* --- VISTA: PROYECTO CURVA UNO --- */}
          {view === "proyecto_curva" && (
            <ProjectDetailView 
              key="curva"
              title="Curva Uno"
              category="Sistema de Reservas & Dashboard"
              time="6 Semanas"
              image="/curvaunopantallas.png"
              description="Emprendimiento mendocino, donde desarrollamos una plataforma integral de reservas para centro de simuladores de carreras, con toda la lógica necesaria para el correcto funcionamiento del mismo. Construimos una experiencia de usuario fluida (Landing Page orientada a conversión) combinada con un backend potente para administrar cada butaca y horario del local comercial. Ademas un completo control para el modo ADMIN con ABM de usuarios, horarios, reservas y registros contables. El sistema incluye autenticación segura con Google Auth y una pasarela de pagos automatizada con MercadoPago, garantizando una experiencia de usuario fluida y confiable."
              features={[
                { icon: <Users size={18}/>, text: "Inicio de sesión seguro mediante autenticación de Google Auth." },
                { icon: <Calendar size={18}/>, text: "Gestión de reservas de simuladores y selección de butacas." },
                { icon: <CreditCard size={18}/>, text: "Integración de pasarela de pagos automatizada con MercadoPago." },
                { icon: <LayoutDashboard size={18}/>, text: "Panel Admin: ABM de usuarios, horarios y registros contables." }
              ]}
              onBack={() => navigateTo("home", "proyectos")}
            />
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

// Subcomponente para contacto
function ContactCardHorizontal({ icon, title, value, link, color, bgColor }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-[1rem] md:rounded-[1.2rem] border border-white/5 hover:border-white/20 transition-all duration-300 bg-[#0A192F]/40 backdrop-blur-md hover:bg-[#0A192F]/80">
      <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 ${bgColor} ${color} rounded-full flex items-center justify-center md:group-hover:scale-110 shadow-sm transition-transform duration-300 relative z-10 border border-white/10 group-hover:shadow-[0_0_15px_currentColor]`}>
        {icon}
      </div>
      <div className="text-left overflow-hidden relative z-10">
        <h3 className="text-sm md:text-base font-black text-white mb-0.5 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        <span className={`text-[9px] md:text-[10px] font-black ${color} uppercase tracking-widest block truncate group-hover:translate-x-1 transition-transform duration-300 delay-75`}>{value}</span>
      </div>
    </a>
  );
}

// COMPONENTE PROYECTO
function ProjectDetailView({ title, category, time, image, description, features, onBack }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.98 }} 
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="relative min-h-[100dvh] flex flex-col items-center bg-[#0A192F] px-4 md:px-8 pt-32 md:pt-40 pb-12 overflow-y-auto overflow-x-hidden"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col">
        
        {/* BOTÓN DE VOLVER MEJORADO */}
        <div className="mb-8 md:mb-12 w-full flex justify-start">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 bg-[#0074D9]/10 hover:bg-[#0074D9]/20 border border-[#0074D9]/30 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(0,116,217,0.3)]"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#00E5FF] transform group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
            Volver a Proyectos
          </button>
        </div>

        {/* Header del Proyecto */}
        <div className="mb-8 md:mb-12">
          <span className="inline-block px-3 py-1.5 md:px-4 md:py-1.5 text-[9px] md:text-xs font-black tracking-widest uppercase rounded-full border border-[#0074D9]/30 text-[#00E5FF] mb-4 bg-[#0074D9]/10 shadow-[0_0_15px_rgba(0,116,217,0.2)]">
            {category}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4 md:mb-6">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-white/60 font-bold text-xs md:text-sm uppercase tracking-widest">
            <Clock size={16} className="text-[#0074D9]"/> Tiempo de desarrollo: <span className="text-white">{time}</span>
          </div>
        </div>

        {/* Imagen del Proyecto */}
        <div className="w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 mb-12 md:mb-16 relative">
          <div className="aspect-video w-full relative group bg-[#112240]">
            <img src={image} alt={`Captura de pantalla de ${title}`} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-30"></div>
          </div>
        </div>

        {/* Detalles e Info */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start pb-20">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tighter">Sobre el proyecto</h3>
            <p className="text-white/70 text-sm md:text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-[1.5rem] p-6 md:p-10 border border-white/10 shadow-2xl">
            <h3 className="text-lg md:text-2xl font-black text-white mb-6 tracking-tighter flex items-center gap-2">
              <Code2 className="text-[#0074D9]"/> Características Clave
            </h3>
            <ul className="space-y-4 md:space-y-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 md:gap-4 group">
                  <div className="mt-0.5 text-[#00E5FF] group-hover:scale-125 transition-transform duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-white/80 font-semibold text-xs md:text-base leading-snug group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </motion.section>
  );
}