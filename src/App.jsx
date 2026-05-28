import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { LineChart, Database, CheckCircle, ShieldCheck, Users, Calendar, CreditCard, LayoutDashboard, ShoppingCart, Package, Search, Smartphone, Lock, Code2 } from "lucide-react";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import ParticleBackground from "./components/ParticleBackground";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("home"); 
  const [scrolled, setScrolled] = useState(false);
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
      }, 700);
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

  return (
    // ¡ACÁ! Le saqué el bg-[#0A192F] para que se vea el fondo de partículas
    // En tu App.jsx:
    <div className="bg-transparent font-sans selection:bg-[#0074D9]/30 overflow-hidden h-[100dvh] w-full relative overscroll-none">  
      {/* ── EL CANVAS CORRE GLOBALMENTE DE FONDO ── */}
      <ParticleBackground />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#0074D9] origin-left z-[100]" style={{ scaleX }} />

      <AnimatePresence>
        {loading && (
          <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
            <motion.div initial={{ x: "-50vw", y: "-50vh", opacity: 0 }} animate={{ x: "150vw", y: "150vh", opacity: [0, 1, 1, 0] }} transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }} className="absolute top-0 left-0 w-[400px] md:w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#FFFACD] to-transparent -rotate-45 pointer-events-none">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#FFFACD] rounded-full blur-[1px] shadow-[0_0_20px_2px_#FFFACD80]"></div>
            </motion.div>
            <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center flex-grow pb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-xl sm:text-2xl md:text-3xl font-light text-white flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
                <div className="relative inline-flex items-center justify-center">
                  <span className="relative z-10">Pide<motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 2.0, ease: "easeInOut" }} className="absolute top-1/2 left-0 w-full h-[1px] bg-white/80 -translate-y-1/2 origin-left z-20" /></span>
                  <motion.span initial={{ opacity: 0, y: 5, rotate: 0 }} animate={{ opacity: 1, y: "-70%", rotate: -3 }} transition={{ duration: 0.5, delay: 2.4, ease: "backOut" }} className="absolute left-0 -top-1 text-[#0074D9] text-[0.8em] z-30 font-normal whitespace-nowrap">Cumple</motion.span>
                </div>
                <span>un deseo.</span>
              </motion.h2>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 0.6 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 font-bold tracking-wider text-xs md:text-sm text-center">
                <img src="/logo.png" alt="Logo de PrimeLogic LT" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                <div><span className="text-white">PRIME</span><span className="text-[#0074D9]">LOGIC</span><span className="text-white/60 ml-0.5 text-[10px]">LT</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header navigateTo={navigateTo} scrolled={scrolled} isDark={isDark} />

      <main ref={scrollRef} onScroll={handleScroll} className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth relative z-10 overscroll-y-none">
        <h1 className="sr-only">PrimeLogic LT - Agencia de Desarrollo</h1>
        <AnimatePresence mode="wait">
          {view === "home" && <Home navigateTo={navigateTo} heroScale={heroScale} heroTextY={heroTextY} heroTextOpacity={heroTextOpacity} isFirstVisit={isFirstVisit} />}
          {view === "contacto" && <Contacto navigateTo={navigateTo} />}
          {view === "proyecto_alcorta" && <ProjectDetailView key="alcorta" title="Alcorta Descartable" category="Dashboard Administrativo Integral" time="4 Semanas" image="/alcortadescartablepantallas.png" description="Sistema a medida para gestión centralizada y administración. Ideal para empresas del rubro de cotillón y descartables que necesitan precisión absoluta. Proveemos una interfaz intuitiva que elimina el uso de planillas genéricas y automatiza los flujos financieros diarios..." features={[{ icon: <LineChart size={18}/>, text: "React JS · Node.js · PostgreSQL" }, { icon: <Database size={18}/>, text: "Gestión de Stock inteligente con alertas de reposición." }, { icon: <CheckCircle size={18}/>, text: "Historial completo de ventas y métricas de rendimiento." }, { icon: <ShieldCheck size={18}/>, text: "Base de datos robusta, segura y escalable." }]} onBack={() => navigateTo("home", "proyectos")} />}
          {view === "proyecto_curva" && <ProjectDetailView key="curva" title="Curva Uno" category="Sistema de Reservas & Dashboard" time="6 Semanas" image="/curvaunopantallas.png" description="Emprendimiento mendocino, donde desarrollamos una plataforma integral de reservas para centro de simuladores de carreras, con toda la lógica necesaria para el correcto funcionamiento del mismo. Construimos una experiencia de usuario fluida..." features={[{ icon: <Users size={18}/>, text: "React JS · Tailwind CSS · MercadoPago API" }, { icon: <Calendar size={18}/>, text: "Gestión de reservas de simuladores y selección de butacas." }, { icon: <CreditCard size={18}/>, text: "Integración de pasarela de pagos automatizada con MercadoPago." }, { icon: <LayoutDashboard size={18}/>, text: "Panel Admin: ABM de usuarios, horarios y registros contables." }]} link="https://curvauno.com" onBack={() => navigateTo("home", "proyectos")} />}
          {view === "proyecto_ecommerce" && <ProjectDetailView key="ecommerce" title="E-Commerce Integral" category="Plataforma de Ventas a Medida" time="8 Semanas" image="/ecommerce.png" description="Desarrollamos una tienda online escalable orientada puramente a la conversión. Diseñamos la plataforma para gestionar todo el ciclo de venta sin depender de terceros: desde la exploración del catálogo con múltiples variantes de producto (talles, colores) hasta el checkout final..." features={[{ icon: <Code2 size={18}/>, text: "React JS · Node.js · Stripe · Tailwind" }, { icon: <CreditCard size={18}/>, text: "Integración nativa con MercadoPago para cobros automatizados." }, { icon: <ShoppingCart size={18}/>, text: "Gestión compleja de variantes de producto, atributos y precios." }, { icon: <Package size={18}/>, text: "Módulo de logística para envíos y domicilios." }]} onBack={() => navigateTo("home", "proyectos")} />}
          {view === "proyecto_flomstore" && <ProjectDetailView key="flomstore" title="Flom Store" category="Catálogo Inteligente & Gestión de Stock" time="5 Semanas" image="/flomstore.png" description="Creamos un ecosistema digital premium para la comercialización de productos Apple. El proyecto se divide en dos fases: una Landing Page de alto impacto visual con animaciones fluidas para capturar clientes, y un catálogo interactivo con filtros dinámicos por modelo, categoría y estado..." features={[{ icon: <Code2 size={18}/>, text: "React JS · Supabase DB · Framer Motion" }, { icon: <Search size={18}/>, text: "Catálogo inteligente con filtros avanzados (estado, categoría, precio)." }, { icon: <Database size={18}/>, text: "Sistema de gestión de inventario en tiempo real conectado a Supabase." }, { icon: <Lock size={18}/>, text: "Panel de control protegido con autenticación segura." }]} link="/flomstore" onBack={() => navigateTo("home", "proyectos")} />}
        </AnimatePresence>
      </main>
    </div>
  );
}