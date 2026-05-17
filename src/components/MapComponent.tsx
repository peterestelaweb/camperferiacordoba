"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OUTBOUND_POLYLINE, ROUTE_COORDS, OVERNIGHT_STOPS } from "@/data/route";

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

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
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

const mainPoints = [
  { coords: ROUTE_COORDS.barcelona, label: "🚐 Barcelona — Salida 18:30h", icon: redIcon },
  { coords: ROUTE_COORDS.tarragona, label: "📍 Tarragona", icon: undefined },
  { coords: ROUTE_COORDS.valencia, label: "📍 Valencia", icon: undefined },
  { coords: ROUTE_COORDS.albacete, label: "📍 Albacete", icon: undefined },
  { coords: ROUTE_COORDS.bailen, label: "📍 Bailén", icon: undefined },
  { coords: ROUTE_COORDS.cordoba, label: "🎡 Córdoba — Destino", icon: greenIcon },
];

export default function MapComponent() {
  const center: [number, number] = [39.5, -2.5];

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Ruta de ida — rojo */}
      <Polyline
        positions={OUTBOUND_POLYLINE}
        pathOptions={{ color: "#c0392b", weight: 4, opacity: 0.8, dashArray: "10, 5" }}
      />

      {/* Marcadores principales */}
      {mainPoints.map((point, i) => (
        <Marker key={i} position={point.coords} icon={point.icon || new L.Icon.Default()}>
          <Popup>
            <div className="text-sm font-medium">{point.label}</div>
          </Popup>
        </Marker>
      ))}

      {/* Paradas nocturnas */}
      {OVERNIGHT_STOPS.map((stop) => (
        <Marker key={stop.id} position={stop.coords} icon={orangeIcon}>
          <Popup>
            <div>
              <div className="font-bold text-sm mb-1">🌙 {stop.name}</div>
              <div className="text-xs text-gray-600">{stop.location}</div>
              <div className="text-xs mt-1">{stop.distanceFromBcn} km desde Barcelona · {stop.timeFromBcn}</div>
              <a
                href={stop.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline mt-1 block"
              >
                Ver en Maps
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* El Arenal */}
      <Marker position={ROUTE_COORDS.elAreanal} icon={greenIcon}>
        <Popup>
          <div>
            <div className="font-bold text-sm">🎡 Recinto Ferial El Arenal</div>
            <div className="text-xs text-gray-600">Feria de Córdoba 2026</div>
            <div className="text-xs mt-1">23-30 de mayo de 2026</div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
