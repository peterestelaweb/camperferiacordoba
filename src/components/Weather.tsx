export default function Weather() {
  const forecasts = [
    { day: "Jue 21", icon: "🌤️", max: "?", min: "?", note: "Salida Barcelona" },
    { day: "Vie 22", icon: "☀️", max: "~28°C", min: "~15°C", note: "Llegada Córdoba" },
    { day: "Sáb 23", icon: "☀️", max: "~31°C", min: "~17°C", note: "Inicio Feria" },
    { day: "Dom 24", icon: "☀️", max: "~32°C", min: "~18°C", note: "Feria" },
    { day: "Lun 25", icon: "🌤️", max: "~29°C", min: "~16°C", note: "Regreso" },
  ];

  return (
    <section id="tiempo" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            ☀️ Tiempo en Córdoba
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Mayo en Córdoba es caluroso. Temperatura media: 25-32°C de día.
          </p>
        </div>

        {/* Forecast cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {forecasts.map((f) => (
            <div key={f.day} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#f5e6c8]">
              <div className="text-3xl mb-1">{f.icon}</div>
              <div className="font-bold text-sm text-[#2c1810]">{f.day}</div>
              <div className="text-xs text-[#c0392b] font-bold">{f.max}</div>
              <div className="text-xs text-[#9b7b6b]">{f.min}</div>
              <div className="text-xs text-[#6b4c3b] mt-1">{f.note}</div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-amber-800 text-center font-medium mb-2">
            ⚠️ Previsión orientativa basada en datos históricos de mayo en Córdoba.
            Consulta la previsión real en <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" className="underline">AEMET.es</a> antes de salir.
          </p>
        </div>

        {/* Consejos calor */}
        <div className="bg-white rounded-2xl p-6 border border-[#f5e6c8]">
          <h3 className="font-bold text-lg text-[#2c1810] mb-4 flex items-center gap-2">
            🌡️ Consejos para el calor
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: "💧", tip: "Bebe agua constantemente. Mínimo 2 litros al día bajo el sol cordobés." },
              { emoji: "🧴", tip: "Protector solar SPF 50+. Renueva cada 2h, especialmente en la feria." },
              { emoji: "🧢", tip: "Gorra o sombrero imprescindible durante las horas centrales del día (12-17h)." },
              { emoji: "👒", tip: "Ropa fresca y transpirable. El algodón o lino son perfectos." },
              { emoji: "🌙", tip: "Las noches de feria refrescan. Lleva algo ligero de abrigo para la madrugada." },
              { emoji: "🕐", tip: "Evita el sol intenso de 13 a 17h. Siesta, sombra o interior en ese horario." },
            ].map((c) => (
              <div key={c.tip} className="bg-[#fdf8f0] rounded-xl p-3 text-sm text-[#6b4c3b] flex items-start gap-2">
                <span className="text-xl shrink-0">{c.emoji}</span>
                <span>{c.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
