import { useEffect, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ENDINGS = ['tu crecimiento.', 'tu operación.', 'tus ventas.', 'tu próximo paso.'];

/** Types and deletes each ending, like a cursor writing by hand. */
function useTypewriter(words, reduced) {
  const [state, setState] = useState({ word: 0, length: reduced ? words[0].length : 0, deleting: false });

  useEffect(() => {
    if (reduced) return undefined;
    const current = words[state.word];
    let delay = state.deleting ? 40 : 85;
    if (!state.deleting && state.length === current.length) delay = 1800;
    if (state.deleting && state.length === 0) delay = 300;

    const id = setTimeout(() => {
      setState((s) => {
        const text = words[s.word];
        if (!s.deleting && s.length === text.length) return { ...s, deleting: true };
        if (s.deleting && s.length === 0) return { word: (s.word + 1) % words.length, length: 0, deleting: false };
        return { ...s, length: s.length + (s.deleting ? -1 : 1) };
      });
    }, delay);
    return () => clearTimeout(id);
  }, [state, words, reduced]);

  return words[state.word].slice(0, state.length);
}

export default function HeroSection() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(ENDINGS, reduced);
  const rise = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="inicio" className="hero">
      <h1 className="sr-only">Primelogic LT. La lógica detrás de tu crecimiento.</h1>

      <Motion.div className="hero-lockup" aria-hidden="true" {...rise(0.1)}>
        <img className="hero-mark" src="/logo.svg" alt="" width="160" height="160" />
        <div className="hero-word">
          <span className="hero-word-top">primelogic</span>
          <span className="hero-sub">
            <i />
            <b>LT</b>
            <span>Software factory</span>
          </span>
        </div>
      </Motion.div>

      <Motion.p className="hero-line" aria-hidden="true" {...rise(0.35)}>
        La lógica detrás de <span className="script">{typed}</span>
        <span className="caret" />
      </Motion.p>

      <Motion.div className="hero-actions" {...rise(0.5)}>
        <a className="pill pill-light" href="#contacto">
          Hablá con nosotros <span aria-hidden="true">→</span>
        </a>
      </Motion.div>

      <a className="hero-scroll" href="#enfoque" aria-label="Bajar al contenido">
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
