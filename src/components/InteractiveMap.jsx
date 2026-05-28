import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, Sphere, Graticule } from "react-simple-maps";

export default function InteractiveMap() {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const mendozaCoords = [-68.84, -32.92];
  
  const [rotation, setRotation] = useState([68.84, 32.92, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef([0, 0, 0]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = rotation;
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    const newRotation = [
      rotationStart.current[0] + deltaX * 0.4,
      Math.max(-90, Math.min(90, rotationStart.current[1] - deltaY * 0.4)),
      0
    ];
    setRotation(newRotation);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="w-full h-full min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center p-4 cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{ rotate: rotation, scale: 300 }}
        className="w-full h-full max-h-[500px]"
      >
        <Sphere stroke="#233554" strokeWidth={0.5} fill="rgba(10, 25, 47, 0.5)" />
        <Graticule stroke="#233554" strokeWidth={0.3} opacity={0.4} />
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isArgentina = geo.properties.name === "Argentina";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isArgentina ? "#0074D9" : "#112240"}
                  stroke="#233554"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: isArgentina ? "#00E5FF" : "#1d2d50", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        <Marker coordinates={mendozaCoords}>
          <motion.circle r={8} fill="#00E5FF" animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
          <circle r={4} fill="#00E5FF" stroke="#ffffff" strokeWidth={1.5} />
          <text textAnchor="start" x={12} y={4} className="fill-white text-[10px] md:text-[14px] font-black uppercase tracking-tighter" style={{ pointerEvents: "none", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}>
            Mendoza
          </text>
        </Marker>
      </ComposableMap>
    </div>
  );
}