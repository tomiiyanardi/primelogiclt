import { motion as Motion, useReducedMotion } from 'framer-motion';
import ChapterBackdrop from './ChapterBackdrop';

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="nosotros" className="min-h-screen py-20 flex flex-col justify-center relative isolate">
      <ChapterBackdrop variant="rings" label="04" />
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-1">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Image */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1 relative w-full min-h-[24rem] sm:min-h-[30rem] items-center"
          >
            <Motion.div className="relative flex items-center justify-center">
              <picture>
                <source srcSet="/mascota-laptop.webp" type="image/webp" />
                <img
                  src="/mascota-laptop.webp"
                  width="768"
                  height="1024"
                  decoding="async"
                  alt="Mascota de Primelogic con laptop"
                  className="h-[22rem] sm:h-[28rem] lg:h-[32rem] w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </picture>

              {/* Floating tech badge */}
              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-2 rounded-2xl p-3.5 flex items-center gap-3 select-none"
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(0,212,255,.12)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'rgba(0,212,255,.1)', color: '#00d4ff' }}
                >
                  PL
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs font-bold text-white">100% Desarrollo Propio</p>
                  </div>
                  <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,.35)' }}>
                    Arquitectura & IA a medida
                  </p>
                </div>
              </Motion.div>
            </Motion.div>
          </Motion.div>

          {/* Text Content */}
          <Motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="flex-1 order-1 lg:order-2 space-y-12"
          >
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#00d4ff' }}>
                04 / Quiénes somos
              </h2>
              <Motion.span
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: 0.1 }}
                className="inline-block text-4xl font-extrabold text-white mb-6"
              >
                El motor detrás de la lógica
              </Motion.span>
              <Motion.p
                variants={revealItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="text-lg font-light leading-relaxed"
                style={{ color: 'rgba(255,255,255,.45)' }}
              >
                Somos dos amigos con ganas de potenciar negocios reales a través de la tecnología. Nos apasiona involucrarnos profundamente en los desafíos de cada cliente para diseñar y construir la infraestructura exacta que necesitan para escalar. No buscamos ser un proveedor más; nos convertimos en el engranaje tecnológico de tu equipo.
              </Motion.p>
            </div>

            <Motion.div
              className="space-y-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Motion.div
                variants={revealItem}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <h3 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: '#00d4ff' }}>
                  Misión
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(255,255,255,.45)' }}>
                  Implementar, desarrollar, y soportar sistemas e infraestructuras de IT para solucionar y/o ayudar a clientes a que el negocio mejore. Sumergiéndonos en el mismo como si fuese propio, compartiendo el mismo interés de beneficios.
                </p>
              </Motion.div>

              <Motion.div
                variants={revealItem}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <h3 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: '#00d4ff' }}>
                  Visión
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(255,255,255,.45)' }}>
                  Ser referencia regional de sistemas de alta calidad, donde seamos conocidos por implementar soluciones innovadoras, y poder solucionar problemas tecnológicos complejos.
                </p>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
