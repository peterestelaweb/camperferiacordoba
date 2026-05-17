# 🚐 Camper Feria Córdoba 2026

> Guía de viaje en camper desde Barcelona a la Feria de Nuestra Señora de la Salud de Córdoba 2026

**Web:** [camperferiacordoba.peterestelaweb.com](https://camperferiacordoba.peterestelaweb.com)  
**Repositorio:** [github.com/peterestelaweb/camperferiacordoba](https://github.com/peterestelaweb/camperferiacordoba)

---

## 🗺️ El viaje

| | |
|---|---|
| **Origen** | Barcelona |
| **Destino** | Córdoba |
| **Salida** | Jueves 21 de mayo de 2026, 18:30h |
| **Regreso** | Lunes 25 de mayo de 2026, 11:00h |
| **Feria** | 23-30 de mayo de 2026, El Arenal |
| **Distancia** | ~1.046 km cada trayecto |
| **Ruta** | A-7 → A-3 → A-31 → A-4 |

---

## 🛠️ Stack técnico

- **Framework:** Next.js 16 (App Router)
- **CSS:** Tailwind CSS
- **Mapas:** React Leaflet + OpenStreetMap
- **PDF:** jsPDF + html2canvas
- **Deploy:** Netlify (static export)
- **Sin backend**, sin base de datos

---

## 🚀 Desarrollo local

```bash
git clone https://github.com/peterestelaweb/camperferiacordoba.git
cd camperferiacordoba/camper-app
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Build y deploy

```bash
npm run build   # Genera carpeta /out
```

### Deploy en Netlify

1. Conecta el repositorio en [app.netlify.com](https://app.netlify.com)
2. Configuración automática desde `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Node version:** 20

---

## 📁 Estructura del proyecto

```
camper-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout global, SEO
│   │   ├── page.tsx         # Página principal
│   │   └── globals.css      # Estilos globales
│   ├── components/
│   │   ├── Navbar.tsx        # Navegación sticky
│   │   ├── Hero.tsx          # Hero con CTA
│   │   ├── TripSummary.tsx   # Resumen + calculadora gasoil
│   │   ├── RouteMap.tsx      # Ruta + mapa + paradas
│   │   ├── MapComponent.tsx  # Mapa Leaflet (dynamic)
│   │   ├── FeriaGuide.tsx    # Agenda día a día
│   │   ├── CityGuide.tsx     # Guía turística Córdoba
│   │   ├── CamperParking.tsx # Parkings camper
│   │   ├── Gastronomy.tsx    # Gastronomía
│   │   ├── Weather.tsx       # Tiempo y consejos
│   │   ├── Budget.tsx        # Calculadora presupuesto
│   │   ├── Checklist.tsx     # Checklist interactivo
│   │   ├── PDFExport.tsx     # Generador PDF
│   │   └── Footer.tsx        # Pie + fuentes
│   └── data/
│       ├── route.ts          # Ruta, tramos, paradas
│       ├── feria.ts          # Agenda Feria 2026
│       ├── places.ts         # Guía turística + gastronomía
│       ├── parking.ts        # Aparcamientos
│       └── checklist.ts      # Items checklist
├── netlify.toml
└── next.config.ts            # Static export
```

---

## ✏️ Actualizar contenido

- **Feria:** `src/data/feria.ts` — `DAILY_PLAN` y `FERIA_INFO`
- **Aparcamientos:** `src/data/parking.ts` — cambiar `pernocta` cuando se confirme
- **Precio gasoil:** `src/data/route.ts` — `defaultFuelPrice`
- **Lugares:** `src/data/places.ts`

---

## ⚠️ Pendientes de confirmar

- Programa oficial Feria 2026 (cordoba.es)
- Lanzaderas Aucorsa especiales de Feria
- Disponibilidad pernocta en parkings durante la Feria

---

## 🔗 Fuentes

- [Ayuntamiento de Córdoba](https://www.cordoba.es)
- [Turismo de Córdoba](https://www.turismodecordoba.org)
- [Aucorsa](https://www.aucorsa.es)
- [Mezquita-Catedral](https://www.mezquita-catedraldecordoba.es)
- [OpenStreetMap](https://www.openstreetmap.org)
- [AEMET](https://www.aemet.es)

---

*Proyecto personal, no oficial. Mayo 2026.*
