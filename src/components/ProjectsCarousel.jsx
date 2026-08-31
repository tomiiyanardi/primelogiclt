import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, 
  Clock, ArrowRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const proyectosData = [
  {
    id: "proyecto_sportfitness",
    title: "SportFitness",
    subtitle: "Control de Acceso QR & Gestión .NET",
    categoryKey: "gestion_net",
    category: ".NET & Acceso QR",
    image: "/SportFitness.webp",
    tags: "Check-in QR en milisegundos, arqueo de caja diario, altas de socios y cobros.",
    techBadges: [".NET 8", "C#", "QR Scanner", "SQL Server"],
    time: "7 Semanas",
    metrics: [
      { value: "<150ms", label: "Validación QR" },
      { value: "100%", label: "Trazabilidad Caja" },
      { value: "+1.2k", label: "Socios" }
    ],
    description: "Plataforma centralizada en .NET con control financiero, arqueo de caja diario por turno, gestión de socios y Check-in con código QR para validación de acceso instantáneo.",
    features: [
      { text: "Check-in por QR con semáforo de habilitación en milisegundos." },
      { text: "Caja y arqueos diarios con balances por turno." },
      { text: "Padrón digital de socios con historial y cobros." },
      { text: "Alta de pagos y membresías automáticas." },
      { text: "Arquitectura .NET & SQL Server de alta concurrencia." }
    ]
  },
  {
    id: "proyecto_curva",
    title: "Curva Uno",
    subtitle: "Sistema de Reservas en Vivo & ABM",
    categoryKey: "booking_ecommerce",
    category: "Booking & Pagos",
    image: "/curvaunopantallas.webp",
    tags: "Reserva de butacas en vivo, Google Auth, MercadoPago y panel ABM.",
    techBadges: ["React JS", "MercadoPago", "Tailwind", "Node.js"],
    time: "6 Semanas",
    link: "https://curvauno.ar",
    metrics: [
      { value: "100%", label: "Automático" },
      { value: "3 clics", label: "Flujo Reserva" },
      { value: "+4.5★", label: "Satisfacción" }
    ],
    description: "Plataforma de turnos y reservas en tiempo real para simuladores profesionales. Selección de butacas, cobros con MercadoPago y administración total de horarios.",
    features: [
      { text: "Selección de simuladores y butacas en vivo." },
      { text: "Pasarela de pagos nativa con MercadoPago." },
      { text: "Panel Admin con ABM de turnos y registros." },
      { text: "Autenticación segura con Google OAuth." }
    ]
  },
  {
    id: "proyecto_alcorta",
    title: "Alcorta Descartable",
    subtitle: "Dashboard Comercial & Stock",
    categoryKey: "gestion_net",
    category: "Gestión & Stock",
    image: "/alcortadescartablepantallas.webp",
    tags: "Control de stock inteligente, alertas de reposición y balances contables.",
    techBadges: ["React JS", "PostgreSQL", "Node.js", "Tailwind"],
    time: "4 Semanas",
    metrics: [
      { value: "-70%", label: "Tiempo Admin" },
      { value: "Realtime", label: "Stock en Vivo" },
      { value: "+10k", label: "Artículos" }
    ],
    description: "Software a medida para administración comercial y control de inventario. Base de datos relacional con alertas automáticas de reposición, facturación y balances.",
    features: [
      { text: "Gestión de stock inteligente con alertas tempranas." },
      { text: "Historial completo de ventas y métricas por período." },
      { text: "Cobranzas, cuentas corrientes y balance financiero." }
    ]
  },
  {
    id: "proyecto_flomstore",
    title: "Flom Store",
    subtitle: "Catálogo Apple Premium & Supabase",
    categoryKey: "retail_stock",
    category: "Catálogo & Stock",
    image: "/flomstore.webp",
    tags: "Catálogo dinámico, filtros por categoría y stock en tiempo real.",
    techBadges: ["React JS", "Supabase DB", "Framer", "Tailwind"],
    time: "5 Semanas",
    link: "https://flom-store-web.vercel.app/",
    metrics: [
      { value: "0.2s", label: "Búsqueda" },
      { value: "100%", label: "Sincronizado" },
      { value: "+300%", label: "Consultas" }
    ],
    description: "Ecosistema digital premium para comercialización de productos Apple. Catálogo interactivo conectado en tiempo real a Supabase con filtros por estado y panel de control.",
    features: [
      { text: "Catálogo inteligente con filtros avanzados." },
      { text: "Gestión de inventario en tiempo real con Supabase." },
      { text: "Panel de control protegido para edición de catálogo." }
    ]
  },
  {
    id: "proyecto_ecommerce",
    title: "E-Commerce Integral",
    subtitle: "Plataforma de Ventas a Medida",
    categoryKey: "booking_ecommerce",
    category: "E-Commerce",
    image: "/ecommerce.webp",
    tags: "Checkout directo sin comisiones, variantes y envíos automáticos.",
    techBadges: ["React JS", "Stripe / MP", "Node.js", "Tailwind"],
    time: "8 Semanas",
    metrics: [
      { value: "3.8x", label: "Conversión" },
      { value: "< 1.5s", label: "Carga Móvil" },
      { value: "Multi", label: "Pasarelas" }
    ],
    description: "Tienda online a medida orientada a la conversión. Soporta variantes complejas de producto (talles, colores), cálculo automático de costos de envío y checkout integrado.",
    features: [
      { text: "Integración nativa con pasarelas de pago (MercadoPago / Stripe)." },
      { text: "Gestión compleja de variantes de producto y precios." },
      { text: "Módulo de logística para envíos automatizados." }
    ]
  }
];

const categoryFilters = [
  { key: "todos", label: "Todos", count: 5 },
  { key: "gestion_net", label: ".NET & Gestión", count: 2 },
  { key: "booking_ecommerce", label: "Reservas & E-Commerce", count: 2 },
  { key: "retail_stock", label: "Retail & Catálogos", count: 1 }
];

export default function ProjectsCarousel({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const filteredProjects = activeCategory === "todos" 
    ? proyectosData 
    : proyectosData.filter(p => p.categoryKey === activeCategory);

  return (
    <div className="w-full flex flex-col">
      
      {/* ── BARRA DE FILTROS Y CONTROLES ALINEADA ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3.5 w-full">
        
        {/* Píldoras de Filtro */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categoryFilters.map(filter => {
            const isActive = activeCategory === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => {
                  setActiveCategory(filter.key);
                  if (swiperRef.current) swiperRef.current.slideTo(0);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#0074D9] text-white shadow-md shadow-[#0074D9]/25 scale-[1.02]"
                    : "bg-white/85 text-[#0A192F] hover:bg-white border border-[#8A95A5]/25"
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-[#0A192F]/10 text-[#0A192F]"}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Flechas de Navegación y Contador */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-bold text-[#8A95A5] mr-1">
            0{activeIndex + 1} / 0{filteredProjects.length}
          </span>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#0074D9] text-[#0A192F] hover:text-white border border-[#8A95A5]/20 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 rounded-full bg-[#0A192F] hover:bg-[#0074D9] text-white shadow-sm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Siguiente proyecto"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

      {/* ── SHOWCASE CARD (100% ALINEADO AL ANCHO COMPLETO DEL CONTENEDOR) ── */}
      <div className="w-full relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          spaceBetween={24}
          loop={filteredProjects.length > 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          grabCursor={true}
          nested={true}
          touchReleaseOnEdges={true}
          preventClicksPropagation={false}
          className="w-full pb-8 pt-1"
        >
          {filteredProjects.map((proy) => (
            <SwiperSlide key={proy.id} className="w-full">
              <div 
                onClick={() => navigateTo(proy.id)}
                className="group relative w-full bg-[#0A192F] border border-white/15 rounded-2xl md:rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-[#0074D9]/20 overflow-hidden cursor-pointer transition-all duration-300 grid grid-cols-1 md:grid-cols-12 min-h-[380px] md:h-[410px] lg:h-[430px]"
              >
                {/* ── COLUMNA IZQUIERDA: MOCKUP VISUAL DEL SOFTWARE (60%) ── */}
                <div className="md:col-span-7 relative w-full h-[200px] sm:h-[240px] md:h-full bg-[#050D1A] overflow-hidden shrink-0">
                  <img
                    src={proy.image}
                    alt={proy.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-104 brightness-90 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#0A192F] opacity-90 pointer-events-none" />
                  
                  {/* Badge de Categoría */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#050D1A]/85 text-[#00E5FF] border border-white/15 backdrop-blur-md shadow-md">
                      <Sparkles size={11} className="text-[#00E5FF]" /> {proy.category}
                    </span>
                  </div>
                </div>

                {/* ── COLUMNA DERECHA: INFORMACIÓN, STACK Y BOTÓN (40%) ── */}
                <div className="md:col-span-5 p-6 sm:p-7 md:p-8 flex flex-col justify-between relative z-10 bg-gradient-to-b from-[#0A192F] to-[#071324]">
                  
                  <div>
                    {/* Header con tiempo y flecha */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] sm:text-xs font-bold text-white/55 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} className="text-[#00E5FF]" /> {proy.time} de desarrollo
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#0074D9] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    {/* Título Principal */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-[#00E5FF] transition-colors mb-1">
                      {proy.title}
                    </h3>

                    {/* Subtítulo */}
                    <p className="text-white/80 font-bold text-xs sm:text-sm mb-3">
                      {proy.subtitle}
                    </p>

                    {/* Descripción */}
                    <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">
                      {proy.description}
                    </p>

                    {/* Métricas KPI */}
                    {proy.metrics && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {proy.metrics.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center backdrop-blur-sm">
                            <span className="block text-xs sm:text-sm lg:text-base font-black text-[#00E5FF] leading-none">
                              {m.value}
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-white/60 font-semibold block truncate mt-1">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer con Stack y Botón de Acción */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proy.techBadges.slice(0, 3).map((badge, bIdx) => (
                        <span key={bIdx} className="text-[9px] sm:text-[10px] font-bold text-white/85 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Botón Acción */}
                    <span className="inline-flex items-center gap-1.5 text-white font-black text-xs uppercase tracking-wider bg-[#0074D9] group-hover:bg-[#005bb5] px-4 py-2 rounded-full shadow-md transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,116,217,0.5)]">
                      Ver Caso <ArrowRight size={13} />
                    </span>
                  </div>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
