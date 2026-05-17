"use client";
import { useState } from "react";
import { TRIP_DATA } from "@/data/route";

export default function TripSummary() {
  const [fuelPrice, setFuelPrice] = useState(TRIP_DATA.defaultFuelPrice);

  const distanceOneWay = TRIP_DATA.outbound.distance;
  const litersOneWay = (distanceOneWay * TRIP_DATA.fuelConsumption) / 100;
  const litersTotal = litersOneWay * 2;
  const costOneWay = litersOneWay * fuelPrice;
  const costTotal = litersTotal * fuelPrice;

  return (
    <section id="resumen" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🗓️ Resumen del Viaje
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Todo lo que necesitas saber del road trip de un vistazo
          </p>
        </div>

        {/* Cards de resumen */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[
            { emoji: "📅", label: "Salida", value: "Jue 21 mayo", sub: "18:30h" },
            { emoji: "🏁", label: "Regreso", value: "Lun 25 mayo", sub: "11:00h desde Córdoba" },
            { emoji: "🌙", label: "Noches", value: "4 noches", sub: "en Córdoba" },
            { emoji: "📍", label: "Distancia", value: `${distanceOneWay.toLocaleString()} km`, sub: "cada trayecto" },
            { emoji: "⏱️", label: "Duración", value: "~9h 30min", sub: "sin paradas" },
            { emoji: "🚐", label: "Vehículo", value: "Camper", sub: "furgoneta camper" },
            { emoji: "⛽", label: "Consumo", value: `${TRIP_DATA.fuelConsumption} L/100km`, sub: "gasoil" },
            { emoji: "🛣️", label: "Ruta", value: "A-7 → A-3 → A-4", sub: "por Valencia y Albacete" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#f5e6c8] hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-xs text-[#9b7b6b] uppercase tracking-wide mb-1">{item.label}</div>
              <div className="font-bold text-[#2c1810] text-sm sm:text-base">{item.value}</div>
              <div className="text-xs text-[#9b7b6b] mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Calculadora de combustible */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#f5e6c8]">
          <h3 className="text-2xl font-bold text-[#2c1810] mb-6 flex items-center gap-2">
            ⛽ Calculadora de Combustible
          </h3>

          {/* Precio editable */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <label className="text-[#6b4c3b] font-medium text-sm">
              Precio del gasoil:
            </label>
            <div className="flex items-center gap-2 bg-[#fdf8f0] rounded-xl border border-[#f5e6c8] px-4 py-2">
              <input
                type="number"
                min="0.5"
                max="3"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent font-bold text-[#c0392b] text-lg outline-none"
              />
              <span className="text-[#6b4c3b]">€/litro</span>
            </div>
            <span className="text-xs text-[#9b7b6b]">Modifica el precio según el día</span>
          </div>

          {/* Tabla de combustible */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "Ida (Barcelona → Córdoba)",
                km: distanceOneWay,
                liters: litersOneWay,
                cost: costOneWay,
                color: "#c0392b",
                emoji: "→",
              },
              {
                label: "Vuelta (Córdoba → Barcelona)",
                km: distanceOneWay,
                liters: litersOneWay,
                cost: costOneWay,
                color: "#6b7c3c",
                emoji: "←",
              },
              {
                label: "Total viaje completo",
                km: distanceOneWay * 2,
                liters: litersTotal,
                cost: costTotal,
                color: "#2c1810",
                emoji: "⇄",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: `${row.color}10`, border: `2px solid ${row.color}20` }}
              >
                <div className="text-2xl font-bold mb-2" style={{ color: row.color }}>
                  {row.emoji}
                </div>
                <div className="text-xs text-[#9b7b6b] mb-3 font-medium">{row.label}</div>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-[#9b7b6b]">Distancia: </span>
                    <span className="font-bold">{row.km.toLocaleString()} km</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#9b7b6b]">Litros: </span>
                    <span className="font-bold">{row.liters.toFixed(1)} L</span>
                  </div>
                  <div className="text-xl font-extrabold mt-2" style={{ color: row.color }}>
                    ~{row.cost.toFixed(0)}€
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9b7b6b] text-center">
            * Cálculo basado en {TRIP_DATA.fuelConsumption} L/100km. Puede variar según carga, velocidad y condiciones de la ruta.
          </p>
        </div>
      </div>
    </section>
  );
}
