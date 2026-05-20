"use client";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CORDOBA_PLACES } from "@/data/places";

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const violetIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Mapeo de categorías a iconos específicos
const categoryIcons: Record<string, L.Icon> = {
  patrimonio: redIcon,
  barrio: orangeIcon,
  fotografia: violetIcon,
  plaza: violetIcon,
  mirador: blueIcon,
  naturaleza: blueIcon,
};

// Ruta a pie optimizada por Córdoba conectando los monumentos de forma lógica
const TOUR_ROUTE_COORDS: [number, number][] = [
  [37.8773, -4.7814], // 1. Alcázar
  [37.8782, -4.7818], // 2. Judería
  [37.8791, -4.7794], // 3. Mezquita-Catedral
  [37.8795, -4.7800], // 4. Calleja de las Flores
  [37.8798, -4.7757], // 5. Plaza de la Corredera
  [37.878, -4.782],   // 6. Ribera del Guadalquivir
  [37.8768, -4.7791], // 7. Puente Romano
  [37.8755, -4.7788], // 8. Torre de la Calahorra
];

export default function CordobaMapComponent() {
  const center: [number, number] = [37.8782, -4.7794]; // Centro en el casco histórico de Córdoba

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Trazado de la ruta peatonal turística recomendada — Línea morada elegante */}
      <Polyline
        positions={TOUR_ROUTE_COORDS}
        pathOptions={{ color: "#8e44ad", weight: 4, opacity: 0.8, dashArray: "5, 5" }}
      />

      {/* Marcadores de todos los lugares turísticos de Córdoba */}
      {CORDOBA_PLACES.map((place) => {
        const icon = categoryIcons[place.category] || new L.Icon.Default();
        return (
          <Marker key={place.id} position={place.coords} icon={icon}>
            <Popup>
              <div className="max-w-[220px]">
                <div className="font-bold text-sm text-[#2c1810] mb-1">{place.name}</div>
                <div className="text-xs text-gray-500 mb-1">📍 {place.distanceToAreanal} del Arenal</div>
                <p className="text-xs text-[#6b4c3b] line-clamp-3 mb-2">{place.why}</p>
                <div className="flex gap-2">
                  <a
                    href={place.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] bg-[#c0392b] text-white font-semibold px-2 py-1 rounded hover:bg-[#a93226] transition-colors"
                  >
                    Google Maps
                  </a>
                  {place.web && (
                    <a
                      href={place.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-[#6b7c3c] text-white font-semibold px-2 py-1 rounded hover:bg-[#5a6b2e] transition-colors"
                    >
                      Web Oficial
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
