import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const projectData = {
  "importadoralyl": {
    name: "Importadora LYL",
    category: "E-Commerce para distribución tecnológica",
    description: "Importadora LYL necesitaba llevar su catálogo y proceso comercial a un entorno digital propio. Desarrollamos una tienda online para presentar tecnología y equipos de alta gama, facilitar la búsqueda de productos y convertir consultas en ventas directas.",
    problem: "La oferta estaba concentrada en canales dispersos y el cliente no contaba con una experiencia digital propia para explorar productos y consultar compras.",
    solution: "Construimos un e-commerce con catálogo dinámico, buscador, carrito, experiencia responsive y contacto rápido por WhatsApp.",
    outcome: "La empresa cuenta con un canal digital centralizado para mostrar su catálogo, recibir consultas y acompañar el proceso de compra.",
    technologies: ["Next.js", "Tailwind CSS", "E-Commerce"],
    images: ["/lyl-1.png", "/lyl-2.png", "/lyl-3.png"],
    color: "from-gray-50 to-gray-200",
    url: "https://www.importadorlyl.com.ar/"
  },
  "sfcervantes": {
    name: "SportFitness Cervantes",
    category: "Sistema de gestión para gimnasios",
    description: "SportFitness Cervantes necesitaba dejar atrás los controles manuales de su operación diaria. Desarrollamos un sistema de gestión integral para ordenar el acceso, la información de socios y el seguimiento de pagos desde una misma herramienta.",
    problem: "El equipo no contaba con un sistema centralizado para verificar socios, registrar ingresos y consultar el estado de las cuotas.",
    solution: "Implementamos control de acceso por QR y búsqueda manual, gestión de socios, caja y pagos dentro de un panel operativo claro.",
    outcome: "La sede puede resolver tareas clave de recepción y administración con información disponible en tiempo real.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    images: ["/SportFitness.png", "/SportFitness.webp"],
    color: "from-blue-50 to-indigo-100",
    url: null
  },
  "sftrapiche": {
    name: "SportFitness Trapiche",
    category: "Infraestructura y control de acceso",
    description: "Para SportFitness Trapiche desarrollamos la infraestructura tecnológica necesaria para modernizar el ingreso de sus socios y darle mayor control a la operación de la sede.",
    problem: "El acceso dependía de procesos manuales y la infraestructura existente no acompañaba el volumen de uso cotidiano del gimnasio.",
    solution: "Integramos red, hardware y control biométrico para validar ingresos de forma rápida y segura.",
    outcome: "La sede cuenta con un acceso más ordenado y una base tecnológica preparada para sostener su operación diaria.",
    technologies: ["Hardware", "Biometría", "Redes"],
    images: ["/SportFitness.webp", "/SportFitness.png"],
    color: "from-indigo-50 to-purple-100",
    url: null
  },
  "flomstore": {
    name: "Flom Store",
    category: "Experiencia digital para tienda online",
    description: "Flom Store necesitaba una presencia digital que estuviera a la altura de su identidad y que pudiera presentar su propuesta de manera simple, cuidada y memorable.",
    problem: "La marca no tenía un espacio digital propio que combinara identidad visual, catálogo y una navegación pensada para sus clientes.",
    solution: "Diseñamos y desarrollamos una experiencia de tienda online con navegación minimalista, presentación editorial y foco en el descubrimiento de productos.",
    outcome: "Flom Store tiene ahora una vidriera digital con personalidad propia y una base preparada para crecer como canal comercial.",
    technologies: ["E-Commerce", "Diseño UX", "Integraciones"],
    images: ["/flomstore.png", "/flomstore.webp"],
    color: "from-pink-50 to-rose-100",
    url: null
  },
  "alcorta": {
    name: "Alcorta Descartables",
    category: "Gestión comercial y operaciones",
    description: "Alcorta Descartables necesitaba transformar información comercial dispersa en una herramienta para tomar decisiones sobre ventas, costos, stock y compras.",
    problem: "La operación no tenía un sistema centralizado para consultar el estado del negocio ni visualizar el rendimiento de sus ventas desde distintos dispositivos.",
    solution: "Desarrollamos un dashboard responsive con indicadores de ventas, ganancias, costos, caja, stock, alertas e historial de movimientos.",
    outcome: "El negocio puede consultar el pulso de su operación desde una interfaz única, tanto en computadora como en celular.",
    technologies: ["Catálogo Web", "Responsive Design", "Automatización"],
    images: ["/alcortadescartablepantallas.png", "/alcortadescartablepantallas.webp"],
    color: "from-rose-50 to-orange-100",
    url: null
  },
  "curvauno": {
    name: "Curva Uno",
    category: "Experiencia digital y reservas",
    description: "Curva Uno necesitaba convertir una propuesta vinculada al automovilismo virtual en una experiencia digital que transmitiera su energía y facilitara la reserva de servicios.",
    problem: "La marca no contaba con una plataforma propia para explicar su propuesta, mostrar la experiencia y recibir reservas desde cualquier dispositivo.",
    solution: "Creamos una landing inmersiva con identidad visual de competición, adaptación responsive y llamados a la acción orientados a reservar.",
    outcome: "Curva Uno cuenta con una presentación digital coherente con su universo de marca y preparada para transformar interés en reservas.",
    technologies: ["Diseño Web", "Responsive Design", "Contenido Digital"],
    images: ["/curvaunopantallas.png", "/curvaunopantallas.webp"],
    color: "from-orange-50 to-amber-100",
    url: null
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData[id] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="font-sans antialiased text-brand-black bg-brand-white min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">Caso no encontrado</p>
          <h1 className="mb-5 text-4xl font-extrabold">Este proyecto todavía no está publicado.</h1>
          <button type="button" onClick={() => navigate('/')} className="rounded-full bg-brand-blue px-6 py-3 font-bold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
            Volver a inicio
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-brand-black bg-brand-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-brand-blue transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver a inicio</span>
        </Motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Columna Izquierda: Info del Proyecto */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-8 sticky top-32 h-fit"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                {project.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight mb-6">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-6 border-y border-gray-100 py-7">
              <div>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">El desafío</h2>
                <p className="leading-relaxed text-gray-600">{project.problem}</p>
              </div>
              <div>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">Lo que hicimos</h2>
                <p className="leading-relaxed text-gray-600">{project.solution}</p>
              </div>
              <div>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">El resultado</h2>
                <p className="leading-relaxed text-gray-600">{project.outcome}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tecnologías</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-black text-brand-white rounded-xl font-bold hover:bg-brand-blue hover:scale-105 transition-all shadow-lg group"
                >
                  Visitar Proyecto
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
            
          </Motion.div>

          {/* Columna Derecha: Capturas de Pantalla */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-12"
          >
            <h2 className="text-2xl font-bold text-brand-black mb-8 border-b border-gray-100 pb-4">
              El proyecto en imágenes
            </h2>
            
            <div className="space-y-8">
              {project.images.map((img, idx) => (
                <div key={idx} className={`w-full aspect-video bg-gradient-to-br ${project.color} rounded-3xl overflow-hidden border border-black/5 shadow-lg group relative`}>
                  
                  {/* Imagen Real */}
                  <img src={img} alt={`${project.name}, vista ${idx + 1}`} className="w-full h-full object-cover" />
                  
                </div>
              ))}
            </div>
          </Motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
