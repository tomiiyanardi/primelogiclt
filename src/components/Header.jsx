import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Header.css';

const links = [['enfoque', 'Enfoque'], ['servicios', 'Servicios'], ['proceso', 'Proceso'], ['proyectos', 'Proyectos'], ['equipo', 'Equipo']];
const mobileLinks = [['inicio', 'Inicio'], ...links, ['contacto', 'Contacto']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const menu = useRef(null);
  const menuClose = useRef(null);
  const { pathname, hash } = useLocation();
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const growth = useTransform(scrollY, [8, 150], [0, 1]);
  const visible = scrolled || open || pathname !== '/';

  useEffect(() => {
    let frame = 0;
    const sections = Array.from(document.querySelectorAll('main > section[id]'));
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 6);
      const marker = Math.min(window.innerHeight * .3, 220);
      let current = 'inicio';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
        else break;
      }
      setActive(previous => previous === current ? previous : current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const root = document.getElementById('root');
    const wasInert = root?.inert;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (root) root.inert = true;
    menuClose.current?.focus({ preventScroll: true });
    const dismiss = () => {
      setOpen(false);
      requestAnimationFrame(() => toggle.current?.focus({ preventScroll: true }));
    };
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); dismiss(); }
      if (event.key !== 'Tab') return;
      const focusable = menu.current?.querySelectorAll('a[href], button');
      if (!focusable?.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 1050px)');
    const resize = event => { if (event.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', resize);
    return () => {
      document.body.style.overflow = overflow;
      if (root) root.inert = wasInert;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => toggle.current?.focus({ preventScroll: true }));
  };
  const navigate = id => {
    setOpen(false);
    if (pathname === '/' && hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    }
  };

  return <>
    <Motion.header className={`site-header ${visible ? 'is-solid' : ''}`} inert={!visible || open} initial={false}
      animate={{ opacity: visible && !open ? 1 : 0, y: visible ? 0 : reduced ? 0 : -10 }}
      transition={{ duration: reduced ? 0 : .2 }}
      style={{ '--island-growth': reduced ? 1 : growth, pointerEvents: visible && !open ? 'auto' : 'none' }}>
      <nav aria-label="Navegación principal" className="site-nav">
        <Link to="/#inicio" onClick={() => navigate('inicio')} className="nav-brand" aria-label="Primelogic LT, inicio">
          <span className="nav-brand-symbol"><img src="/logo.svg" alt="" width="28" height="28" /></span>
          <span>primelogic<small>LT</small><span className="nav-brand-caption">LÓGICA QUE IMPULSA</span></span>
        </Link>
        <div className="nav-links">{links.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={() => navigate(id)} aria-current={active === id ? 'location' : undefined}><span>{label}</span></Link>)}</div>
        <Link className="nav-cta" to="/#contacto" onClick={() => navigate('contacto')}>Hablemos <span><ArrowUpRight size={16} aria-hidden="true" /></span></Link>
        <button ref={toggle} type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label="Abrir menú" onClick={() => setOpen(true)}><Menu size={19} /></button>
      </nav>
      <Motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    </Motion.header>
    {createPortal(<AnimatePresence>{open && <Motion.div ref={menu} className="mobile-menu-overlay" role="dialog" aria-modal="true" aria-label="Menú principal"
      initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }}>
      <div className="mobile-menu-top"><Link to="/#inicio" onClick={() => navigate('inicio')} className="nav-brand" aria-label="Primelogic LT, inicio"><img src="/logo.svg" alt="" width="26" height="26" /><span>primelogic<small>LT</small></span></Link><button ref={menuClose} type="button" onClick={close} aria-label="Cerrar menú"><X size={22} strokeWidth={1.3} /></button></div>
      <nav id="mobile-navigation" aria-label="Navegación móvil" className="mobile-menu-links">
        {mobileLinks.map(([id, label], index) => <Motion.div key={id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: reduced ? 0 : .04 + index * .035 }}><Link to={`/#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => navigate(id)}>{label}</Link></Motion.div>)}
      </nav>
      <div className="mobile-menu-bottom"><span>DESDE MENDOZA. CERCA TUYO.</span><div><a href="https://instagram.com/primelogiclt" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><a href="mailto:primelogiclt@gmail.com">ESCRIBINOS ↗</a></div></div>
    </Motion.div>}</AnimatePresence>, document.body)}
  </>;
}
