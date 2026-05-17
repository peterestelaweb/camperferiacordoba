import { GASTRONOMY } from "@/data/places";

export default function Gastronomy() {
  return (
    <section id="gastronomia" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2c1810] mb-3">
            🍽️ Gastronomía Cordobesa
          </h2>
          <p className="text-[#6b4c3b] max-w-2xl mx-auto">
            Lo que no puedes irte de Córdoba sin probar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {GASTRONOMY.map((dish) => (
            <div
              key={dish.dish}
              className={`rounded-2xl p-5 border transition-all hover:shadow-md ${
                dish.mustTry
                  ? "bg-[#fee2e2] border-[#c0392b]/20"
                  : "bg-white border-[#f5e6c8]"
              }`}
            >
              <div className="text-4xl mb-3">{dish.emoji}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#2c1810] text-sm">{dish.dish}</h3>
                {dish.mustTry && (
                  <span className="text-xs bg-[#c0392b] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                    Imprescindible
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6b4c3b]">{dish.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#fdf8f0] rounded-2xl p-6 border border-[#f5e6c8]">
          <h3 className="font-bold text-lg text-[#2c1810] mb-3 flex items-center gap-2">
            💡 Consejos de tapeo en Córdoba
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#6b4c3b]">
            <li>· El salmorejo se toma frío — pide que sea casero y no de tetra brik</li>
            <li>· Los bares del Mercado de la Corredera son habituales para locales</li>
            <li>· El rebujito (manzanilla + Seven-Up) es LA bebida de la feria</li>
            <li>· Las casetas de la feria tienen comida — pronto es menos concurrido</li>
            <li>· El aceite de oliva virgen extra es protagonista en toda la cocina</li>
            <li>· Evita los bares más turísticos junto a la Mezquita para mejor calidad/precio</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
