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

## Experiencia en nuevo-estilo

- `ParticleCanvas.jsx`: partículas 2D pequeñas sobre el hero; densidad limitada, DPR máximo 1.5 y pausa fuera del viewport o con la pestaña oculta. Con movimiento reducido, se dibuja un fondo estático.
- `Header.jsx`: isla oculta al inicio, visible desde los primeros 6px de scroll y con crecimiento progresivo hasta los 150px. Incluye sección activa, progreso de lectura y menú móvil con cierre por Escape y devolución del foco.
- `ProductsSection.jsx`: escenario de una pantalla con cuatro fases vinculadas al scroll vertical, pestañas con navegación por flechas/Home/End y mapas SVG animados. El capítulo usa 360svh de recorrido y mantiene visible un escenario sticky de 100svh desde 640px de altura. En pantallas más bajas o con movimiento reducido, conserva el explorador manual sin fijación. Conserva descripciones, prestaciones y preselección del servicio en Contacto.
- `ProcessSection.jsx`: recorrido abierto de cuatro etapas, índice sticky en escritorio y progreso ligado al scroll nativo. En móvil, las etapas permanecen en el flujo para facilitar la lectura.
- `Footer.jsx`: cierre editorial, enlaces de navegación, contactos existentes y firma de marca.

No se agregaron dependencias. Los movimientos decorativos respetan la preferencia de movimiento reducido. Iniciar con `npm run dev`; verificar producción con `npm run build`.

## Equipo como lienzo colaborativo

`TeamSection.jsx` y `TeamSection.css` presentan al equipo en un editor visual propio: cursores de Luciano y Tomás, selección de capas, tarjetas construidas por partes y código que se revela con el scroll. La secuencia es reversible y cada editor sigue su propio progreso; los movimientos de cursores y tarjetas usan transformaciones de Framer Motion. Los textos y avatares se editan en el arreglo `team`.

Desde 640px de alto y con movimiento permitido, la sección tiene un recorrido de 440svh y un escenario sticky de una pantalla. En escritorio muestra ambos perfiles y editores; en móvil enfoca un perfil a la vez. Las pestañas y capas permiten saltar a cada integrante, y el control final completa o reinicia la secuencia. El editor es una representación visual, no modifica archivos ni requiere servicios externos.

En pantallas bajas o con movimiento reducido, ambos perfiles y su código completo aparecen en flujo normal. La presentación incluye una descripción íntegra para lectores de pantalla. No se agregaron dependencias.

Los encabezados de las tarjetas de Equipo usan una grilla en flujo normal para reservar espacio entre avatar, nombre y presentación. Los cursores funcionan de forma autónoma mientras el lienzo está visible: eligen áreas al azar, las seleccionan y se desplazan mediante transformaciones, incluso sin scroll. El scroll controla la escritura y la construcción de los perfiles. Los temporizadores y animaciones se detienen fuera de pantalla, con la pestaña oculta o con movimiento reducido.

`Header.css` define la isla redondeada y el menú móvil inmersivo: overlay de pantalla completa con desenfoque, enlaces centrados, foco contenido, cierre con Escape y bloqueo del fondo. El overlay se monta en `document.body` para evitar que la transformación de la isla limite su tamaño.

`ContactSection.css` adapta Contacto hasta 767px: título en dos líneas, mascota pequeña, campos oscuros de 44px de alto y datos opcionales en una fila compartida. Se conservan los tres pasos y las integraciones. Los campos mantienen tamaño de texto de 16px para evitar zoom al enfocarlos en móviles.
