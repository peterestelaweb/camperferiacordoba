# 🚐 Especificación Técnica y Funcional (OpenSpec)
## Proyecto: Camper Feria Córdoba 2026

Este documento detalla la arquitectura de software, el diseño técnico y las especificaciones funcionales que componen la aplicación **Camper Feria Córdoba 2026**. Su objetivo es proporcionar una guía técnica abierta (OpenSpec) clara y detallada para desarrolladores y agentes de inteligencia artificial que colaboren en el proyecto.

---

## 🛠️ 1. Arquitectura y Stack Tecnológico

La aplicación está diseñada como una Single Page Application (SPA) ultra-visual, interactiva y estática (Static Export), optimizada para su visualización en dispositivos móviles y de escritorio.

*   **Framework Principal:** Next.js 16.2.6 (con App Router y compilación estática habilitada mediante `output: 'export'`).
*   **Lenguaje:** TypeScript 5.x.
*   **Librería UI:** React 19.2.4.
*   **Diseño de Estilos:** Tailwind CSS v4 con PostCSS, utilizando una paleta de colores armónica inspirada en la calidez andaluza (colores albero, tierra, café, burdeos y oliva).
*   **Animaciones:** Framer Motion 12.x para micro-transiciones fluidas e interactividad de cartas.
*   **Motor de Mapas:** Leaflet 1.9.4 + React Leaflet 5.0.0 (con carga dinámica asíncrona para evitar fallos de SSR).
*   **Generador de PDF:** jsPDF 4.2.1 + html2canvas 1.4.1 (generación íntegra en el cliente).
*   **Audioguías virtuales:** Web Speech API nativa del navegador (`window.speechSynthesis`), libre de dependencias y de consumo de red.

---

## 📁 2. Estructura de Directorios Clave

```
camper-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Contenedor global de la SPA, fuentes de Google (Inter, Outfit) y SEO.
│   │   ├── page.tsx           # Punto de entrada principal y ensamblaje de componentes.
│   │   └── globals.css        # Carga de Tailwind y estilos utilitarios globales.
│   ├── components/
│   │   ├── Navbar.tsx          # Cabecera interactiva y sticky.
│   │   ├── Hero.tsx            # Portada de la aplicación con animaciones y CTA.
│   │   ├── TripSummary.tsx     # Resumen de kilómetros e integrador de calculadora de combustible.
│   │   ├── RouteMap.tsx        # Contenedor y tramos del mapa de viaje de Barcelona a Córdoba.
│   │   ├── MapComponent.tsx    # Leaflet: Mapa de carretera con paradas de descanso.
│   │   ├── CordobaMapComponent.tsx # Leaflet: Mapa urbano con ruta peatonal por Córdoba [NUEVO].
│   │   ├── CityGuide.tsx       # Guía de la ciudad con reproductor interactivo de audioguía [ACTUALIZADO].
│   │   ├── FeriaGuide.tsx      # Agenda diaria e información de casetas y conciertos oficiales.
│   │   ├── CamperParking.tsx   # Zonas de pernocta verificadas para campers y autocaravanas.
│   │   ├── Gastronomy.tsx      # Platos imperdibles y bebidas de Córdoba.
│   │   ├── Weather.tsx         # Consejos climáticos y meteorológicos de mayo.
│   │   ├── Budget.tsx          # Calculadora reactiva de presupuestos.
│   │   ├── Checklist.tsx       # Listado de tareas interactivas para el viaje camper.
│   │   ├── PDFExport.tsx       # Motor de conversión y descarga de guía en PDF en cliente.
│   │   └── Footer.tsx          # Pie de página y fuentes de datos.
│   └── data/
│       ├── route.ts            # Coordenadas, kilómetros e información de gasolineras.
│       ├── places.ts           # Información, enlaces e historias enriquecidas de monumentos [ACTUALIZADO].
│       ├── feria.ts            # Calendario detallado de la Feria y conciertos oficiales 2026 [ACTUALIZADO].
│       ├── parking.ts          # Tarifas y servicios de aparcamientos camper.
│       └── checklist.ts        # Tareas pendientes de viaje y equipamiento camper.
├── netlify.toml                # Configuración de compilación y redirecciones estáticas de Netlify.
└── next.config.ts              # Configuración de exportación estática de Next.js.
```

---

## ⚡ 3. Módulos Técnicos Destacados

### 🗺️ A. Mapas Dinámicos sin Renderizado del Servidor (SSR Bypass)
Los componentes de Leaflet acceden a propiedades de `window` y manipulan el DOM directamente, lo que provocaría un fallo crítico en el compilador de Next.js durante el pre-renderizado del servidor. Para solucionar esto:
1.  Los mapas están aislados en componentes independientes (`MapComponent` y `CordobaMapComponent`).
2.  Se importan de forma dinámica en los componentes padres (`RouteMap` y `CityGuide`) desactivando explícitamente el renderizado del servidor:
    ```typescript
    const CordobaMapComponent = dynamic(() => import("./CordobaMapComponent"), { ssr: false });
    ```
3.  Se implementa un enrutamiento peatonal sugerido en Córdoba mediante `Polyline` con trazado de coordenadas ordenadas secuencialmente, y marcadores (`Marker`) coloreados mediante URLs de iconos externos de alta definición para clasificar visualmente la tipología del lugar (Patrimonio, Río, Plaza, etc.).

### 🎧 B. Sistema Autónomo de Audioguía (Web Speech API)
Integrado en `CityGuide.tsx` para proporcionar una experiencia de guía turístico privada y offline:
1.  **Locución fluida:** Llama a la API nativa `window.speechSynthesis` configurando el idioma `es-ES` e intentando capturar voces regionales del sistema operativo si están instaladas.
2.  **Velocidad de reproducción óptima:** Modulada a `0.95` para asegurar una entonación natural y descriptiva del patrimonio histórico de Córdoba.
3.  **Control de hilos de audio:**
    *   `handlePlaySpeech`: Administra estados de reproducción. Si el usuario reproduce un monumento diferente, el sintetizador cancela el audio previo de inmediato (`window.speechSynthesis.cancel()`) e inicia el nuevo para evitar el solapamiento de pistas.
    *   `handleStopSpeech`: Permite cortar la locución por completo liberando los hilos del sintetizador.
    *   **Desmontado seguro:** Un `useEffect` de limpieza asegura que si el usuario navega fuera o cierra el componente, la voz se detiene automáticamente, impidiendo bucles infinitos de habla.
4.  **UI Premium:** Botones interactivos que reflejan estados de "Escuchar", "Pausar", "Reanudar", y un ecualizador de sonido animado en CSS (`animate-pulse`) cuando hay voz activa.

### 📄 C. Motor de Exportación PDF Local
Implementado en `PDFExport.tsx`, permite empaquetar toda la información de la web para guardarla offline en el móvil:
1.  `html2canvas` toma selectores específicos del DOM interactivo (con todos sus estilos Tailwind).
2.  `jsPDF` genera un documento multipágina a partir de las imágenes escaladas de los componentes, procesando hojas separadas para la ruta de viaje, el checklist, la gastronomía y la guía monumental.

---

## 🚀 4. Especificaciones de Despliegue y CI/CD

El proyecto está diseñado para funcionar de manera estática y portátil.

### 🌐 GitHub
*   **Repositorio Remoto:** `https://github.com/peterestelaweb/camperferiacordoba.git`
*   **Rama de Producción:** `main`
*   **Flujo de Trabajo:** Las actualizaciones locales se integran mediante commits y se empujan a GitHub.

### ☁️ Netlify (Despliegue Continuo)
*   **Comando de Compilación:** `npm run build`
    *   Este comando ejecuta `next build`, el cual compila la aplicación y realiza un volcado estático de archivos HTML, CSS y JS en la carpeta `/out`.
*   **Directorio de Publicación:** `out`
*   **Versión de Node:** `20`
*   **Redirecciones:** Configurado en `netlify.toml` para redirigir cualquier consulta `/*` hacia `/index.html` con código de estado `200` para garantizar el correcto funcionamiento de rutas SPA estáticas sin backend.

---

## ✍️ 5. Reglas Técnicas y Estéticas para Futuros Desarrolladores / Agentes

Si vas a realizar modificaciones en este código, debes respetar estrictamente las siguientes reglas:

1.  **Mantén la estética premium:** No uses colores utilitarios puros (como `bg-red-500` o `text-blue-600` sin matices). Prioriza HSL y la paleta cálida (tonos café `#2c1810`, albero `#f5e6c8`, crema `#fdf8f0` y burdeos `#c0392b`).
2.  **No añadas backends ni bases de datos:** El proyecto debe mantenerse totalmente autónomo, estático e interactivo en cliente. Todos los datos nuevos deben ser estructurados en TypeScript e incorporados en el directorio `src/data/`.
3.  **Seguridad en SSR:** Cualquier componente que acceda a APIs del navegador (como `document`, `window`, `localStorage` o `speechSynthesis`) debe realizar validaciones previas de entorno (`typeof window !== 'undefined'`) o ejecutarse estrictamente en hooks como `useEffect` o componentes importados con `dynamic({ ssr: false })`.
4.  **Actualiza este OpenSpec:** Si agregas o eliminas características estructurales significativas del proyecto, documenta el cambio técnico al final de este archivo de especificaciones.
