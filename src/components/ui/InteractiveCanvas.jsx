import React, { useRef, useEffect } from 'react';

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const spacing = 50; // Grid spacing
    let time = 0;
    
    const draw = () => {
      time += 0.015; // Velocidad de la animación autónoma
      
      ctx.clearRect(0, 0, width, height);
      
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          
          // Efecto de ola autónomo (wave) combinando senos y cosenos
          const wave = Math.sin(time + i * 0.15) * Math.cos(time + j * 0.15);
          const normalizedWave = (wave + 1) / 2; // de 0 a 1
          
          // Propiedades animadas automáticamente
          const alpha = 0.05 + (normalizedWave * 0.2); // Brilla suavemente por zonas
          const offset = wave * 6; // Flotación
          const size = 3 + (normalizedWave * 2.5); // Cambia de tamaño
          
          // Draw a plus symbol '+'
          const drawX = x + Math.sin(time + j * 0.2) * offset;
          const drawY = y + Math.cos(time + i * 0.2) * offset;
          
          ctx.beginPath();
          ctx.moveTo(drawX - size, drawY);
          ctx.lineTo(drawX + size, drawY);
          ctx.moveTo(drawX, drawY - size);
          ctx.lineTo(drawX, drawY + size);
          
          ctx.strokeStyle = `rgba(19, 46, 76, ${alpha})`; // Brand blue base
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
      
      // Dibujar un gradiente global muy suave moviéndose
      const glowX = width / 2 + Math.sin(time * 0.5) * (width / 3);
      const glowY = height / 2 + Math.cos(time * 0.3) * (height / 3);
      
      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.6);
      gradient.addColorStop(0, 'rgba(29, 78, 216, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1] bg-[#f8fafc]"
    />
  );
};

export default InteractiveCanvas;
