"use client";
import { useState } from "react";
import { DAILY_PLAN, FERIA_INFO } from "@/data/feria";

const themeColors: Record<string, { bg: string; border: string; badge: string }> = {
  "road-trip": { bg: "#fef3c7", border: "#d97706", badge: "#d97706" },
  cultura: { bg: "#ede9fe", border: "#7c3aed", badge: "#7c3aed" },
  feria: { bg: "#fee2e2", border: "#c0392b", badge: "#c0392b" },
  vuelta: { bg: "#d1fae5", border: "#059669", badge: "#059669" },
};

const priorityStyle: Record<string, string> = {
  imprescindible: "bg-red-100 text-red-700",
  interesante: "bg-amber-100 text-amber-700",
  opcional: "bg-blue-100 text-blue-700",
};

const typeEmoji: Record<string, string> = {
  ruta: "🚗",
  descanso: "🌙",
  logistica: "📦",
  cultura: "🕌",
  gastronomia: "🍽️",
  ocio: "🎉",
  feria: "🎡",
  tradicion: "🐴",
};

export default function FeriaGuide() {
  const [activeDay, setActiveDay] = useState(0);
  const current = DAILY_PLAN[activeDay];
  const theme = themeColors[current.theme] || themeColors["feria"];

  return (
    <section id="feria" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🎡 Feria de Córdoba 2026
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-2">
            {FERIA_INFO.name} · {FERIA_INFO.dates}
          </p>
          <p className="text-sm text-[#9b7b6b]">
            {FERIA_INFO.location}
          </p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <a
              href={FERIA_INFO.officialWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-[#c0392b] text-white px-4 py-1.5 rounded-full hover:bg-[#a93226] transition-colors"
            >
              🌐 Web Oficial Córdoba
            </a>
            <a
              href={FERIA_INFO.transport.aucorsa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-[#6b7c3c] text-white px-4 py-1.5 rounded-full hover:bg-[#5a6b2e] transition-colors"
            >
              🚌 Aucorsa (transporte)
            </a>
          </div>
        </div>

        {/* Info feria */}
        <div className="bg-[#fee2e2] rounded-2xl p-5 mb-8 border border-[#c0392b]/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-sm font-semibold text-[#c0392b] mb-1">Horario del Real de la Feria</p>
              <p className="text-sm text-[#6b4c3b]">
                Abre a mediodía (~12:00h) y cierra en la madrugada (~6:00h). Las luces se encienden a las {FERIA_INFO.horario.luces}.
                El programa exacto de actuaciones para 2026 se publicará en la web del Ayuntamiento de Córdoba.
              </p>
              <p className="text-xs text-[#9b7b6b] mt-2">
                ⚠️ Programa detallado 2026 pendiente de publicación oficial. Consultar en cordoba.es antes del viaje.
              </p>
            </div>
          </div>
        </div>

        {/* Day selector tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {DAILY_PLAN.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeDay === i
                  ? "bg-[#c0392b] text-white shadow-md scale-105"
                  : "bg-white text-[#6b4c3b] border border-[#f5e6c8] hover:bg-[#fdf8f0]"
              }`}
            >
              {day.emoji} {day.date.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Day content */}
        <div
          className="rounded-3xl p-6 sm:p-8 border-2 transition-all"
          style={{ backgroundColor: theme.bg, borderColor: theme.border + "40" }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-[#2c1810] mb-1">
              {current.emoji} {current.day}
            </h3>
            <p className="text-sm text-[#6b4c3b] font-medium">{current.date}</p>
          </div>

          <div className="space-y-4">
            {current.activities.map((act, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-sm border border-white/80"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{typeEmoji[act.type] || "📌"}</span>
                    <div>
                      <h4 className="font-bold text-[#2c1810] text-sm sm:text-base">{act.title}</h4>
                      {act.time && (
                        <span className="text-xs text-[#9b7b6b]">⏰ {act.time}</span>
                      )}
                    </div>
                  </div>
                  {act.priority && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${priorityStyle[act.priority] || "bg-gray-100 text-gray-600"}`}>
                      {act.priority}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#6b4c3b] mb-3">{act.description}</p>

                {"note" in act && act.note && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs text-amber-700">⚠️ {act.note as string}</p>
                  </div>
                )}

                {"tips" in act && act.tips && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs text-blue-700">💡 {act.tips as string}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 text-xs">
                  {"location" in act && act.location && (
                    <span className="text-[#9b7b6b]">📍 {act.location as string}</span>
                  )}
                  {"price" in act && act.price && (
                    <span className="text-[#9b7b6b]">💶 {act.price as string}</span>
                  )}
                  {"duration" in act && act.duration && (
                    <span className="text-[#9b7b6b]">⏱️ {act.duration as string}</span>
                  )}
                  {"web" in act && act.web && (
                    <a
                      href={act.web as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c0392b] hover:underline"
                    >
                      🌐 Web oficial
                    </a>
                  )}
                  {"googleMaps" in act && act.googleMaps && (
                    <a
                      href={act.googleMaps as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📍 Google Maps
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
