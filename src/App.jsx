import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Componente para volver al inicio de la página al cambiar de ruta
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToDestination = () => {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const frameId = window.requestAnimationFrame(scrollToDestination);
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/:id" element={<Suspense fallback={<div className="min-h-screen bg-brand-white" aria-label="Cargando proyecto" />}><ProjectDetail /></Suspense>} />
      </Routes>
    </>
  );
}

export default App;