"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#resumen", label: "Resumen" },
  { href: "#ruta", label: "Ruta" },
  { href: "#feria", label: "Feria" },
  { href: "#cordoba", label: "Córdoba" },
  { href: "#camper", label: "Camper" },
  { href: "#checklist", label: "Checklist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2 font-bold text-lg text-[#c0392b]">
          <span className="text-2xl">🚐</span>
          <span className="hidden sm:inline">Camper Feria Córdoba</span>
          <span className="sm:hidden">CFC 2026</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#2c1810] hover:text-[#c0392b] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pdf"
            className="ml-2 bg-[#c0392b] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#a93226] transition-colors"
          >
            ↓ PDF
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#2c1810] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <div className="w-6 h-0.5 bg-current mb-1" />
          <div className="w-6 h-0.5 bg-current mb-1" />
          <div className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#f5e6c8] px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-[#2c1810] hover:text-[#c0392b]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pdf"
            className="bg-[#c0392b] text-white text-sm font-semibold px-4 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            ↓ Descargar PDF
          </a>
        </div>
      )}
    </nav>
  );
}
