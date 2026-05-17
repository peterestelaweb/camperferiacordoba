"use client";
import { useState } from "react";

export default function PDFExport() {
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handlePDF = async () => {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Portada
      doc.setFillColor(44, 24, 16);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setTextColor(245, 230, 200);
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text("Camper Feria", pageWidth / 2, 60, { align: "center" });
      doc.text("Córdoba 2026", pageWidth / 2, 78, { align: "center" });

      doc.setTextColor(212, 160, 23);
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("Road trip Barcelona → Córdoba", pageWidth / 2, 100, { align: "center" });
      doc.text("21 al 25 de mayo de 2026", pageWidth / 2, 112, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(245, 230, 200);
      doc.text("Feria de Nuestra Señora de la Salud", pageWidth / 2, 135, { align: "center" });
      doc.text("23 al 30 de mayo de 2026 · El Arenal, Córdoba", pageWidth / 2, 145, { align: "center" });

      // Línea decorativa
      doc.setDrawColor(212, 160, 23);
      doc.setLineWidth(0.5);
      doc.line(20, 160, pageWidth - 20, 160);

      doc.setFontSize(10);
      doc.setTextColor(155, 123, 107);
      doc.text(`Generado el ${new Date().toLocaleDateString("es-ES")}`, pageWidth / 2, 175, { align: "center" });
      doc.text("camperferiacordoba.peterestelaweb.com", pageWidth / 2, 185, { align: "center" });

      // Página 2 — Datos del viaje
      doc.addPage();
      doc.setFillColor(253, 248, 240);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setTextColor(44, 24, 16);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Resumen del Viaje", 20, 25);

      doc.setDrawColor(192, 57, 43);
      doc.setLineWidth(1);
      doc.line(20, 30, pageWidth - 20, 30);

      const tripData = [
        ["Origen", "Barcelona"],
        ["Destino", "Córdoba"],
        ["Salida", "Jueves 21 mayo 2026, 18:30h"],
        ["Regreso", "Lunes 25 mayo 2026, 11:00h"],
        ["Vehículo", "Camper / furgoneta camper"],
        ["Distancia ida", "~1.046 km"],
        ["Duración ida", "~9h 30min (sin paradas)"],
        ["Consumo", "13 L/100 km (gasoil)"],
        ["Litros ida", "~136 L"],
        ["Litros total", "~272 L"],
        ["Ruta principal", "A-7 → A-3 → A-31 → A-4"],
        ["Feria", "23-30 mayo 2026, El Arenal"],
      ];

      let y = 45;
      doc.setFontSize(10);
      tripData.forEach(([key, val], i) => {
        if (i % 2 === 0) {
          doc.setFillColor(245, 230, 200);
          doc.rect(20, y - 4, pageWidth - 40, 10, "F");
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(44, 24, 16);
        doc.text(key, 25, y + 2);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 76, 59);
        doc.text(val, 100, y + 2);
        y += 11;
      });

      // Página 3 — Agenda día a día
      doc.addPage();
      doc.setFillColor(253, 248, 240);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setTextColor(44, 24, 16);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Agenda del Viaje", 20, 25);

      doc.setDrawColor(192, 57, 43);
      doc.line(20, 30, pageWidth - 20, 30);

      const days = [
        { day: "Jue 21 mayo", activities: ["18:30h — Salida desde Barcelona", "Conducir ~4-5h, parada nocturna en ruta (zona Valencia)"] },
        { day: "Vie 22 mayo", activities: ["Mañana — Llegada a Córdoba", "11-14h — Visita Mezquita-Catedral", "Tarde — Judería, Puente Romano, Alcázar", "Noche — Ambiente previo a la Feria"] },
        { day: "Sáb 23 mayo", activities: ["~13h — Encendido oficial de la Feria", "Mediodía-Tarde — Paseo por el Real", "Tarde — Paseo de Caballos y Carruajes", "Noche — Fuegos artificiales"] },
        { day: "Dom 24 mayo", activities: ["Mediodía — Feria en plenitud", "Tarde — Ribera del Guadalquivir", "Noche — Feria, casetas y sevillanas"] },
        { day: "Lun 25 mayo", activities: ["11:00h — Salida hacia Barcelona", "Llegada estimada Barcelona ~21:00h"] },
      ];

      let dy = 45;
      doc.setFontSize(9);
      days.forEach(({ day, activities }) => {
        doc.setFillColor(192, 57, 43);
        doc.rect(20, dy, pageWidth - 40, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(day, 25, dy + 5.5);
        dy += 12;

        activities.forEach((act) => {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(107, 76, 59);
          doc.text(`• ${act}`, 28, dy);
          dy += 7;
        });
        dy += 4;

        if (dy > pageHeight - 30) {
          doc.addPage();
          doc.setFillColor(253, 248, 240);
          doc.rect(0, 0, pageWidth, pageHeight, "F");
          dy = 25;
        }
      });

      // Página 4 — Parkings y checklist
      doc.addPage();
      doc.setFillColor(253, 248, 240);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      doc.setTextColor(44, 24, 16);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Parkings Camper & Checklist", 20, 25);

      doc.setDrawColor(192, 57, 43);
      doc.line(20, 30, pageWidth - 20, 30);

      doc.setFontSize(12);
      doc.setTextColor(44, 24, 16);
      doc.text("Opciones de aparcamiento en Córdoba:", 20, 42);

      const parkings = [
        "Parking El Arenal (junto al recinto ferial) — Verificar disponibilidad",
        "Área Autocaravanas Av. Almogávares — Pendiente confirmar",
        "Camping Municipal (Av. Brillante) — ✓ Pernocta confirmada, reservar antes",
        "Parking Ribera del Guadalquivir — Solo aparcamiento diurno",
      ];

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      let py = 52;
      parkings.forEach((p) => {
        doc.setTextColor(107, 76, 59);
        doc.text(`• ${p}`, 25, py);
        py += 8;
      });

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(44, 24, 16);
      doc.text("Checklist esencial:", 20, py + 5);

      const checks = [
        "DNI, permiso conducir, seguro, ITV",
        "Depósito lleno, neumáticos revisados",
        "Agua fresca, gas, batería auxiliar",
        "Ropa fresca, protector solar SPF50+, gorra",
        "Efectivo, cargadores, powerbank",
        "Botiquín, medicación personal",
        "GPS con ruta descargada offline",
      ];

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      py += 15;
      checks.forEach((c) => {
        doc.setTextColor(107, 76, 59);
        doc.text(`☐  ${c}`, 25, py);
        py += 7;
      });

      // Enlace web al final
      doc.setFontSize(8);
      doc.setTextColor(155, 123, 107);
      doc.text("Guía completa con mapas y más información:", 20, pageHeight - 20);
      doc.setTextColor(192, 57, 43);
      doc.text("camperferiacordoba.peterestelaweb.com", 20, pageHeight - 13);

      doc.save("Guia-Camper-Feria-Cordoba-2026.pdf");
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Error generando el PDF. Intenta usar la opción de imprimir.");
    }
    setLoading(false);
  };

  return (
    <section id="pdf" className="py-20 bg-[#2c1810]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="text-6xl mb-6">📄</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Descarga la Guía Completa
        </h2>
        <p className="text-[#f5e6c8]/80 mb-8 max-w-xl mx-auto">
          PDF premium con toda la información del viaje: ruta, agenda día a día, guía de Córdoba,
          parkings camper, checklist y presupuesto. Lista para imprimir o consultar sin conexión.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePDF}
            disabled={loading}
            className="bg-[#d4a017] hover:bg-[#b8891a] disabled:opacity-60 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 text-lg shadow-xl"
          >
            {loading ? "⏳ Generando PDF..." : "↓ Descargar Guía PDF"}
          </button>
          <button
            onClick={handlePrint}
            className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold px-8 py-4 rounded-full transition-all hover:scale-105 text-lg"
          >
            🖨️ Imprimir página
          </button>
        </div>

        <p className="text-[#f5e6c8]/50 text-sm mt-6">
          El PDF se genera en tu navegador. No se envía ningún dato a servidores externos.
        </p>
      </div>
    </section>
  );
}
