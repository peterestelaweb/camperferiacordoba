"use client";
import { useState, useEffect } from "react";
import { CORDOBA_PLACES } from "@/data/places";
import Image from "next/image";
import dynamic from "next/dynamic";

const categoryLabels: Record<string, string> = {
  patrimonio: "🏛️ Patrimonio",
  barrio: "🏘️ Barrios",
  fotografia: "📸 Fotogénico",
  plaza: "⛲ Plazas",
  mirador: "🔭 Mirador",
  naturaleza: "🌿 Naturaleza",
};

// Carga dinámica del mapa interactivo de Córdoba sin SSR para evitar fallos de Leaflet en Next.js
const CordobaMapComponent = dynamic(() => import("./CordobaMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-[#e8f4fd] rounded-2xl flex items-center justify-center">
      <div className="text-center text-[#6b4c3b]">
        <div className="text-4xl mb-3 animate-pulse">🗺️</div>
        <p className="font-semibold text-sm">Cargando mapa turístico de Córdoba...</p>
      </div>
    </div>
  ),
});

export default function CityGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  
  // Estados para el reproductor de audioguía
  const [activeSpeechId, setActiveSpeechId] = useState<number | null>(null);
  const [speechState, setSpeechState] = useState<"idle" | "playing" | "paused">("idle");
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Detener la voz si el componente se desmonta o cambia el monumento seleccionado
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Función para manejar la reproducción de la audioguía
  const handlePlaySpeech = (placeId: number, text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Tu navegador no soporta la síntesis de voz.");
      return;
    }

    // Caso 1: Clic en el monumento que ya está sonando
    if (activeSpeechId === placeId) {
      if (speechState === "playing") {
        window.speechSynthesis.pause();
        setSpeechState("paused");
      } else if (speechState === "paused") {
        window.speechSynthesis.resume();
        setSpeechState("playing");
      }
      return;
    }

    // Caso 2: Estaba sonando otro monumento, detenemos el anterior
    window.speechSynthesis.cancel();

    // Configurar la nueva locución
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.95; // Velocidad un poco pausada para mejor comprensión

    // Intentar buscar una voz en español más natural si está disponible
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (voice) => voice.lang.startsWith("es-ES") || voice.lang.startsWith("es")
    );
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    // Eventos
    utterance.onend = () => {
      setActiveSpeechId(null);
      setSpeechState("idle");
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setActiveSpeechId(null);
      setSpeechState("idle");
      setCurrentUtterance(null);
    };

    setActiveSpeechId(placeId);
    setSpeechState("playing");
    setCurrentUtterance(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      setSpeechState("idle");
      setCurrentUtterance(null);
    }
  };

  return (
    <section id="cordoba" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🕌 Guía y Ruta Turística de Córdoba
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-6">
            Descubre los tesoros de la ciudad del califato. Hemos diseñado una ruta a pie optimizada para ti y te ofrecemos audioguías integradas para cada monumento.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
            🎧 Audioguías Virtuales Disponibles · Haz clic en cualquier monumento
          </div>
        </div>

        {/* MAPA DE LA RUTA TURÍSTICA EN CÓRDOBA */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#f5e6c8] p-3">
            <div className="p-3 bg-amber-50/50 rounded-2xl mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-[#2c1810] text-sm flex items-center gap-2">
                  🗺️ Mapa de la Ruta Turística A Pie
                </h3>
                <p className="text-xs text-[#6b4c3b]">
                  Circuito recomendado: Alcázar → Judería → Mezquita → Calleja de las Flores → Plaza Corredera → Ribera → Puente Romano → Calahorra.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs text-[#8e44ad] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8e44ad] animate-ping" />
                Ruta sugerida (8 km aprox.)
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: "400px" }}>
              <CordobaMapComponent />
            </div>
          </div>
        </div>

        {/* CUADRÍCULA DE MONUMENTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CORDOBA_PLACES.map((place) => (
            <div
              key={place.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all cursor-pointer hover:shadow-lg ${
                selected === place.id ? "ring-2 ring-[#c0392b] border-[#c0392b]/20" : "border-[#f5e6c8]"
              }`}
              onClick={() => {
                setSelected(selected === place.id ? null : place.id);
                // Si cambiamos de tarjeta, paramos el audio de la anterior por comodidad
                if (selected !== place.id) {
                  handleStopSpeech();
                }
              }}
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
                  <span className="text-xs bg-white/90 text-[#6b4c3b] px-2 py-1 rounded-full font-medium shadow-sm">
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
                  <div className="mt-4 pt-4 border-t border-[#f5e6c8] space-y-4">
                    <p className="text-xs text-[#6b4c3b] leading-relaxed">{place.description}</p>

                    {/* REPRODUCTOR DE AUDIOGUÍA PREMIUM */}
                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                          🎧 Audioguía Turística
                        </span>
                        {activeSpeechId === place.id && speechState === "playing" && (
                          <div className="flex gap-0.5 items-end h-3">
                            <span className="w-0.5 bg-amber-700 animate-[pulse_0.8s_infinite] h-2" />
                            <span className="w-0.5 bg-amber-700 animate-[pulse_0.6s_infinite] h-3" />
                            <span className="w-0.5 bg-amber-700 animate-[pulse_0.9s_infinite] h-1.5" />
                            <span className="w-0.5 bg-amber-700 animate-[pulse_0.7s_infinite] h-3.5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySpeech(place.id, place.history);
                          }}
                          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg transition-colors ${
                            activeSpeechId === place.id && speechState === "playing"
                              ? "bg-amber-600 hover:bg-amber-700 text-white"
                              : "bg-amber-100 hover:bg-amber-200 text-amber-900"
                          }`}
                        >
                          {activeSpeechId === place.id && speechState === "playing" ? (
                            <>⏸️ Pausar</>
                          ) : activeSpeechId === place.id && speechState === "paused" ? (
                            <>▶️ Reanudar</>
                          ) : (
                            <>🔊 Escuchar Historia</>
                          )}
                        </button>
                        
                        {(activeSpeechId === place.id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStopSpeech();
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 p-2 rounded-lg transition-colors"
                            title="Detener audioguía"
                          >
                            ⏹️
                          </button>
                        )}
                      </div>
                      
                      {activeSpeechId === place.id && (
                        <p className="text-[10px] text-amber-700/80 italic text-center animate-pulse">
                          {speechState === "playing" ? "Reproduciendo narración..." : "Narración en pausa"}
                        </p>
                      )}
                    </div>

                    {/* SECCIÓN DE HISTORIA EXPANDIDA */}
                    <div className="space-y-1 bg-[#fdf8f0] rounded-xl p-3 border border-[#f5e6c8]/50">
                      <h4 className="text-xs font-bold text-[#c0392b]">📚 Historia y curiosidades:</h4>
                      <p className="text-[11px] text-[#6b4c3b] leading-relaxed italic">
                        {place.history}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#fdf8f0] rounded-lg p-2">
                        <div className="text-[#9b7b6b] mb-0.5">Duración</div>
                        <div className="font-semibold text-[#2c1810]">{place.duration}</div>
                      </div>
                      <div className="bg-[#fdf8f0] rounded-lg p-2">
                        <div className="text-[#9b7b6b] mb-0.5">Precio</div>
                        <div className="font-semibold text-[#2c1810]">{place.price}</div>
                      </div>
                    </div>

                    {place.horario && (
                      <div className="text-xs bg-[#fdf8f0] rounded-lg p-2">
                        <span className="text-[#9b7b6b]">⏰ Horario: </span>
                        <span className="text-[#2c1810]">{place.horario}</span>
                      </div>
                    )}

                    <div className="text-xs bg-amber-50 border border-amber-100 rounded-lg p-2">
                      <span className="text-amber-700 font-semibold">🚐 Camper: </span>
                      <span className="text-[#6b4c3b]">{place.camperNote}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={place.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center bg-[#c0392b] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#a93226] transition-colors shadow-sm"
                      >
                        📍 Google Maps
                      </a>
                      {place.web && (
                        <a
                          href={place.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-center bg-[#6b7c3c] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#5a6b2e] transition-colors shadow-sm"
                        >
                          🌐 Web Oficial
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
