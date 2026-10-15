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

Scroll nativo suave, entradas que se ejecutan una vez y parallax de 64px solo desde 1024px. Se respeta `prefers-reduced-motion`. No se usa un canvas animado continuo ni carrusel automático. Logos WebP con carga diferida y mascota principal con prioridad alta.

El formulario conserva FormSubmit y WhatsApp conserva el número existente. Para probar envíos reales se necesita la cuenta de FormSubmit activada. La validación local no envía consultas.

Revisión recomendada antes de publicar: 360/390/768/1440px, orientación horizontal, zoom 200%, navegación por teclado y movimiento reducido. Medir Core Web Vitals en el hosting final y dispositivos reales.
