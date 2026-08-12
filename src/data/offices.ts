export type Office = {
  country: string;
  flag: string;
  unit: string;
  email: string;
  addresses: { city: string; address: string }[];
};

// Order: AR (PTP · Free Trade Zone · Maritime Shipping) → BR → UY → PY → ES → NL
export const offices: Office[] = [
  {
    country: "Argentina",
    flag: "🇦🇷",
    unit: "PTP Argentina",
    email: "info@ptpgroup.com.ar",
    addresses: [
      { city: "Buenos Aires", address: "San Martín 66, 4°, of. 426, CP 1004, CABA" },
      { city: "San Nicolás de los Arroyos", address: "Nación 340, CP 2900" },
    ],
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    unit: "AR Free Trade Zone",
    email: "info@zonafrancasantafesina.com",
    addresses: [
      {
        city: "Villa Constitución (Santa Fe)",
        address: "Av. San Martín 4155, CP 2919",
      },
    ],
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    unit: "PTP Maritime Shipping Services",
    email: "federico.gomez@ptpgroup.com.ar",
    addresses: [
      {
        city: "San Nicolás de los Arroyos (Buenos Aires)",
        address: "Nación 340, CP 2900",
      },
    ],
  },
  {
    country: "Brasil",
    flag: "🇧🇷",
    unit: "PTP Brazil",
    email: "info@ptpgroup.com.br",
    addresses: [
      {
        city: "Campo Grande (Mato Grosso do Sul)",
        address: "Av. Afonso Pena 5723, Sala 1504, Evolution Business Center, CEP 79031-010",
      },
    ],
  },
  {
    country: "Uruguay",
    flag: "🇺🇾",
    unit: "PTP Uruguay",
    email: "info@ptpgroup.com.uy",
    addresses: [
      {
        city: "Montevideo",
        address: "Luis Alberto de Herrera 1248, of. 2306, Torre 2, WTC, CP 11300",
      },
      { city: "Nueva Palmira (Colonia)", address: "Av. Bravo 684, CP 70101" },
    ],
  },
  {
    country: "Paraguay",
    flag: "🇵🇾",
    unit: "PTP Paraguay",
    email: "info@ptpgroup.com.py",
    addresses: [
      { city: "Asunción", address: "Av. Aviadores del Chaco 2050, torre 4, 9°, CP 001410" },
      { city: "Villeta (Departamento Central)", address: "14 de Mayo, CP 111603" },
    ],
  },
  {
    country: "España",
    flag: "🇪🇸",
    unit: "PTP Spain",
    email: "info@ptpgroup.com.es",
    addresses: [
      { city: "Cádiz (Andalucía)", address: "Palacio San Agustín, 2°, of. 207, CP 11001" },
    ],
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    unit: "PTP Rotterdam",
    email: "info@ptpgroup.nl",
    addresses: [{ city: "Rotterdam (South Holland)", address: "Boompjes 40, 3011 XB" }],
  },
];
