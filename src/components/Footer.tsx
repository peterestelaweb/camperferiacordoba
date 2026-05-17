export default function Footer() {
  return (
    <footer className="bg-[#1a0a00] text-[#f5e6c8]/60 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl mb-2">🚐</div>
            <h3 className="font-bold text-[#f5e6c8] mb-2">Camper Feria Córdoba 2026</h3>
            <p className="text-sm">
              Guía de viaje en camper desde Barcelona para vivir la Feria de Nuestra Señora de la Salud.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5e6c8] mb-3">Fuentes y enlaces</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.cordoba.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017] transition-colors">
                  → Ayuntamiento de Córdoba
                </a>
              </li>
              <li>
                <a href="https://www.turismodecordoba.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017] transition-colors">
                  → Turismo de Córdoba
                </a>
              </li>
              <li>
                <a href="https://www.aucorsa.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017] transition-colors">
                  → Aucorsa (autobuses)
                </a>
              </li>
              <li>
                <a href="https://www.mezquita-catedraldecordoba.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017] transition-colors">
                  → Mezquita-Catedral
                </a>
              </li>
              <li>
                <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017] transition-colors">
                  → AEMET (meteorología)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5e6c8] mb-3">Secciones</h4>
            <ul className="space-y-1 text-sm">
              {[
                ["#resumen", "Resumen del viaje"],
                ["#ruta", "Ruta interactiva"],
                ["#feria", "Feria de Córdoba"],
                ["#cordoba", "Guía de Córdoba"],
                ["#camper", "Parking camper"],
                ["#checklist", "Checklist"],
                ["#pdf", "Descargar PDF"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-[#d4a017] transition-colors">
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-[#f5e6c8]/40">
          <p className="mb-1">
            Camper Feria Córdoba 2026 · Web personal no oficial · Mayo 2026
          </p>
          <p>
            ⚠️ Los datos de la Feria y parkings son orientativos. Consulta siempre fuentes oficiales antes del viaje.
          </p>
          <p className="mt-2">
            Hecho con ❤️ para el viaje · <a href="https://github.com/peterestelaweb/camperferiacordoba" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a017]">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
