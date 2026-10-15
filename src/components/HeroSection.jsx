import { useRef } from 'react';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const hero = useRef(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0px', '64px']);

  return (
    <section ref={hero} id="inicio" className="landing-hero">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span /> SOFTWARE FACTORY · MENDOZA, ARGENTINA</p>
        <h1>Queremos que<br />a tu empresa<br /><span>le vaya bien.</span></h1>
        <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="hero-description">
          Nos involucramos en tu negocio y construimos la tecnología que necesitás para crecer. Con el mismo compromiso que vos.
        </Motion.p>
        <div className="hero-actions">
          <a className="hero-primary" href="#contacto">Hablemos de tu negocio <ArrowUpRight size={19} aria-hidden="true" /></a>
          <a className="hero-secondary" href="#clientes">Conocé nuestro trabajo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <Motion.div className="hero-mascot" style={{ '--parallax-y': y }} aria-hidden="true">
        <img src="/mascota-apoyada.webp" width="605" height="992" alt="" fetchPriority="high" decoding="async" />
      </Motion.div>
      <a href="#ofrecemos" className="hero-scroll"><ArrowDown size={16} aria-hidden="true" /> Un equipo de tu lado</a>
      <span className="hero-edition" aria-hidden="true">TECNOLOGÍA CON PROPÓSITO</span>
    </section>
  );
}
