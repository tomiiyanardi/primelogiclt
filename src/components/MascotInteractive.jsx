import { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import LiveMascot from './LiveMascot';

const MOODS = [
  {
    id: 'normal',
    name: 'Normal',
    avatar: '/mascots/avatar-normal.webp',
    mascot: '/mascots/mascot-sitting-laptop.webp',
    tag: 'STATUS: CODIFICANDO',
    quote: 'Escribiendo arquitectura limpia, modular y lista para escalar.',
  },
  {
    id: 'wink',
    name: 'Guiño',
    avatar: '/mascots/avatar-wink.webp',
    mascot: '/mascots/mascot-point-forward.webp',
    tag: 'STATUS: SOLUCIONES REALES',
    quote: 'Cero humo, 100% código que funciona en tu negocio diario 😉',
  },
  {
    id: 'happy',
    name: 'Contento',
    avatar: '/mascots/avatar-happy.webp',
    mascot: '/mascots/mascot-phone.webp',
    tag: 'STATUS: ÉXITO EN PRODUCCIÓN',
    quote: 'Procesos automatizados y clientes felices. Misión cumplida.',
  },
  {
    id: 'cool',
    name: 'Cool',
    avatar: '/mascots/avatar-cool.webp',
    mascot: '/mascots/mascot-music-dj.webp',
    tag: 'STATUS: MODO FLUJO',
    quote: 'Automatizaciones que corren solas mientras hacés crecer tu empresa.',
  },
  {
    id: 'surprised',
    name: 'Sorprendido',
    avatar: '/mascots/avatar-surprised.webp',
    mascot: '/mascots/mascot-tablet.webp',
    tag: 'STATUS: RENDIMIENTO 10X',
    quote: '¡Velocidad de entrega y resultados que superan las expectativas!',
  },
];

export default function MascotInteractive() {
  const [activeMood, setActiveMood] = useState(MOODS[0]);
  const [autoplay, setAutoplay] = useState(true);
  const reduced = useReducedMotion();

  // Cycle through the moods on its own until the visitor picks one
  useEffect(() => {
    if (!autoplay || reduced) return undefined;
    const id = setInterval(() => {
      setActiveMood((current) => MOODS[(MOODS.indexOf(current) + 1) % MOODS.length]);
    }, 4200);
    return () => clearInterval(id);
  }, [autoplay, reduced]);

  const pick = (mood) => {
    setAutoplay(false);
    setActiveMood(mood);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto select-none">
      {/* Dynamic speech bubble above mascot */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={activeMood.id}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="mb-4 px-4 py-2.5 rounded-xl text-center max-w-xs relative"
          style={{
            background: 'rgba(9, 24, 38, 0.85)',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            className="block text-[10px] font-black tracking-widest uppercase mb-1"
            style={{ color: '#00d4ff' }}
          >
            {activeMood.tag}
          </span>
          <p className="text-xs text-white/90 font-medium leading-relaxed">
            {activeMood.quote}
          </p>
          {/* Arrow pointing down */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{
              background: 'rgba(9, 24, 38, 0.85)',
              borderRight: '1px solid rgba(0, 212, 255, 0.35)',
              borderBottom: '1px solid rgba(0, 212, 255, 0.35)',
            }}
          />
        </Motion.div>
      </AnimatePresence>

      {/* Mascot visual container */}
      <div className="relative flex items-center justify-center min-h-[22rem] sm:min-h-[26rem] w-full">
        {/* Ambient neon radial glow */}
        <div
          className="absolute inset-0 m-auto w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(0, 119, 255, 0.05) 50%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Mascot: pops in with a little jump on every mood change, then idles */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeMood.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative z-10"
          >
            <LiveMascot
              src={activeMood.mascot}
              alt={`Primelogic Mascota - ${activeMood.name}`}
              imgClassName="h-[18rem] sm:h-[22rem] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,212,255,0.25)]"
              shadow={false}
            />
          </Motion.div>
        </AnimatePresence>

        {/* Ground neon oval reflection */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.45) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Emotion Selector Bar */}
      <div
        className="mt-4 p-2 rounded-2xl flex items-center gap-2 sm:gap-3"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span className="text-[10px] font-bold tracking-wider uppercase pl-2 pr-1 text-white/40 hidden sm:inline">
          Mood:
        </span>
        {MOODS.map((mood) => {
          const isActive = activeMood.id === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => pick(mood)}
              className="group relative flex flex-col items-center p-1.5 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                border: isActive
                  ? '1px solid rgba(0, 212, 255, 0.6)'
                  : '1px solid transparent',
              }}
              title={mood.name}
            >
              <img
                src={mood.avatar}
                alt=""
                aria-hidden="true"
                className={`w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg transition-transform duration-200 ${
                  isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                }`}
              />
              <span
                className={`text-[9px] font-semibold tracking-wide uppercase mt-1 ${
                  isActive ? 'text-[#00d4ff]' : 'text-white/40 group-hover:text-white/70'
                }`}
              >
                {mood.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
