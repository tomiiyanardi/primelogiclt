import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevealText } from '../utils/animations';

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100svh-5rem)] bg-brand-white text-brand-black flex items-center px-6 pt-24 pb-16 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center z-10">
        <div className="text-center lg:text-left">
          <Motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src="/logo.svg"
            alt="Primelogic LT Logo"
            className="w-28 md:w-36 h-auto mb-8 mx-auto lg:mx-0"
          />
          <p className="text-brand-blue text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-5">
            Ingeniería digital para negocios que quieren avanzar
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05]">
            <RevealText delay={0.2}>
              Convertimos procesos complejos en productos simples
            </RevealText>
          </h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0"
          >
            Diseñamos y construimos software a medida, automatizaciones e integraciones que ayudan a tu empresa a ganar tiempo, control y capacidad de crecimiento.
          </Motion.p>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center lg:justify-start gap-3 mt-9"
          >
            <Link to="/#contacto" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
              Agendar una consulta
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/#clientes" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-brand-black transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              Ver casos de éxito
            </Link>
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-last flex min-h-[16rem] items-end justify-center sm:min-h-[22rem] lg:min-h-[34rem]"
        >
          <div className="absolute bottom-8 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-blue/[0.07] blur-3xl sm:h-72 sm:w-72" aria-hidden="true" />
          <Motion.img
            src="/hero-char.png"
            alt="Ilustración de un especialista preparando una solución tecnológica"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative z-10 h-[18rem] w-auto max-w-full object-contain drop-shadow-xl sm:h-[24rem] lg:h-[34rem]"
          />
        </Motion.div>
      </div>
      
      <div className="hero-signal absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <span className="signal-node signal-node-one"></span>
        <span className="signal-node signal-node-two"></span>
        <span className="signal-node signal-node-three"></span>
        <span className="signal-line signal-line-one"></span>
        <span className="signal-line signal-line-two"></span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-blue/[0.03] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
