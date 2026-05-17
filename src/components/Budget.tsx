"use client";
import { useState } from "react";
import { TRIP_DATA } from "@/data/route";

export default function Budget() {
  const [fuelPrice, setFuelPrice] = useState(1.65);
  const [parkingCost, setParkingCost] = useState(0);
  const [foodCost, setFoodCost] = useState(150);
  const [tourismCost, setTourismCost] = useState(50);
  const [extras, setExtras] = useState(80);

  const distance = TRIP_DATA.outbound.distance;
  const litersTotal = (distance * 2 * TRIP_DATA.fuelConsumption) / 100;
  const fuelCost = litersTotal * fuelPrice;
  const total = fuelCost + parkingCost + foodCost + tourismCost + extras;

  const items = [
    {
      label: "⛽ Gasoil (ida + vuelta)",
      value: fuelCost,
      sub: `${litersTotal.toFixed(1)} L × ${fuelPrice}€`,
      editable: false,
      color: "#c0392b",
    },
    {
      label: "🅿️ Parking / área camper",
      value: parkingCost,
      setter: setParkingCost,
      sub: "Incluye 4 noches",
      editable: true,
      color: "#6b7c3c",
    },
    {
      label: "🍽️ Comidas y bebidas",
      value: foodCost,
      setter: setFoodCost,
      sub: "Estimado 4 días en Córdoba",
      editable: true,
      color: "#d4a017",
    },
    {
      label: "🏛️ Entradas y turismo",
      value: tourismCost,
      setter: setTourismCost,
      sub: "Mezquita, Alcázar, museos",
      editable: true,
      color: "#7c3aed",
    },
    {
      label: "💼 Imprevistos / extras",
      value: extras,
      setter: setExtras,
      sub: "Recomendado ~10% del total",
      editable: true,
      color: "#0ea5e9",
    },
  ];

  return (
    <section id="presupuesto" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            💶 Presupuesto Estimado
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Calculadora editable para estimar el coste total del viaje
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[#f5e6c8] overflow-hidden">
          {/* Fuel price editor */}
          <div className="bg-[#fdf8f0] px-6 py-4 border-b border-[#f5e6c8] flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm font-medium text-[#6b4c3b]">Precio gasoil:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.5"
                max="3"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                className="w-20 bg-white border border-[#f5e6c8] rounded-lg px-3 py-1.5 text-sm font-bold text-[#c0392b] text-center outline-none"
              />
              <span className="text-sm text-[#6b4c3b]">€/litro</span>
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#f5e6c8]">
            {items.map((item) => (
              <div key={item.label} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="font-medium text-sm text-[#2c1810]">{item.label}</div>
                  <div className="text-xs text-[#9b7b6b]">{item.sub}</div>
                </div>
                <div className="flex items-center gap-3">
                  {item.editable && item.setter ? (
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={item.value}
                      onChange={(e) => item.setter!(parseFloat(e.target.value) || 0)}
                      className="w-24 bg-[#fdf8f0] border border-[#f5e6c8] rounded-lg px-3 py-1.5 text-sm font-bold text-center outline-none"
                    />
                  ) : (
                    <span className="w-24 text-right font-bold text-sm" style={{ color: item.color }}>
                      {item.value.toFixed(0)}€
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-[#2c1810] px-6 py-5 flex items-center justify-between">
            <div>
              <div className="text-[#f5e6c8] text-sm">Total estimado del viaje</div>
              <div className="text-[#d4a017] text-xs mt-0.5">* Estimación orientativa</div>
            </div>
            <div className="text-3xl font-extrabold text-white">
              {total.toFixed(0)}€
            </div>
          </div>
        </div>

        <p className="text-xs text-[#9b7b6b] text-center mt-4">
          Cálculo de combustible basado en {TRIP_DATA.fuelConsumption} L/100km y {distance} km por trayecto.
          Los costes de comida, parking y ocio son totalmente editables.
        </p>
      </div>
    </section>
  );
}
