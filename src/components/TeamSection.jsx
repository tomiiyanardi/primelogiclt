import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { animate, motion as Motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Check, Code2, Layers, MousePointer2, Plus, Scan, Users } from 'lucide-react';
import './TeamSection.css';

const team = [
  {
    name: 'Luciano', key: 'luciano', role: 'Co-fundador', specialty: 'Diseño & experiencia',
    text: 'Se asegura de que cada producto sea claro, útil y agradable de usar, desde la primera idea hasta la entrega.',
    tags: ['Diseño', 'UX/UI', 'Producto'], avatar: '/mascots/avatar-cool.svg', color: '#bba0ff',
    code: 'const luciano = {\n  nombre: "Luciano",\n  rol: "Co-fundador",\n  enfoque: "Productos claros, útiles y agradables",\n  areas: ["Diseño", "UX/UI", "Producto"]\n};\n\n<Perfil {...luciano} />',
  },
  {
    name: 'Tomás', key: 'tomas', role: 'Co-fundador', specialty: 'Desarrollo & arquitectura',
    text: 'Piensa la arquitectura y las integraciones para que todo funcione firme en la operación diaria.',
    tags: ['Desarrollo', 'Integraciones', 'Infraestructura'], avatar: '/mascots/avatar-wink.svg', color: '#70ddc5',
    code: 'const tomas = {\n  nombre: "Tomás",\n  rol: "Co-fundador",\n  enfoque: "Una operación que funciona firme",\n  areas: ["Desarrollo", "Integraciones", "Infraestructura"]\n};\n\n<Perfil {...tomas} />',
  },
];
const query = '(min-height: 640px) and (min-width: 320px) and (prefers-reduced-motion: no-preference)';
function subscribe(callback) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function CollaboratorCursor({ person, x, y, animated }) {
  return <Motion.div className="collaborator-cursor" aria-hidden="true" style={animated ? { left: 0, top: 0, x, y } : { left: '78%', top: '12%' }}>
    <svg viewBox="0 0 24 30"><path d="M2 2 21 19 12 20 8 28Z" /></svg><span>{person.name}</span>
  </Motion.div>;
}

function CodeEditor({ person, progress, animated }) {
  const [length, setLength] = useState(() => Math.round(progress.get() * person.code.length));
  const scrollRef = useRef(null);
  useMotionValueEvent(progress, 'change', value => {
    const next = Math.round(value * person.code.length);
    setLength(previous => previous === next ? previous : next);
  });
  const count = animated ? length : person.code.length;
  const text = person.code.slice(0, count);
  const lines = text.split('\n');
  const writing = animated && count > 0 && count < person.code.length;
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [count]);
  return <div className="team-code-editor" aria-hidden="true">
    <div className="team-code-tab"><Code2 size={12} /><span>{person.key}.jsx</span><span className="team-file-state">{count === person.code.length ? '✓' : '●'}</span></div>
    <div ref={scrollRef} className="team-code-scroll"><pre><code>{lines.map((line, index) => <span className="team-code-line" key={index}><span className="team-code-number">{index + 1}</span><span>{line.split(/("[^"]*"|\bconst\b)/g).map((token, i) => <span key={i} className={token === 'const' ? 'team-token-key' : token.startsWith('"') ? 'team-token-string' : undefined}>{token}</span>)}{index === lines.length - 1 && writing && <span className="team-writing-caret"><span>{person.name}</span></span>}</span></span>)}</code></pre></div>
  </div>;
}

function PersonWorkspace({ person, progress, animated, index }) {
  const workspace = useRef(null);
  const inView = useInView(workspace, { amount: .1 });
  const cursorX = useMotionValue(24);
  const cursorY = useMotionValue(70);
  const [focus, setFocus] = useState(null);
  useEffect(() => {
    if (!animated || !inView) return undefined;
    let timer;
    let movement = [];
    let previous = '';
    const targets = [
      { selector: '.team-live-card', label: 'Perfil', at: 0 },
      { selector: '.team-code-editor', label: 'Código', at: 0 },
      { selector: '.team-created-avatar', label: 'Avatar', at: .22 },
      { selector: '.team-created-name', label: 'Nombre', at: .36 },
      { selector: '.team-created-details', label: 'Presentación', at: .69 },
      { selector: '.team-created-tags', label: 'Especialidades', at: .9 },
    ];
    const stop = () => {
      clearTimeout(timer);
      movement.forEach(control => control.stop());
    };
    const move = () => {
      if (document.hidden || !workspace.current) return;
      const bounds = workspace.current.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const available = targets.filter(target => progress.get() >= target.at && target.selector !== previous);
      const target = available[Math.floor(Math.random() * available.length)];
      const element = workspace.current.querySelector(target.selector);
      const box = element.getBoundingClientRect();
      const x = box.left - bounds.left;
      const y = box.top - bounds.top;
      previous = target.selector;
      setFocus({ x: x - 4, y: y - 4, width: box.width + 8, height: box.height + 8, label: target.label });
      const duration = .85 + Math.random() * .55;
      const ease = [.22, 1, .36, 1];
      movement.forEach(control => control.stop());
      movement = [
        animate(cursorX, Math.max(8, Math.min(bounds.width - 78, x + box.width * (.45 + Math.random() * .45))), { duration, ease }),
        animate(cursorY, Math.max(20, Math.min(bounds.height - 52, y + Math.min(box.height * .35, 35) + Math.random() * 12)), { duration, ease }),
      ];
      timer = setTimeout(move, (duration + 1.25 + Math.random() * 1.2) * 1000);
    };
    const visibility = () => { stop(); if (!document.hidden) move(); };
    timer = setTimeout(move, 150 + index * 650);
    document.addEventListener('visibilitychange', visibility);
    return () => { stop(); document.removeEventListener('visibilitychange', visibility); };
  }, [animated, inView, progress, cursorX, cursorY, index]);
  const avatarOpacity = useTransform(progress, [.08, .22], [0, 1]);
  const avatarScale = useTransform(progress, [.08, .25], [.55, 1]);
  const nameOpacity = useTransform(progress, [.22, .36], [0, 1]);
  const detailsOpacity = useTransform(progress, [.38, .69], [0, 1]);
  const tagsOpacity = useTransform(progress, [.7, .9], [0, 1]);
  const borderOpacity = useTransform(progress, [0, .06, .92, 1], [.2, 1, 1, .6]);
  return <div ref={workspace} className={`team-person-workspace workspace-${index}`} style={{ '--collaborator': person.color }}>
    <div className="team-design-space">
      <span className="team-frame-label" aria-hidden="true">{person.name} / Perfil</span>
      <article className="team-live-card" aria-hidden="true">
        <Motion.div className="team-selection" style={animated ? { opacity: borderOpacity } : {}} aria-hidden="true"><i /><i /><i /><i /><span>Auto layout <Plus size={8} /> Perfil</span></Motion.div>
        <div className="team-card-grid" aria-hidden="true" />
        <div className="team-card-heading">
          <Motion.div className="team-created-avatar" style={animated ? { opacity: avatarOpacity, scale: avatarScale } : {}}><img src={person.avatar} alt={`Personaje de ${person.name}`} width="100" height="100" loading="lazy" /></Motion.div>
          <Motion.div className="team-created-name" style={animated ? { opacity: nameOpacity } : {}}><span>{person.role}</span><h3>{person.name}</h3></Motion.div>
        </div>
        <Motion.div className="team-created-details" style={animated ? { opacity: detailsOpacity } : {}}><p className="team-specialty">{person.specialty}</p><p>{person.text}</p></Motion.div>
        <Motion.ul className="team-created-tags" style={animated ? { opacity: tagsOpacity } : {}}>{person.tags.map(tag => <li key={tag}>{tag}</li>)}</Motion.ul>
      </article>
    </div>
    <CodeEditor person={person} progress={progress} animated={animated} />
    {animated && focus && <Motion.div className="team-area-highlight" aria-hidden="true" initial={false}
      animate={{ x: focus.x, y: focus.y, width: focus.width, height: focus.height }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
      <i /><i /><i /><i /><span>{focus.label}</span>
    </Motion.div>}
    <CollaboratorCursor person={person} x={cursorX} y={cursorY} animated={animated} />
  </div>;
}

export default function TeamSection() {
  const ref = useRef(null);
  const animated = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const luciano = useTransform(scrollYProgress, [.035, .44], [0, 1]);
  const tomas = useTransform(scrollYProgress, [.49, .9], [0, 1]);
  const [phase, setPhase] = useState(0);
  const [manualPerson, setManualPerson] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const next = value >= .92 ? 2 : value >= .48 ? 1 : 0;
    setPhase(previous => previous === next ? previous : next);
  });
  const person = animated ? Math.min(phase, 1) : manualPerson;
  function goTo(index) {
    if (!animated) { setManualPerson(index); return; }
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * [ .46, .915, .98, .035 ][index], behavior: 'smooth' });
  }
  return <section ref={ref} id="equipo" className={`team-studio ${animated ? 'is-scroll-studio' : 'is-static-studio'}`}>
    <div className="team-studio-stage wrap">
      <header className="team-studio-heading"><div><p className="eyebrow">05 / PERSONAS DETRÁS DE LA LÓGICA</p><h2 className="display">Buen equipo.<br className="team-mobile-break" /> Desde el origen.</h2></div><p>Somos dos amigos con ganas de potenciar negocios reales con tecnología. Nos sumamos como el equipo técnico de tu empresa.</p></header>
      <div className="team-editor" data-person={person}>
        <div className="team-editor-toolbar"><div className="team-editor-brand"><span className="team-editor-mark"><i /><i /><i /></span><span>primelogic <b>/</b> equipo</span></div><span className="team-editor-mode"><Layers size={12} /> Lienzo colaborativo</span><div className="team-editor-users" aria-label="Luciano y Tomás"><span>L</span><span>T</span><Users size={14} /></div></div>
        <div className="team-editor-body">
          <aside className="team-editor-layers" aria-label="Perfiles del equipo"><p><Layers size={12} /> CAPAS</p><span className="team-layer-page">⌘ Equipo / Personas</span>{team.map((member,index) => <button key={member.key} type="button" onClick={() => goTo(index)} aria-pressed={person === index}><Scan size={13} /><span>{member.name}<small>Perfil · Auto layout</small></span><span className="team-layer-color" style={{ background: member.color }} /></button>)}<div className="team-layer-note"><MousePointer2 size={15} /><span>Dos miradas.<br />La misma dirección.</span></div></aside>
          <div className="team-editor-canvas"><div className="team-canvas-ruler" aria-hidden="true"><span>0</span><span>160</span><span>320</span><span>480</span><span>640</span></div><div className="team-mobile-switch" role="group" aria-label="Ver perfil">{team.map((member,index) => <button key={member.key} type="button" onClick={() => goTo(index)} aria-pressed={person === index}><i style={{ background: member.color }} />{member.name}</button>)}</div><div className="team-workspaces"><PersonWorkspace person={team[0]} progress={luciano} animated={animated} index={0} /><PersonWorkspace person={team[1]} progress={tomas} animated={animated} index={1} /></div></div>
        </div>
        <div className="team-editor-status"><span><i /> {animated && phase < 2 ? 'Construyendo equipo' : 'Equipo conectado'} <b>·</b> 2 colaboradores</span><span><Check size={11} /> {animated && phase < 2 ? 'Cambios en vivo' : 'Todo sincronizado'}</span></div>
      </div>
      <div className="team-studio-footer"><span>{animated ? <><ArrowDown size={12} /> SCROLL PARA CONSTRUIR EL EQUIPO</> : <><Check size={12} /> EL EQUIPO DETRÁS DE TU PROYECTO</>}</span>{animated ? <button type="button" onClick={() => goTo(phase < 2 ? 2 : 3)}>{phase < 2 ? 'Ver equipo completo ↗' : 'Volver a construir ↺'}</button> : <a href="#contacto">Hablemos de tu proyecto ↗</a>}</div>
      <div className="sr-only"><h3>Las personas de Primelogic LT</h3>{team.map(member => <p key={member.key}>{member.name}, {member.role}. {member.text} Especialidades: {member.tags.join(', ')}.</p>)}</div>
    </div>
  </section>;
}
