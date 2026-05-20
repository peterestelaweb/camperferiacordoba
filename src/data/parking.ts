// Datos de aparcamiento verificados — mayo 2026
// Fuentes: aparcamientoferiadecordoba.com, campercontact.com, park4night.com, autocaravaningmarquez.com
//
// Distancias a pie calculadas desde El Arenal (37.8840, -4.7862)
// usando Haversine + factor de ruta urbana ×1.3
// Velocidad media a pie: 80 m/min (4.8 km/h)

export const ARENAL_COORDS = { lat: 37.884, lng: -4.7862 };

export const CAMPER_PARKINGS = [
  {
    id: 1,
    name: "Aparcamiento Feria de Córdoba",
    nameShort: "Grupo Barea",
    badge: "⭐ El más cercano",
    location: "Junto a la Caseta Municipal, El Arenal",
    address: "Recinto Ferial El Arenal, Córdoba",
    coords: [37.8842, -4.7855] as [number, number],

    // Distancia calculada:
    // Línea recta: ~65m | Ruta a pie real: ~100m
    distanceMeters: 100,
    walkingMinutes: 2,
    walkingDescription: "2 minutos a pie",
    distanceBar: 2, // % relativo para la barra visual (1-100)

    googleMaps: "https://maps.google.com/maps?q=37.8842,-4.7855",
    googleMapsDir: "https://www.google.com/maps/dir/37.884,-4.7862/37.8842,-4.7855",
    web: "https://aparcamientoferiadecordoba.com",
    phone: "659 32 65 65",
    email: "aparcamiento@grupobarea.es",

    type: "aparcamiento-privado-feria",
    isOfficial: false,
    officialNote: "Gestión privada — Eventos y Nuevas Inversiones S.L. (Grupo Barea). No es del Ayuntamiento.",
    pernocta: "pendiente-confirmar",
    camperFriendly: "consultar",

    prices: [
      { vehicle: "Turismo", price: "10 €", note: "por entrada" },
      { vehicle: "Furgoneta / Van / Minibús", price: "20 €", note: "por entrada — podría aplicar a campers" },
      { vehicle: "Moto", price: "3,50 €", note: "por entrada" },
      { vehicle: "Bicicleta", price: "Gratis", note: "" },
      { vehicle: "Abono semanal", price: "65 €", note: "solo turismos — entrada/salida ilimitada" },
    ],

    pros: [
      "El más cercano al real — 100 m de la Caseta Municipal",
      "Gestión profesional durante toda la Feria",
      "Furgoneta/van categorizada: 20€ entrada",
      "Abono semanal disponible (65€, para turismos)",
    ],
    cons: [
      "Tarifa por entrada — pagar de nuevo si sales y vuelves",
      "Pernocta no confirmada — llamar antes para saber",
      "Sin información sobre agua ni vaciado",
      "No es página oficial del Ayuntamiento",
      "Abono semanal solo para turismos, no furgonetas",
    ],

    transport: "A 2 minutos a pie del Real de la Feria",
    safety: "Zona de máxima afluencia durante la Feria. Gestión privada.",
    source: "aparcamientoferiadecordoba.com — tarifas verificadas mayo 2026",
    note: "💡 Llama al 659 32 65 65 para confirmar si admiten camper/furgoneta mediana, si hay pernocta y qué tarifa aplica exactamente.",
    verified: true,
  },
  {
    id: 2,
    name: "Área de Autocaravanas de Córdoba",
    nameShort: "Av. del Corregidor",
    badge: "✅ Mejor para camper",
    location: "Av. del Corregidor, 1 — 14004 Córdoba",
    address: "Av. del Corregidor, 1, 14004 Córdoba",
    coords: [37.8746, -4.7867] as [number, number],

    // Línea recta ~1.045 km | Ruta urbana estimada ~1.25 km
    // A 80 m/min → ~16 min
    distanceMeters: 1250,
    walkingMinutes: 16,
    walkingDescription: "16 minutos a pie",
    distanceBar: 16,

    googleMaps: "https://maps.google.com/maps?q=37.8746,-4.7867",
    googleMapsDir: "https://www.google.com/maps/dir/37.884,-4.7862/37.8746,-4.7867",
    web: "https://park4night.com/en/place/20604",
    phone: null,
    email: null,

    type: "area-autocaravanas",
    isOfficial: true,
    officialNote: "Área municipal de autocaravanas. Sistema de barrera automática con ticket.",
    pernocta: "confirmado-area",
    camperFriendly: "si",

    prices: [
      { vehicle: "Autocaravana / Camper", price: "Máx. 25 €/24h", note: "cobro por minutos (10 min gratis)" },
      { vehicle: "Agua potable", price: "2 €", note: "por 100 litros" },
      { vehicle: "Electricidad", price: "2 €", note: "por hora" },
      { vehicle: "Vaciado aguas grises/negras", price: "Incluido", note: "en el área" },
    ],

    pros: [
      "✅ Pernocta confirmada — abierto todo el año",
      "Servicios completos: agua, vaciado grises y negras, electricidad",
      "50 plazas — diseñado para autocaravanas",
      "Barrera con ticket — más controlado y seguro",
      "16 minutos andando hasta el real de la feria",
    ],
    cons: [
      "Precio elevado (25€/día) sin servicios incluidos — se cobran aparte",
      "Terreno con pendiente pronunciada — criticado por usuarios",
      "Parcelas estrechas según reseñas",
      "Puede llenarse durante la Feria — llegar pronto",
    ],

    transport: "16 min a pie hasta El Arenal / Bus Aucorsa",
    safety: "Sistema de barrera. Zona urbana. Bien iluminada.",
    source: "Park4Night ID 20604 — 947 valoraciones · nota media 3.23/5",
    note: "✅ La opción más verificada y con servicios completos para camper. Llega pronto durante la Feria (antes de las 10h) para asegurar plaza.",
    verified: true,
  },
  {
    id: 3,
    name: "Parking del Arenal",
    nameShort: "Junto al Estadio El Arcángel",
    badge: "🆓 Posiblemente gratuito",
    location: "C/ de la Guitarra — Zona Estadio El Arcángel",
    address: "Calle de la Guitarra, 14010 Córdoba",
    coords: [37.8747, -4.7667] as [number, number],

    // Línea recta ~2.0 km | Ruta urbana estimada ~2.5 km
    // A 80 m/min → ~31 min
    distanceMeters: 2500,
    walkingMinutes: 31,
    walkingDescription: "31 minutos a pie",
    distanceBar: 31,

    googleMaps: "https://maps.google.com/maps?q=37.8747,-4.7667",
    googleMapsDir: "https://www.google.com/maps/dir/37.884,-4.7862/37.8747,-4.7667",
    web: "https://www.campercontact.com/es/espana/andalucia/cordoba/54568/parking-del-arenal",
    phone: null,
    email: null,

    type: "aparcamiento-gratuito",
    isOfficial: false,
    officialNote: "Zona de aparcamiento público no oficial. Referenciado por la comunidad camper en CamperContact.",
    pernocta: "pendiente-confirmar",
    camperFriendly: "consultar",

    prices: [
      { vehicle: "Todos los vehículos", price: "Aparentemente gratis", note: "" },
      { vehicle: "⚠️ Aviso", price: "No pagues", note: "Hay personas no autorizadas pidiendo 5€ — no son oficiales" },
    ],

    pros: [
      "Aparentemente gratuito",
      "Zona extensa, asfaltada y llana — cómoda para camper",
      "Centro comercial y gasolinera cercanos",
    ],
    cons: [
      "31 min a pie hasta El Arenal — necesitas transporte o ir en taxi",
      "Pernocta no confirmada oficialmente",
      "Zona ruidosa por tráfico nocturno según usuarios",
      "Actualmente con obras — acceso puede estar limitado",
      "Personas no autorizadas pidiendo dinero al aparcar",
      "Valoración baja: 2.61/5 en CamperContact (71 reseñas)",
    ],

    transport: "Bus Aucorsa al centro / Taxi ~10 min / 31 min a pie",
    safety: "Zona iluminada pero con incidencias reportadas. Cierra bien el vehículo.",
    source: "CamperContact ID 54568 — 71 valoraciones · nota media 2.61/5",
    note: "⚠️ Consulta en Park4Night o CamperContact justo antes del viaje para ver el estado actual de las obras y si la pernocta sigue siendo viable.",
    verified: false,
  },
  {
    id: 4,
    name: "Autocaravaning Márquez",
    nameShort: "Carretera N-IV",
    badge: "🔒 Más seguro",
    location: "Carretera Nacional IV Madrid-Cádiz, km 6",
    address: "N-IV, a 6 km del centro de Córdoba",
    coords: [37.8500, -4.7600] as [number, number],

    // Línea recta ~5.2 km | Ruta urbana ~6 km
    // No recomendable a pie
    distanceMeters: 6000,
    walkingMinutes: 75,
    walkingDescription: "~75 min a pie (no recomendable)",
    distanceBar: 75,

    googleMaps: "https://maps.google.com/maps?q=37.850,-4.760",
    googleMapsDir: "https://www.google.com/maps/dir/37.884,-4.7862/37.850,-4.760",
    web: "https://autocaravaningmarquez.com/parking",
    phone: "+34 744 611 949",
    email: "info@autocaravaningmarquez.com",

    type: "camping-autocaravanas",
    isOfficial: false,
    officialNote: "Empresa privada especializada en autocaravanas.",
    pernocta: "confirmado-camping",
    camperFriendly: "si",

    prices: [
      { vehicle: "Autocaravana / Camper", price: "Consultar", note: "tarifas competitivas — llamar para confirmar" },
      { vehicle: "Electricidad", price: "Disponible", note: "en horario comercial" },
      { vehicle: "Agua y vaciado", price: "Incluido", note: "" },
    ],

    pros: [
      "✅ Pernocta confirmada — abierto 24h/365 días",
      "Vigilancia 24h con cámaras de seguridad",
      "Agua potable, vaciado de depósitos grises y negras",
      "Conexión eléctrica disponible",
      "Bus Aucorsa en la puerta — ir y volver de la feria cómodamente",
      "Especializado en autocaravanas — personal que conoce las necesidades",
      "Taller con revisión de neumáticos",
    ],
    cons: [
      "A 6 km del centro — necesitas el bus o taxi para la feria",
      "No recomendable a pie (75 min)",
      "Precio no publicado — hay que llamar",
    ],

    transport: "Bus Aucorsa en la puerta / Taxi ~15 min hasta El Arenal",
    safety: "✅ Vigilancia 24h con cámaras. La opción más segura para dejar la camper.",
    source: "autocaravaningmarquez.com — información verificada directamente",
    note: "✅ Mejor opción si priorizas seguridad y servicios completos. Llama para confirmar precio y plaza durante la Feria.",
    verified: true,
  },
];

export const TRANSPORT_INFO = {
  aucorsa: {
    name: "Aucorsa — Autobuses Urbanos de Córdoba",
    web: "https://www.aucorsa.es",
    lineas: "Líneas 3 y 7 al recinto ferial. Servicio especial nocturno durante la Feria.",
    note: "Consultar horarios especiales en aucorsa.es antes del viaje.",
  },
  feriaShuttles: "Servicio especial nocturno confirmado durante la Feria. Detalles en aucorsa.es",
  taxi: {
    note: "8-12€ desde zonas de parking hasta El Arenal.",
    apps: ["FreeNow (MyTaxi)", "Cabify", "Radio Taxi Córdoba: 957 76 44 44"],
  },
  walking: {
    note: "El Área Autocaravanas de Av. Corregidor está a 16 min andando. La más cómoda para ir y volver a pie.",
  },
  tren: {
    note: "Tren neumático gratuito para mayores dentro del recinto ferial del 25 al 29 de mayo.",
  },
};

export const PARKING_TIPS = [
  "Llama primero al Grupo Barea (659 32 65 65) — si admiten camper con pernocta a 100m de la feria por 20€/día, es imbatible.",
  "El Área de Autocaravanas del Corregidor tiene 50 plazas — durante la Feria se llenan. Llega antes de las 10h.",
  "Autocaravaning Márquez tiene bus Aucorsa en la puerta — ideal para ir y volver de noche sin preocupaciones.",
  "No pagues a personas que se ofrezcan espontáneamente a 'guardarte el coche' — no son oficiales.",
  "Consulta Park4Night y CamperContact justo antes del viaje para comentarios recientes de otros campers.",
  "El abono semanal del Aparcamiento Feria (65€) solo es para turismos, no aplica a furgonetas ni campers.",
];
