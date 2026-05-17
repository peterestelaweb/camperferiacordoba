"use client";
import dynamic from "next/dynamic";
import { TRIP_DATA, OVERNIGHT_STOPS, ROUTE_COORDS } from "@/data/route";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-[#e8f4fd] rounded-2xl flex items-center justify-center">
      <div className="text-center text-[#6b4c3b]">
        <div className="text-4xl mb-3 animate-pulse">🗺️</div>
        <p className="font-medium">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function RouteMap() {
  return (
    <section id="ruta" className="py-20 bg-[#f5e6c8]/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🗺️ La Ruta
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Barcelona → Córdoba · {TRIP_DATA.outbound.distance.toLocaleString()} km · {TRIP_DATA.outbound.duration}
          </p>
        </div>

        {/* Mapa interactivo */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-[#f5e6c8] mb-10" style={{ height: "450px" }}>
          <MapComponent />
        </div>

        {/* Tramos de la ruta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Ida */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f5e6c8]">
            <h3 className="font-bold text-xl text-[#c0392b] mb-4 flex items-center gap-2">
              🚗 Ruta de Ida
              <span className="text-sm font-normal text-[#9b7b6b]">— Jue 21 mayo, 18:30h</span>
            </h3>
            <div className="space-y-3">
              {TRIP_DATA.outbound.legs.map((leg, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c0392b] text-white text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#2c1810]">
                      {leg.from} → {leg.to}
                    </div>
                    <div className="text-xs text-[#9b7b6b]">
                      {leg.road} · {leg.km} km · {leg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#f5e6c8] flex gap-4 text-sm">
              <div>
                <span className="text-[#9b7b6b]">Total: </span>
                <span className="font-bold">{TRIP_DATA.outbound.distance} km</span>
              </div>
              <div>
                <span className="text-[#9b7b6b]">Tiempo: </span>
                <span className="font-bold">{TRIP_DATA.outbound.duration}</span>
              </div>
            </div>
          </div>

          {/* Vuelta */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f5e6c8]">
            <h3 className="font-bold text-xl text-[#6b7c3c] mb-4 flex items-center gap-2">
              🏠 Ruta de Vuelta
              <span className="text-sm font-normal text-[#9b7b6b]">— Lun 25 mayo, 11:00h</span>
            </h3>
            <div className="space-y-3">
              {TRIP_DATA.return.legs.map((leg, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6b7c3c] text-white text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#2c1810]">
                      {leg.from} → {leg.to}
                    </div>
                    <div className="text-xs text-[#9b7b6b]">
                      {leg.road} · {leg.km} km · {leg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#f5e6c8] flex gap-4 text-sm">
              <div>
                <span className="text-[#9b7b6b]">Total: </span>
                <span className="font-bold">{TRIP_DATA.return.distance} km</span>
              </div>
              <div>
                <span className="text-[#9b7b6b]">Tiempo: </span>
                <span className="font-bold">{TRIP_DATA.return.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paradas nocturnas */}
        <div>
          <h3 className="text-2xl font-bold text-[#2c1810] mb-6 flex items-center gap-2">
            🌙 Paradas para Dormir en Ruta
          </h3>
          <p className="text-[#6b4c3b] mb-6 text-sm">
            Saliendo a las 18:30h, después de 4-5h de viaje te encontrarás en la zona de Valencia. Aquí tienes opciones ordenadas por distancia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OVERNIGHT_STOPS.map((stop) => (
              <div
                key={stop.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#f5e6c8] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-[#2c1810] text-sm">{stop.name}</h4>
                    <p className="text-xs text-[#9b7b6b]">{stop.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${stop.camperFriendly ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {stop.camperFriendly ? "✓ Camper" : "Verificar"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-[#fdf8f0] rounded-lg p-2">
                    <div className="text-[#9b7b6b]">Desde BCN</div>
                    <div className="font-bold text-[#2c1810]">{stop.distanceFromBcn} km</div>
                  </div>
                  <div className="bg-[#fdf8f0] rounded-lg p-2">
                    <div className="text-[#9b7b6b]">Tiempo</div>
                    <div className="font-bold text-[#2c1810]">{stop.timeFromBcn}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-green-700 mb-1">✓ Ventajas:</div>
                  <ul className="text-xs text-[#6b4c3b] space-y-0.5">
                    {stop.pros.map((p, i) => <li key={i}>· {p}</li>)}
                  </ul>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-amber-700 mb-1">⚠ Inconvenientes:</div>
                  <ul className="text-xs text-[#6b4c3b] space-y-0.5">
                    {stop.cons.map((c, i) => <li key={i}>· {c}</li>)}
                  </ul>
                </div>

                <div className="text-xs text-[#9b7b6b] italic mb-3 bg-[#fdf8f0] rounded-lg p-2">
                  🔒 {stop.safetyNote}
                </div>

                <a
                  href={stop.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#c0392b] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#a93226] transition-colors"
                >
                  📍 Ver en Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
