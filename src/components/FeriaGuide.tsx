"use client";
import { useState } from "react";
import { DAILY_PLAN, FERIA_INFO, FERIA_TIPS, DRESS_CODE, DONDE_COMPRAR_FLAMENCA } from "@/data/feria";

const themeColors: Record<string, { bg: string; border: string; accent: string }> = {
  "road-trip":    { bg: "#fef9ee", border: "#d97706", accent: "#d97706" },
  inauguracion:   { bg: "#fef3ff", border: "#9333ea", accent: "#9333ea" },
  feria:          { bg: "#fff1f0", border: "#c0392b", accent: "#c0392b" },
  vuelta:         { bg: "#f0fdf4", border: "#16a34a", accent: "#16a34a" },
};

const priorityStyle: Record<string, string> = {
  imprescindible: "bg-red-100 text-red-700 font-semibold",
  interesante:    "bg-amber-100 text-amber-700",
  opcional:       "bg-slate-100 text-slate-600",
};

const typeEmoji: Record<string, string> = {
  ruta:       "🚗",
  descanso:   "🌙",
  logistica:  "📦",
  cultura:    "🕌",
  gastronomia:"🍽️",
  ocio:       "🎉",
  feria:      "🎡",
  tradicion:  "🐴",
  familia:    "👨‍👩‍👧",
};

type Activity = {
  time?: string;
  title: string;
  description: string;
  type: string;
  priority?: string;
  location?: string;
  price?: string;
  web?: string;
  duration?: string;
  googleMaps?: string;
  tips?: string;
  note?: string;
};

function ActivityCard({ act }: { act: Activity }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#f5e6c8]">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className="text-lg mt-0.5 shrink-0">{typeEmoji[act.type] || "📌"}</span>
          <div>
            <h4 className="font-bold text-[#2c1810] text-sm sm:text-base leading-snug">{act.title}</h4>
            {act.time && <span className="text-xs text-[#9b7b6b]">⏰ {act.time}</span>}
          </div>
        </div>
        {act.priority && (
          <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${priorityStyle[act.priority] || "bg-gray-100 text-gray-600"}`}>
            {act.priority}
          </span>
        )}
      </div>

      <p className="text-sm text-[#6b4c3b] mb-3 leading-relaxed">{act.description}</p>

      {act.note && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-amber-800">⚠️ {act.note}</p>
        </div>
      )}
      {act.tips && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-blue-800">💡 {act.tips}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1">
        {act.location && <span className="text-[#9b7b6b]">📍 {act.location}</span>}
        {act.price    && <span className="text-[#9b7b6b]">💶 {act.price}</span>}
        {act.duration && <span className="text-[#9b7b6b]">⏱️ {act.duration}</span>}
        {act.web && (
          <a href={act.web} target="_blank" rel="noopener noreferrer" className="text-[#c0392b] hover:underline">
            🌐 Web oficial
          </a>
        )}
        {act.googleMaps && (
          <a href={act.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            📍 Google Maps
          </a>
        )}
      </div>
    </div>
  );
}

type TabKey = "agenda" | "tips" | "dresscode" | "flamenca";

export default function FeriaGuide() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("agenda");
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
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-1 font-semibold">
            {FERIA_INFO.name}
          </p>
          <p className="text-[#9b7b6b] text-sm mb-4">
            {FERIA_INFO.dates} · {FERIA_INFO.location}
          </p>

          {/* Datos rápidos */}
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            {[
              { emoji: "💡", label: "Encendido", val: "Vie 22 mayo · 22:00h" },
              { emoji: "🎆", label: "Fuegos", val: "Sáb 23 · 00:00h" },
              { emoji: "🎟️", label: "Entrada", val: "Libre a todas las casetas" },
              { emoji: "🏮", label: "Bombillas", val: `${FERIA_INFO.bombillas.toLocaleString()}` },
              { emoji: "🏕️", label: "Casetas", val: `${FERIA_INFO.casetas} casetas` },
              { emoji: "🐴", label: "Caballos", val: "13:00-20:00h diario" },
            ].map((s) => (
              <div key={s.label} className="bg-[#fff1f0] border border-[#c0392b]/15 rounded-xl px-4 py-2 text-center">
                <div className="text-lg">{s.emoji}</div>
                <div className="text-[10px] text-[#9b7b6b] uppercase tracking-wide">{s.label}</div>
                <div className="text-xs font-bold text-[#2c1810]">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Links oficiales */}
          <div className="flex flex-wrap justify-center gap-2">
            <a href={FERIA_INFO.officialWeb} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-[#c0392b] text-white px-4 py-1.5 rounded-full hover:bg-[#a93226] transition-colors">
              🌐 Web Oficial Ayto. Córdoba
            </a>
            <a href={FERIA_INFO.pdfLecturaFacil} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-[#6b7c3c] text-white px-4 py-1.5 rounded-full hover:bg-[#5a6b2e] transition-colors">
              📕 PDF Guía Feria (oficial)
            </a>
            <a href={FERIA_INFO.pdfAccesibilidad} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-[#2c1810] text-white px-4 py-1.5 rounded-full">
              ♿ PDF Accesibilidad
            </a>
            <span className="text-xs bg-[#d4a017] text-white px-4 py-1.5 rounded-full">
              📱 WhatsApp IA Feria: {FERIA_INFO.whatsappIA}
            </span>
          </div>
        </div>

        {/* Pestañas principales */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {([
            { key: "agenda",    label: "📅 Agenda día a día" },
            { key: "tips",      label: "💡 Trucos de local" },
            { key: "dresscode", label: "👗 Qué ponerse" },
            { key: "flamenca",  label: "🛍️ Dónde comprar" },
          ] as { key: TabKey; label: string }[]).map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === t.key
                  ? "bg-[#c0392b] text-white shadow-md"
                  : "bg-[#fdf8f0] text-[#6b4c3b] border border-[#f5e6c8] hover:bg-[#f5e6c8]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB: AGENDA */}
        {activeTab === "agenda" && (
          <>
            {/* Day selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {DAILY_PLAN.map((day, i) => (
                <button key={i} onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeDay === i
                      ? "bg-[#c0392b] text-white shadow-md scale-105"
                      : "bg-white text-[#6b4c3b] border border-[#f5e6c8] hover:bg-[#fdf8f0]"
                  }`}>
                  {day.emoji} {day.date.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            {/* Day content */}
            <div className="rounded-3xl p-5 sm:p-8 border-2 transition-all"
              style={{ backgroundColor: theme.bg, borderColor: theme.accent + "30" }}>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#2c1810]">
                  {current.emoji} {current.day}
                </h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: theme.accent }}>{current.date}</p>
              </div>
              <div className="space-y-4">
                {current.activities.map((act, i) => (
                  <ActivityCard key={i} act={act} />
                ))}
              </div>
            </div>

            {/* Nota programa pendiente */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">⚠️ Programa de conciertos pendiente de publicación oficial</p>
              <p>
                El Ayuntamiento de Córdoba aún no ha publicado el programa completo de conciertos de la Caseta Municipal.
                Consulta en{" "}
                <a href={FERIA_INFO.officialWeb} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  cordoba.es
                </a>{" "}
                y en el WhatsApp IA de la Feria (<strong>{FERIA_INFO.whatsappIA}</strong>) para actualizaciones.
              </p>
            </div>
          </>
        )}

        {/* TAB: TIPS */}
        {activeTab === "tips" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FERIA_TIPS.map((tip) => (
              <div key={tip.emoji} className="bg-white rounded-2xl p-5 border border-[#f5e6c8] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{tip.emoji}</span>
                  <div>
                    <h4 className="font-bold text-[#2c1810] text-sm mb-1">{tip.tip}</h4>
                    <p className="text-xs text-[#6b4c3b] leading-relaxed">{tip.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: DRESS CODE */}
        {activeTab === "dresscode" && (
          <div className="space-y-4">
            <div className="bg-[#fff1f0] border border-[#c0392b]/20 rounded-2xl p-4 text-sm text-[#c0392b] font-medium">
              La Feria de Córdoba tiene su propio estilo. Diferente de Sevilla: líneas más limpias, sombrero cordobés de ala plana, y más apertura a vestimenta no flamenca.
            </div>
            {DRESS_CODE.map((dc) => (
              <div key={dc.moment} className="bg-white rounded-2xl p-5 border border-[#f5e6c8] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{dc.emoji}</span>
                  <div>
                    <h4 className="font-bold text-[#2c1810]">{dc.moment}</h4>
                    <p className="text-xs text-[#9b7b6b]">{dc.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-pink-700 mb-1">👩 Mujeres</p>
                    <p className="text-xs text-[#6b4c3b]">{dc.women}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">👨 Hombres</p>
                    <p className="text-xs text-[#6b4c3b]">{dc.men}</p>
                  </div>
                </div>
                {dc.note && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-800">💡 {dc.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: DONDE COMPRAR */}
        {activeTab === "flamenca" && (
          <div className="space-y-4">
            <p className="text-[#6b4c3b] text-sm mb-2">
              Si no llevas traje de flamenca, Córdoba tiene muy buenas opciones para comprar o alquilar. Estas son las recomendadas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DONDE_COMPRAR_FLAMENCA.map((tienda) => (
                <div key={tienda.name} className="bg-white rounded-2xl p-5 border border-[#f5e6c8] shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{tienda.emoji}</span>
                    <div>
                      <h4 className="font-bold text-[#2c1810] text-sm">{tienda.name}</h4>
                      <span className="text-xs bg-[#fdf8f0] text-[#9b7b6b] px-2 py-0.5 rounded-full">{tienda.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#9b7b6b] mb-1">📍 {tienda.address}</p>
                  <p className="text-xs text-[#6b4c3b]">{tienda.nota}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#fdf8f0] border border-[#f5e6c8] rounded-2xl p-4 mt-4">
              <p className="text-sm text-[#6b4c3b]">
                <strong>💡 Consejo:</strong> Si vas a alquilar, hazlo con 1-2 días de antelación. Durante la feria las tiendas se llenan y puede no quedar tallas. El precio de alquiler suele incluir accesorios (flor, pendientes, chal).
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
