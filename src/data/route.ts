export const TRIP_DATA = {
  origin: "Barcelona",
  destination: "Córdoba",
  departure: "Jueves 21 de mayo de 2026, 18:30h",
  returnDate: "Lunes 25 de mayo de 2026, 11:00h",
  fuelConsumption: 13, // L/100km
  defaultFuelPrice: 1.65, // €/L (gasoil)

  outbound: {
    distance: 1046, // km
    duration: "9h 30min aprox. (sin paradas)",
    durationWithStop: "~11h total con parada nocturna",
    mainRoad: "A-7 → A-3 → A-31 → A-4",
    legs: [
      { from: "Barcelona", to: "Tarragona", km: 98, road: "AP-7", time: "1h" },
      { from: "Tarragona", to: "Valencia", km: 260, road: "AP-7/A-7", time: "2h 30min" },
      { from: "Valencia", to: "Albacete", km: 188, road: "A-3", time: "1h 45min" },
      { from: "Albacete", to: "Bailén", km: 200, road: "A-31/A-4", time: "1h 50min" },
      { from: "Bailén", to: "Córdoba", km: 100, road: "A-4", time: "1h" },
    ],
  },

  return: {
    distance: 1046,
    duration: "9h 30min aprox.",
    mainRoad: "A-4 → A-31 → A-3 → A-7",
    legs: [
      { from: "Córdoba", to: "Bailén", km: 100, road: "A-4", time: "1h" },
      { from: "Bailén", to: "Albacete", km: 200, road: "A-31/A-4", time: "1h 50min" },
      { from: "Albacete", to: "Valencia", km: 188, road: "A-3", time: "1h 45min" },
      { from: "Valencia", to: "Tarragona", km: 260, road: "A-7", time: "2h 30min" },
      { from: "Tarragona", to: "Barcelona", km: 98, road: "AP-7", time: "1h" },
    ],
  },
};

export const OVERNIGHT_STOPS = [
  {
    id: 1,
    name: "Área de descanso de Sagunto",
    location: "Sagunto, Valencia",
    coords: [39.6809, -0.2718] as [number, number],
    distanceFromBcn: 340,
    timeFromBcn: "~3h 20min",
    pros: ["Bien señalizado", "Cercano a pueblo con servicios", "Salida cómoda a primera hora"],
    cons: ["Área de servicio estándar", "Puede haber ruido de tráfico"],
    googleMaps: "https://maps.google.com/maps?q=39.6809,-0.2718",
    note: "Opción temprana si se quiere parar antes de las 22h",
    camperFriendly: true,
    safetyNote: "Zona concurrida, razonablemente segura. Cerrar bien el vehículo.",
    alternative: "Área de Almenara (km 360)",
  },
  {
    id: 2,
    name: "Área camper de Gandia",
    location: "Gandia, Valencia",
    coords: [38.9967, -0.1831] as [number, number],
    distanceFromBcn: 420,
    timeFromBcn: "~4h 10min",
    pros: ["Ciudad con servicios completos", "Zona costera tranquila", "Buen punto intermedio"],
    cons: ["Hay que salir de la autopista ~5km", "Más concurrida en verano"],
    googleMaps: "https://maps.google.com/maps?q=38.9967,-0.1831",
    note: "Punto recomendado: salida Gandia, buscar aparcamiento en zona industrial sur",
    camperFriendly: true,
    safetyNote: "Zona habitual para campers. Pendiente de confirmar disponibilidad exacta.",
    alternative: "Área de Oliva (km 435)",
  },
  {
    id: 3,
    name: "Área de servicio de La Encina",
    location: "La Encina, Albacete",
    coords: [38.6789, -0.9789] as [number, number],
    distanceFromBcn: 590,
    timeFromBcn: "~5h 30min",
    pros: ["Punto intermedio ideal", "24h abierto", "Aparcamiento amplio para campers"],
    cons: ["Ambiente de gasolinera/autopista", "Sin servicios de vaciado"],
    googleMaps: "https://maps.google.com/maps?q=38.6789,-0.9789",
    note: "Opción tardía si se quiere avanzar más antes de dormir",
    camperFriendly: true,
    safetyNote: "Área concurrida. Iluminada. Segura para descanso.",
    alternative: "Área de Almansa (km 570)",
  },
];

// Coordenadas principales para el mapa
export const ROUTE_COORDS = {
  barcelona: [41.3851, 2.1734] as [number, number],
  tarragona: [41.1189, 1.2445] as [number, number],
  valencia: [39.4699, -0.3763] as [number, number],
  albacete: [38.9943, -1.8585] as [number, number],
  bailen: [38.0898, -3.7786] as [number, number],
  cordoba: [37.8882, -4.7794] as [number, number],
  elAreanal: [37.8840, -4.7862] as [number, number],
};

export const OUTBOUND_POLYLINE: [number, number][] = [
  [41.3851, 2.1734],   // Barcelona
  [41.1189, 1.2445],   // Tarragona
  [40.6572, 0.5215],   // Tortosa
  [39.4699, -0.3763],  // Valencia
  [39.1659, -0.6816],  // Xàtiva
  [38.9943, -1.8585],  // Albacete
  [38.5295, -2.7875],  // Villarrobledo
  [38.0898, -3.7786],  // Bailén
  [37.8882, -4.7794],  // Córdoba
];
