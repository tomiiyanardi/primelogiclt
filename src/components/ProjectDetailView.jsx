import React from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Code2, Globe, CheckCircle2, Cpu, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";

export default function ProjectDetailView({ 
  title, 
  category, 
  time, 
  image, 
  description, 
  features, 
  techStack = [], 
  metrics = [], 
  link, 
  onBack,
  onContact
}) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.98 }} 
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }} 
      className="relative min-h-[100dvh] flex flex-col items-center bg-[#071324]/90 px-4 md:px-8 pt-28 md:pt-36 pb-16 overflow-y-auto overflow-x-hidden backdrop-blur-xl"
    >
      {/* Luces de fondo decorativas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0074D9]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-3/4 right-10 w-[400px] h-[300px] bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto flex flex-col relative z-10">
        
        {/* BARRA SUPERIOR DE ACCIONES */}
        <div className="mb-8 md:mb-10 w-full flex justify-between items-center flex-wrap gap-4">
          <button 
            onClick={onBack} 
            className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-[#0074D9] border border-white/15 hover:border-[#0074D9] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[11px] md:text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(0,116,217,0.4)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E5FF] group-hover:text-white transform group-hover:-translate-x-1 transition-all duration-300" aria-hidden="true" />
            Volver a Proyectos
          </button>

          <div className="flex items-center gap-3">
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-2 bg-[#0074D9] hover:bg-[#005bb5] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[11px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#0074D9]/30 hover:shadow-[0_0_20px_rgba(0,116,217,0.5)]"
              >
                Visitar Sitio <Globe className="w-4 h-4 text-[#00E5FF] group-hover:rotate-12 transition-transform duration-300" />
              </a>
            )}
            
            {onContact && (
              <button 
                onClick={onContact}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0074D9] to-[#00A8FF] hover:brightness-110 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[11px] md:text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#0074D9]/40 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#00E5FF]" /> Cotizar Sistema Similar
              </button>
            )}
          </div>
        </div>

        {/* METADATA PRINCIPAL */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3.5 py-1.5 text-[10px] md:text-xs font-black tracking-widest uppercase rounded-full border border-[#0074D9]/40 text-[#00E5FF] bg-[#0074D9]/15 shadow-[0_0_20px_rgba(0,116,217,0.25)]">
              {category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-wider text-white/80 rounded-full bg-white/5 border border-white/10">
              <Clock size={14} className="text-[#00E5FF]"/> Tiempo de desarrollo: <strong className="text-white">{time}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-4">
            {title.replace('\n', ' ')}
          </h1>

          {/* Badges de Stack Tecnológico */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech, idx) => (
                <span key={idx} className="text-[10px] md:text-xs font-bold text-white/90 bg-white/10 hover:bg-[#0074D9]/30 border border-white/15 px-3 py-1 rounded-lg backdrop-blur-sm transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* IMAGEN HERO DEL PROYECTO */}
        <div className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/20 mb-10 md:mb-14 relative bg-[#0A192F] group">
          <div className="aspect-video md:aspect-[16/9] w-full relative overflow-hidden">
            <img 
              src={image} 
              alt={`Captura de pantalla de ${title}`} 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-70"></div>
          </div>
        </div>

        {/* MÉTRICAS DE IMPACTO SI EXISTEN */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-[#00E5FF] mb-1 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-white/70 font-semibold text-xs md:text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* DETALLES: ARQUITECTURA & CARACTERÍSTICAS */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#0074D9]/20 rounded-xl text-[#00E5FF] border border-[#0074D9]/40">
                <Cpu size={22} />
              </div>
              <h2 className="text-xl md:text-3xl font-black text-white tracking-tight">
                Ingeniería & Solución
              </h2>
            </div>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-[#0074D9]/20 to-[#0A192F]/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-[#0074D9]/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#00E5FF]/20 rounded-xl text-[#00E5FF] border border-[#00E5FF]/40">
                <ShieldCheck size={22} />
              </div>
              <h2 className="text-lg md:text-2xl font-black text-white tracking-tight">
                Módulos & Capacidades
              </h2>
            </div>

            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3.5 group">
                  <div className="mt-1 text-[#00E5FF] group-hover:scale-125 transition-transform duration-300 shrink-0">
                    {feature.icon || <CheckCircle2 size={18} />}
                  </div>
                  <span className="text-white/85 font-semibold text-xs md:text-sm leading-snug group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA BOTTOM BANNER */}
        <div className="w-full bg-gradient-to-r from-[#0A192F] via-[#0074D9]/30 to-[#0A192F] border border-[#0074D9]/40 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-[0_0_40px_rgba(0,116,217,0.2)]">
          <div>
            <span className="text-[#00E5FF] font-black uppercase text-xs tracking-widest mb-1 block">¿Tenés una idea similar?</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Construyamos el próximo caso de éxito de tu empresa.
            </h3>
          </div>
          <button 
            onClick={onContact || onBack}
            className="shrink-0 bg-[#0074D9] hover:bg-[#005bb5] text-white px-8 py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#0074D9]/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare size={18} /> Hablar con Tomás y Luciano
          </button>
        </div>

      </div>
    </motion.section>
  );
}