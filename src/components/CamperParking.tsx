"use client";
import { CAMPER_PARKINGS, TRANSPORT_INFO } from "@/data/parking";

const pernocta_style: Record<string, { label: string; color: string; bg: string }> = {
  "confirmado-camping": { label: "✅ Pernocta confirmada", color: "#059669", bg: "#d1fae5" },
  "pendiente-confirmar": { label: "⚠️ Pendiente confirmar", color: "#d97706", bg: "#fef3c7" },
  "no-pernocta": { label: "🚫 Solo aparcamiento", color: "#dc2626", bg: "#fee2e2" },
};

export default function CamperParking() {
  return (
    <section id="camper" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🅿️ Camper en Córdoba
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-4">
            Dónde aparcar y dormir con la camper durante la Feria de Córdoba
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 max-w-2xl mx-auto">
            <p className="text-sm text-amber-800">
              ⚠️ <strong>Importante:</strong> Los datos de pernocta están marcados con su nivel de verificación.
              Confirma siempre la disponibilidad antes del viaje, especialmente durante la Feria. No se afirma
              que se pueda pernoctar en ningún sitio sin verificación oficial.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CAMPER_PARKINGS.map((parking) => {
            const pStyle = pernocta_style[parking.pernocta] || pernocta_style["pendiente-confirmar"];

            return (
              <div
                key={parking.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#f5e6c8] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-[#2c1810] text-base mb-1">{parking.name}</h3>
                    <p className="text-xs text-[#9b7b6b]">{parking.location}</p>
                  </div>
                  <span
                    className="text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap"
                    style={{ color: pStyle.color, backgroundColor: pStyle.bg }}
                  >
                    {pStyle.label}
                  </span>
                </div>

                {/* Distance info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#fdf8f0] rounded-xl p-3 text-center">
                    <div className="text-xs text-[#9b7b6b] mb-1">Al Arenal</div>
                    <div className="font-bold text-sm text-[#2c1810]">{parking.distanceToAreanal}</div>
                  </div>
                  <div className="bg-[#fdf8f0] rounded-xl p-3 text-center">
                    <div className="text-xs text-[#9b7b6b] mb-1">Caminando</div>
                    <div className="font-bold text-sm text-[#2c1810]">{parking.timeWalking}</div>
                  </div>
                </div>

                {/* Pros y cons */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-1">✓ Ventajas</p>
                    <ul className="space-y-0.5">
                      {parking.pros.map((p, i) => (
                        <li key={i} className="text-xs text-[#6b4c3b]">· {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-700 mb-1">⚠ Inconvenientes</p>
                    <ul className="space-y-0.5">
                      {parking.cons.map((c, i) => (
                        <li key={i} className="text-xs text-[#6b4c3b]">· {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Transport */}
                <div className="bg-[#fdf8f0] rounded-lg px-3 py-2 mb-3 text-xs">
                  <span className="font-semibold text-[#6b4c3b]">🚌 Transporte: </span>
                  <span className="text-[#9b7b6b]">{parking.transport}</span>
                </div>

                {/* Note */}
                <div
                  className="rounded-lg px-3 py-2 mb-4 text-xs"
                  style={{ backgroundColor: pStyle.bg }}
                >
                  <span style={{ color: pStyle.color }}>{parking.note}</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={parking.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#c0392b] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#a93226] transition-colors"
                  >
                    📍 Ver en Maps
                  </a>
                  <div className="flex-1 text-center bg-[#fdf8f0] text-[#9b7b6b] text-xs py-2.5 rounded-xl">
                    Fuente: {parking.source.split(".")[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transporte público */}
        <div className="bg-[#6b7c3c]/10 rounded-2xl p-6 border border-[#6b7c3c]/20">
          <h3 className="font-bold text-xl text-[#2c1810] mb-4 flex items-center gap-2">
            🚌 Transporte Público en Córdoba
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚌</div>
              <h4 className="font-semibold text-sm mb-1">Aucorsa</h4>
              <p className="text-xs text-[#6b4c3b] mb-2">{TRANSPORT_INFO.aucorsa.note}</p>
              <a
                href={TRANSPORT_INFO.aucorsa.web}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#c0392b] hover:underline"
              >
                → {TRANSPORT_INFO.aucorsa.web}
              </a>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚕</div>
              <h4 className="font-semibold text-sm mb-1">Taxi / Apps</h4>
              <p className="text-xs text-[#6b4c3b] mb-2">{TRANSPORT_INFO.taxi.note}</p>
              <p className="text-xs text-[#9b7b6b]">Apps: {TRANSPORT_INFO.taxi.apps.join(", ")}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚶</div>
              <h4 className="font-semibold text-sm mb-1">A pie</h4>
              <p className="text-xs text-[#6b4c3b]">{TRANSPORT_INFO.walking.note}</p>
            </div>
          </div>
          <p className="text-xs text-[#9b7b6b] mt-4 text-center">
            ⚠️ {TRANSPORT_INFO.feriaShuttles}
          </p>
        </div>
      </div>
    </section>
  );
}
