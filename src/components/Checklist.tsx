"use client";
import { useState } from "react";
import { CHECKLIST_ITEMS } from "@/data/checklist";

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = CHECKLIST_ITEMS.reduce((sum, cat) => sum + cat.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="checklist" className="py-20 bg-[#f5e6c8]/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            ✅ Checklist Camper
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto mb-6">
            No te olvides de nada antes de salir hacia la Feria de Córdoba
          </p>

          {/* Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-[#6b4c3b] mb-2">
              <span>{done} de {total} elementos</span>
              <span className="font-bold text-[#c0392b]">{pct}% listo</span>
            </div>
            <div className="h-3 bg-[#f5e6c8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c0392b] rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHECKLIST_ITEMS.map((category) => {
            const catDone = category.items.filter((item) => checked[item.id]).length;
            return (
              <div
                key={category.category}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#f5e6c8]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#2c1810] flex items-center gap-2">
                    <span>{category.emoji}</span>
                    <span className="text-sm">{category.category}</span>
                  </h3>
                  <span className="text-xs text-[#9b7b6b]">
                    {catDone}/{category.items.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                          checked[item.id]
                            ? "bg-[#c0392b] border-[#c0392b]"
                            : "border-[#d4b896] group-hover:border-[#c0392b]"
                        }`}
                        onClick={() => toggle(item.id)}
                      >
                        {checked[item.id] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm transition-all ${
                          checked[item.id] ? "line-through text-[#9b7b6b]" : "text-[#2c1810]"
                        }`}
                        onClick={() => toggle(item.id)}
                      >
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setChecked({})}
            className="text-sm text-[#9b7b6b] hover:text-[#c0392b] transition-colors underline"
          >
            Resetear checklist
          </button>
        </div>
      </div>
    </section>
  );
}
