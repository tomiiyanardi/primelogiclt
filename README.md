# Primelogic LT

Landing mobile-first con React 19, Vite, Tailwind CSS 4 y Framer Motion.

## Desarrollo

Requiere Node.js compatible con Vite 7 (20.19+ o 22.12+).

```sh
npm ci
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

Publicar `dist/`. Configurar el hosting para resolver rutas como `/proyecto/curvauno` hacia `index.html` (fallback SPA).

## Organización

- `src/components/HeroSection.jsx`: propuesta de valor y mascota apoyada al margen derecho.
- `src/components/Header.jsx`: navegación responsive y menú accesible por teclado.
- `src/pages/Home.jsx`: orden de las secciones.
- `src/index.css`: fondos alternados, layout mobile-first y ajustes responsive.
- `src/utils/animations.jsx`: entradas de contenido al viewport.
- `src/components/ClientsSection.jsx`: clientes y enlaces a casos reales.

El hero ocupa como mínimo 100svh (100vh como fallback). En pantallas bajas o con texto ampliado crece para no recortar contenido. La mascota se ubica fuera del contenedor de texto, contra el margen derecho, con espacio reservado en móvil. Su fondo blanco original se integra al hero sin editar la imagen.

Scroll nativo suave, entradas al viewport, parallax y una secuencia horizontal adaptativa (detallada abajo). Se respeta `prefers-reduced-motion`. Fondos geométricos CSS en capas independientes; logos WebP con carga diferida y mascota principal con prioridad alta.

El formulario conserva FormSubmit y WhatsApp conserva el número existente. Para probar envíos reales se necesita la cuenta de FormSubmit activada. La validación local no envía consultas.

Revisión recomendada antes de publicar: 360/390/768/1440px, orientación horizontal, zoom 200%, navegación por teclado y movimiento reducido. Medir Core Web Vitals en el hosting final y dispositivos reales.

## Experiencia editorial y movimiento

La landing se organiza en seis capítulos con fondos independientes: manifiesto oscuro, servicios gris técnico, proceso marfil, equipo azul claro, casos blanco y contacto verde suave. `ChapterBackdrop.jsx` mantiene el arte decorativo separado del contenido y aplica un desplazamiento de 70px a lo largo del scroll, sin capturar eventos de puntero.

El hero utiliza un reveal tipográfico por líneas, geometría orbital CSS y parallax asociado al scroll. Las figuras son ilustraciones abstractas, no capturas de productos. No se incorporaron dependencias nuevas ni un renderizador WebGL.

`ProductsSection.jsx` usa una secuencia horizontal ligada al scroll vertical a partir de 1024px de ancho y 760px de alto. El capítulo ocupa 350svh; el contenido permanece sticky durante el recorrido. En móviles, pantallas bajas o con movimiento reducido se usa scroll horizontal nativo con snap, foco por teclado y botones anterior/siguiente. El modo se actualiza al cambiar el tamaño o la preferencia de movimiento.

Los estilos de capítulos y la adaptación responsive están centralizados en `src/index.css`. El formulario, los casos y sus rutas conservan sus integraciones existentes.
