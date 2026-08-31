import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  LineChart, Database, CheckCircle, ShieldCheck, Users, 
  Calendar, CreditCard, LayoutDashboard, ShoppingCart, 
  Package, Search, Smartphone, Lock, Code2, QrCode, Sparkles 
} from "lucide-react";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import ParticleBackground from "./components/ParticleBackground";
import ProjectEstimatorModal from "./components/ProjectEstimatorModal";
import { proyectosData } from "./components/ProjectsCarousel";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home"); 
  const [scrolled, setScrolled] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("dark");
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view !== "home") setHeaderTheme("dark");
  }, [view]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrolled(scrollTop > 50); 
    
    if (view === "home") {
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollTop / windowHeight);
      setHeaderTheme([0, 2, 4, 6, 7].includes(sectionIndex) ? "dark" : "light");
    }
  };

  const navigateTo = (newView, sectionId = null) => {
    if (newView === "home" && view !== "home") {
      setView("home");
      setHeaderTheme("dark"); 
      setTimeout(() => {
        const el = document.getElementById(sectionId || "inicio");
        if (el && scrollRef.current) scrollRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }, 500);
    } else if (newView === "home") {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el && scrollRef.current) scrollRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
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

  // Buscar proyecto activo si la vista corresponde a uno de ellos
  const activeProject = proyectosData.find(p => p.id === view);

  return (
    <div className="bg-transparent font-sans selection:bg-[#0074D9]/30 overflow-hidden h-[100dvh] w-full relative overscroll-none text-white">  
      {/* ── CANVAS DE FONDO GLOBAL (DESACTIVADO EN MÓVIL POR RENDIMIENTO) ── */}
      {!isMobile && <ParticleBackground />}

      {/* ── BARRA DE PROGRESO DE SCROLL ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0074D9] to-[#00E5FF] origin-left z-[100]" style={{ scaleX }} />

      {/* ── PRELOADER INTELIGENTE Y FLUIDO ── */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader" 
            initial={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }} 
            className="fixed inset-0 z-[100] bg-[#050D1A] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Destello de cometa / luz */}
            <motion.div 
              initial={{ x: "-50vw", y: "-50vh", opacity: 0 }} 
              animate={{ x: "150vw", y: "150vh", opacity: [0, 1, 1, 0] }} 
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }} 
              className="absolute top-0 left-0 w-[400px] md:w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent -rotate-45 pointer-events-none"
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#00E5FF] rounded-full blur-[1px] shadow-[0_0_25px_4px_#00E5FF80]"></div>
            </motion.div>

            <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center flex-grow pb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: 0.2 }} 
                className="text-xl sm:text-2xl md:text-4xl font-light text-white flex items-center justify-center gap-2 sm:gap-3 tracking-wide"
              >
                <div className="relative inline-flex items-center justify-center">
                  <span className="relative z-10 font-normal">Pide</span>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.35, delay: 0.6, ease: "easeInOut" }} className="absolute top-1/2 left-0 w-full h-[2px] bg-[#0074D9] -translate-y-1/2 origin-left z-20" />
                  <motion.span initial={{ opacity: 0, y: 5, rotate: 0 }} animate={{ opacity: 1, y: "-80%", rotate: -3 }} transition={{ duration: 0.35, delay: 0.8, ease: "backOut" }} className="absolute left-0 -top-1 text-[#00E5FF] text-[0.85em] z-30 font-bold whitespace-nowrap">
                    Cumple
                  </motion.span>
                </div>
                <span className="font-extrabold text-white">un deseo.</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.9, duration: 0.4 }} 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 font-bold tracking-wider text-xs md:text-sm text-center"
            >
                <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
                <div className="tracking-tight">
                  <span className="text-white font-black">PRIME</span>
                  <span className="text-[#0074D9] font-black">LOGIC</span>
                  <span className="text-[#00E5FF] ml-1 text-[11px] font-extrabold">LT</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER DE NAVEGACIÓN ── */}
      <Header 
        navigateTo={navigateTo} 
        scrolled={scrolled} 
        isDark={isDark} 
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* ── MODAL ESTIMADOR INTERACTIVO ── */}
      <ProjectEstimatorModal 
        isOpen={isEstimatorOpen} 
        onClose={() => setIsEstimatorOpen(false)} 
      />

      {/* ── CONTENEDOR PRINCIPAL CON SCROLL ── */}
      <main 
        ref={scrollRef} 
        onScroll={handleScroll} 
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth relative z-10 overscroll-y-none"
      >
        <h1 className="sr-only">PrimeLogic LT - Software Factory & Desarrollo Web</h1>
        
        <AnimatePresence mode="wait">
          {view === "home" && (
            <Home 
              key="home"
              navigateTo={navigateTo} 
              heroScale={heroScale} 
              heroTextY={heroTextY} 
              heroTextOpacity={heroTextOpacity} 
              isFirstVisit={isFirstVisit} 
              onOpenEstimator={() => setIsEstimatorOpen(true)}
            />
          )}

          {view === "contacto" && (
            <Contacto 
              key="contacto"
              navigateTo={navigateTo} 
              onOpenEstimator={() => setIsEstimatorOpen(true)}
            />
          )}

          {/* Vistas Dinámicas de Detalle para Todos los Proyectos */}
          {activeProject && (
            <ProjectDetailView 
              key={activeProject.id}
              title={activeProject.title}
              category={activeProject.category}
              time={activeProject.time}
              image={activeProject.image}
              description={activeProject.description}
              features={activeProject.features}
              techStack={activeProject.techBadges}
              metrics={activeProject.metrics}
              link={activeProject.link}
              onBack={() => navigateTo("home", "proyectos")}
              onContact={() => setIsEstimatorOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}