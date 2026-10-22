import LiveMascot from './LiveMascot';

const team = [
  {
    name: 'Luciano',
    role: 'Co-fundador',
    text: 'Se asegura de que cada producto sea claro, útil y agradable de usar, desde la primera idea hasta la entrega.',
    tags: ['Diseño', 'UX/UI', 'Producto'],
    avatar: '/mascots/avatar-cool.svg',
    color: 'var(--blue)',
  },
  {
    name: 'Tomás',
    role: 'Co-fundador',
    text: 'Piensa la arquitectura y las integraciones para que todo funcione firme en la operación diaria.',
    tags: ['Desarrollo', 'Integraciones', 'Infraestructura'],
    avatar: '/mascots/avatar-wink.svg',
    color: 'var(--cyan)',
  },
];

export default function TeamSection() {
  return (
    <section id="equipo" className="section">
      <div className="wrap team-grid">
        <header className="section-head team-head">
          <p className="eyebrow">Quiénes somos</p>
          <h2 className="display">Nuestro equipo</h2>
          <p className="lead">
            Somos dos amigos con ganas de potenciar negocios reales con tecnología. No buscamos ser un proveedor más: nos sumamos como el equipo técnico de tu empresa.
          </p>
        </header>

        <pre className="code-card" aria-label="Fragmento de código decorativo">
          <code>
            <span className="c-k">const</span> equipo = <span className="c-f">primelogic</span>([<span className="c-s">'Luciano'</span>, <span className="c-s">'Tomás'</span>]);{'\n'}
            equipo.<span className="c-f">crear</span>({'{'} impacto: <span className="c-s">'real'</span> {'}'});{'\n'}
            <span className="c-c">// ✓ deploy listo</span>
          </code>
        </pre>

        <div className="people">
          {team.map((person) => (
            <article key={person.name} className="person" style={{ '--c': person.color }}>
              <div className="person-top">
                <div className="person-avatar">
                  <LiveMascot src={person.avatar} alt={`Personaje de ${person.name}`} float={4} sway={2} duration={4} shadow={false} />
                </div>
              </div>
              <div className="person-body">
                <span className="person-role">{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.text}</p>
                <ul>
                  {person.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
