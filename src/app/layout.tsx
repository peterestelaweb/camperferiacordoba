import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camper Feria Córdoba 2026 | Road Trip Barcelona → Córdoba",
  description:
    "Guía completa del viaje en camper desde Barcelona a la Feria de Nuestra Señora de la Salud de Córdoba 2026. Ruta, mapas, aparcamientos camper, guía turística y agenda de la feria.",
  keywords: [
    "Feria Córdoba 2026",
    "viaje camper Córdoba",
    "Barcelona Córdoba camper",
    "Feria Nuestra Señora de la Salud",
    "autocaravana Córdoba",
    "road trip Andalucía",
  ],
  openGraph: {
    title: "Camper Feria Córdoba 2026",
    description: "Road trip Barcelona → Córdoba para vivir la Feria de Nuestra Señora de la Salud 2026",
    type: "website",
    locale: "es_ES",
    siteName: "Camper Feria Córdoba 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camper Feria Córdoba 2026",
    description: "Guía de viaje en camper Barcelona → Córdoba para la Feria 2026",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fdf8f0] text-[#2c1810]">
        {children}
      </body>
    </html>
  );
}
