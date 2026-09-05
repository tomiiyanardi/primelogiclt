import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Datos temporales simulados. Luego puedes mover esto a un archivo de datos.
const projectDataMock = {
  "importadoralyl": {
    name: "Importadora LYL",
    description: "Desarrollo completo de una plataforma de E-Commerce especializada en la distribución de tecnología y equipos de alta gama. Implementamos un diseño minimalista, un catálogo dinámico y un sistema de contacto rápido vía WhatsApp para cerrar ventas de forma segura y directa, optimizando toda la logística de la empresa.",
    technologies: ["Next.js", "Tailwind CSS", "E-Commerce"],
    images: ["/lyl-1.png", "/lyl-2.png", "/lyl-3.png"],
    color: "from-gray-50 to-gray-200",
    url: "https://www.importadorlyl.com.ar/"
  },
  "sfcervantes": {
    name: "SportFitness Cervantes",
    description: "Desarrollo de un sistema de gestión integral para la sede Cervantes, incluyendo control de acceso, gestión de socios y pagos automatizados. Mejoramos la eficiencia administrativa en un 40%.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    images: ["/placeholder1.png", "/placeholder2.png", "/placeholder3.png"],
    color: "from-blue-50 to-indigo-100"
  },
  "sftrapiche": {
    name: "SportFitness Trapiche",
    description: "Modernización de la infraestructura de red e implementación de software de control de ingresos mediante biometría, garantizando mayor seguridad y agilidad para los clientes.",
    technologies: ["Hardware", "Biometría", "Redes"],
    images: ["/placeholder1.png", "/placeholder2.png"],
    color: "from-indigo-50 to-purple-100"
  },
  // ...otros
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Simulamos la carga de datos del proyecto
    window.scrollTo(0, 0);
    const data = projectDataMock[id] || {
      name: `Proyecto: ${id}`,
      description: "Detalles en construcción. Próximamente agregaremos las capturas y la explicación completa de los desafíos superados y el impacto de este desarrollo.",
      technologies: ["Tecnología A", "Tecnología B"],
      images: ["/placeholder1.png", "/placeholder2.png"],
      color: "from-gray-50 to-gray-100"
    };
    setProject(data);
  }, [id]);

  if (!project) return null;

  return (
    <div className="font-sans antialiased text-brand-black bg-brand-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-brand-blue transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver a inicio</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Columna Izquierda: Info del Proyecto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-8 sticky top-32 h-fit"
          >
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
                Caso de Éxito
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight mb-6">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {project.description}
              </p>
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
            
          </motion.div>

          {/* Columna Derecha: Capturas de Pantalla */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-12"
          >
            <h2 className="text-2xl font-bold text-brand-black mb-8 border-b border-gray-100 pb-4">
              Capturas del Proyecto
            </h2>
            
            <div className="space-y-8">
              {project.images.map((img, idx) => (
                <div key={idx} className={`w-full aspect-video bg-gradient-to-br ${project.color} rounded-3xl overflow-hidden border border-black/5 shadow-lg group relative`}>
                  
                  {/* Imagen Real */}
                  <img src={img} alt={`Captura ${idx + 1}`} className="w-full h-full object-cover" />
                  
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
