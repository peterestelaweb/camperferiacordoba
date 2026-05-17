"use client";
import { CAMPER_PARKINGS, TRANSPORT_INFO, PARKING_TIPS } from "@/data/parking";

const pernocta_style: Record<string, { label: string; color: string; bg: string }> = {
  "confirmado-area":      { label: "✅ Pernocta confirmada", color: "#059669", bg: "#d1fae5" },
  "confirmado-camping":   { label: "✅ Pernocta confirmada", color: "#059669", bg: "#d1fae5" },
  "pendiente-confirmar":  { label: "⚠️ Confirmar antes", color: "#d97706", bg: "#fef3c7" },
  "no-pernocta":          { label: "🚫 Solo aparcamiento", color: "#dc2626", bg: "#fee2e2" },
};

const camperStyle: Record<string, { label: string; color: string }> = {
  si:        { label: "✅ Apto camper", color: "#059669" },
  consultar: { label: "📞 Consultar", color: "#d97706" },
  no:        { label: "🚫 No apto", color: "#dc2626" },
};

export default function CamperParking() {
  return (
    <section id="camper" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🅿️ Camper en Córdoba
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-4">
            Dónde aparcar y dormir con la camper durante la Feria · Datos verificados
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 max-w-2xl mx-auto text-left">
            <p className="text-sm text-amber-800 font-medium mb-1">⚠️ Importante antes de salir</p>
            <p className="text-sm text-amber-700">
              Llama siempre para confirmar disponibilidad durante la Feria. Los parkings se llenan.
              Los datos de pernocta están marcados con su nivel de verificación real.
            </p>
          </div>
        </div>

        {/* Parking cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {CAMPER_PARKINGS.map((p) => {
            const pStyle = pernocta_style[p.pernocta] || pernocta_style["pendiente-confirmar"];
            const cStyle = camperStyle[p.camperFriendly] || camperStyle["consultar"];

            return (
              <div key={p.id}
                className="bg-white rounded-2xl shadow-sm border border-[#f5e6c8] overflow-hidden hover:shadow-md transition-shadow flex flex-col">

                {/* Card header */}
                <div className="bg-[#fdf8f0] px-5 py-4 border-b border-[#f5e6c8]">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-bold text-[#2c1810] text-sm leading-snug">{p.name}</h3>
                      <p className="text-xs text-[#9b7b6b] mt-0.5">{p.location}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end shrink-0">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
                        style={{ color: pStyle.color, backgroundColor: pStyle.bg }}>
                        {pStyle.label}
                      </span>
                      <span className="text-xs font-medium" style={{ color: cStyle.color }}>
                        {cStyle.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col gap-4">

                  {/* Distancia */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#fdf8f0] rounded-xl p-3 text-center">
                      <div className="text-xs text-[#9b7b6b] mb-0.5">Al Arenal</div>
                      <div className="font-bold text-sm text-[#2c1810]">{p.distanceToAreanal}</div>
                    </div>
                    <div className="bg-[#fdf8f0] rounded-xl p-3 text-center">
                      <div className="text-xs text-[#9b7b6b] mb-0.5">Caminando</div>
                      <div className="font-bold text-sm text-[#2c1810]">{p.timeWalking}</div>
                    </div>
                  </div>

                  {/* Precios */}
                  {"prices" in p && p.prices.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-[#2c1810] mb-1.5">💶 Tarifas</p>
                      <div className="space-y-1">
                        {p.prices.map((pr, i) => (
                          <div key={i} className="flex justify-between text-xs gap-2">
                            <span className="text-[#6b4c3b]">{pr.vehicle}</span>
                            <span className="font-semibold text-[#2c1810] text-right">{pr.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pros y cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">✓ Ventajas</p>
                      <ul className="space-y-0.5">
                        {p.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-[#6b4c3b]">· {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-700 mb-1">⚠ Inconvenientes</p>
                      <ul className="space-y-0.5">
                        {p.cons.map((con, i) => (
                          <li key={i} className="text-xs text-[#6b4c3b]">· {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Nota */}
                  <div className="rounded-lg px-3 py-2 text-xs"
                    style={{ backgroundColor: pStyle.bg, color: pStyle.color }}>
                    {p.note}
                  </div>

                  {/* Official note */}
                  {p.officialNote && (
                    <div className="text-xs text-[#9b7b6b] italic">{p.officialNote}</div>
                  )}

                  {/* Source */}
                  <p className="text-xs text-[#c0c0c0]">Fuente: {p.source}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-2">
                    <a href={p.googleMaps} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#c0392b] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#a93226] transition-colors">
                      📍 Google Maps
                    </a>
                    {p.web && (
                      <a href={p.web} target="_blank" rel="noopener noreferrer"
                        className="flex-1 text-center bg-[#fdf8f0] border border-[#f5e6c8] text-[#6b4c3b] text-xs font-semibold py-2.5 rounded-xl hover:bg-[#f5e6c8] transition-colors">
                        🌐 Web
                      </a>
                    )}
                    {p.phone && (
                      <a href={`tel:${p.phone.replace(/\s/g, "")}`}
                        className="flex-1 text-center bg-[#6b7c3c] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#5a6b2e] transition-colors">
                        📞 Llamar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consejos */}
        <div className="bg-[#fdf8f0] rounded-2xl p-6 border border-[#f5e6c8] mb-10">
          <h3 className="font-bold text-lg text-[#2c1810] mb-4">💡 Consejos de aparcamiento camper</h3>
          <ul className="space-y-2">
            {PARKING_TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#6b4c3b]">
                <span className="text-[#c0392b] font-bold shrink-0 mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transporte */}
        <div className="bg-[#6b7c3c]/10 rounded-2xl p-6 border border-[#6b7c3c]/20">
          <h3 className="font-bold text-xl text-[#2c1810] mb-4 flex items-center gap-2">
            🚌 Transporte hasta El Arenal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚌</div>
              <h4 className="font-semibold text-sm mb-1">Aucorsa</h4>
              <p className="text-xs text-[#6b4c3b] mb-2">{TRANSPORT_INFO.aucorsa.lineas}</p>
              <a href={TRANSPORT_INFO.aucorsa.web} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[#c0392b] hover:underline">→ aucorsa.es</a>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚕</div>
              <h4 className="font-semibold text-sm mb-1">Taxi</h4>
              <p className="text-xs text-[#6b4c3b] mb-1">{TRANSPORT_INFO.taxi.note}</p>
              <p className="text-xs text-[#9b7b6b]">{TRANSPORT_INFO.taxi.apps.join(" · ")}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚶</div>
              <h4 className="font-semibold text-sm mb-1">A pie</h4>
              <p className="text-xs text-[#6b4c3b]">{TRANSPORT_INFO.walking.note}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-2xl mb-2">🚂</div>
              <h4 className="font-semibold text-sm mb-1">Tren neumático</h4>
              <p className="text-xs text-[#6b4c3b]">{TRANSPORT_INFO.tren.note}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
