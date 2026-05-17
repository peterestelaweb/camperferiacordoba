"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #3d1a0a 30%, #6b2d1a 60%, #c0392b 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 bg-[#d4a017]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 bg-[#87ceeb]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 bg-white" />
      </div>

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Camper emoji with float animation */}
        <div className="text-7xl mb-6 animate-float inline-block">🚐</div>

        {/* Ruta */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <span className="text-[#f5e6c8] text-xl font-light tracking-widest uppercase">Barcelona</span>
          <span className="text-[#d4a017] text-2xl">→</span>
          <span className="text-[#f5e6c8] text-xl font-light tracking-widest uppercase">Córdoba</span>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          Camper Feria
          <br />
          <span style={{ color: "#d4a017" }}>Córdoba 2026</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl text-[#f5e6c8]/90 mb-2 max-w-2xl mx-auto">
          Road trip en camper para vivir la Feria de Nuestra Señora de la Salud
        </p>
        <p className="text-base text-[#d4a017] font-semibold mb-8">
          21 al 25 de mayo de 2026 · 1.046 km · Feria del 23 al 30 de mayo
        </p>

        {/* Stats rápidos */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { emoji: "📍", label: "~1.046 km", sub: "ida" },
            { emoji: "⛽", label: "~136 L", sub: "gasoil ida" },
            { emoji: "🌙", label: "4 noches", sub: "en Córdoba" },
            { emoji: "🎡", label: "Feria 23-30", sub: "mayo 2026" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-white font-bold text-sm">{stat.label}</div>
              <div className="text-[#f5e6c8]/70 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#ruta"
            className="bg-[#c0392b] hover:bg-[#a93226] text-white font-bold px-7 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            🗺️ Ver ruta
          </a>
          <a
            href="#feria"
            className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-7 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            🎡 Agenda Feria
          </a>
          <a
            href="#pdf"
            className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold px-7 py-3 rounded-full transition-all hover:scale-105"
          >
            ↓ Guía PDF
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs flex flex-col items-center gap-2 animate-bounce">
        <span>Scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
