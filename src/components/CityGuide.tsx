"use client";
import { useState } from "react";
import { CORDOBA_PLACES } from "@/data/places";
import Image from "next/image";

const categoryLabels: Record<string, string> = {
  patrimonio: "🏛️ Patrimonio",
  barrio: "🏘️ Barrios",
  fotografia: "📸 Fotogénico",
  plaza: "⛲ Plazas",
  mirador: "🔭 Mirador",
  naturaleza: "🌿 Naturaleza",
};

export default function CityGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  return (
    <section id="cordoba" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🕌 Guía de Córdoba
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Los imprescindibles de Córdoba para aprovechar cada momento del viaje
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CORDOBA_PLACES.map((place) => (
            <div
              key={place.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all cursor-pointer hover:shadow-lg ${
                selected === place.id ? "ring-2 ring-[#c0392b] border-[#c0392b]/20" : "border-[#f5e6c8]"
              }`}
              onClick={() => setSelected(selected === place.id ? null : place.id)}
            >
              {/* Image */}
              <div className="relative h-44 bg-[#f5e6c8]">
                {!imgError[place.id] ? (
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                    onError={() => setImgError((prev) => ({ ...prev, [place.id]: true }))}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🏛️
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-xs bg-white/90 text-[#6b4c3b] px-2 py-1 rounded-full font-medium">
                    {categoryLabels[place.category] || place.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#2c1810] text-sm mb-1">{place.name}</h3>
                <p className="text-xs text-[#9b7b6b] mb-2">
                  📍 {place.distanceToAreanal} del Arenal
                </p>
                <p className="text-xs text-[#6b4c3b] line-clamp-2">{place.why}</p>

                {/* Expanded content */}
                {selected === place.id && (
                  <div className="mt-4 pt-4 border-t border-[#f5e6c8] space-y-3">
                    <p className="text-xs text-[#6b4c3b]">{place.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#fdf8f0] rounded-lg p-2">
                        <div className="text-[#9b7b6b] mb-0.5">Duración</div>
                        <div className="font-semibold">{place.duration}</div>
                      </div>
                      <div className="bg-[#fdf8f0] rounded-lg p-2">
                        <div className="text-[#9b7b6b] mb-0.5">Precio</div>
                        <div className="font-semibold">{place.price}</div>
                      </div>
                    </div>

                    {place.horario && (
                      <div className="text-xs bg-[#fdf8f0] rounded-lg p-2">
                        <span className="text-[#9b7b6b]">⏰ Horario: </span>
                        <span>{place.horario}</span>
                      </div>
                    )}

                    <div className="text-xs bg-amber-50 border border-amber-100 rounded-lg p-2">
                      <span className="text-amber-700">🚐 Camper: </span>
                      <span className="text-[#6b4c3b]">{place.camperNote}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={place.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center bg-[#c0392b] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#a93226] transition-colors"
                      >
                        📍 Google Maps
                      </a>
                      {place.web && (
                        <a
                          href={place.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-center bg-[#6b7c3c] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#5a6b2e] transition-colors"
                        >
                          🌐 Web
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
