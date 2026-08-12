export type PortSection = {
  subtitle?: string;
  type: string;
  coast?: string;
  vessels?: string[];
  facilities?: string[];
  cargoes?: string[];
  highlights?: string[];
  isProject?: boolean;
};

export type Port = {
  slug: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  intro?: string;
  isProject?: boolean;
  projectNote?: string;
  /** Cover photo used on the operations card and as the detail page hero. */
  cover?: string;
  /** Small WebP version of the cover used in listing cards. */
  thumb?: string;
  /** Additional photos rendered in the detail page gallery. */
  gallery?: string[];
  sections: PortSection[];
};

// 22 sites across 6 countries (Argentina, Brazil, Paraguay, Uruguay, Spain, Netherlands).
// Source of truth: PTP Group Brochure 2026 (v2).
export const ports: Port[] = [
  // ---------- Argentina ----------
  {
    slug: "san-nicolas",
    cover: "/images/terminals/san-nicolas.jpg",
    thumb: "/images/terminals/san-nicolas-thumb.webp",
    name: "San Nicolás — Deep-sea Public Port",
    city: "San Nicolás de los Arroyos",
    country: "Buenos Aires, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Porto Público Marítimo",
        coast: "Rio Paraná",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "34 pés de calado",
          "Próximo a hubs de distribuição",
          "Próximo a centros de consumo",
          "Apto para distribuição no interior",
          "Porta de entrada para o hinterland sul-americano",
        ],
      },
    ],
  },
  {
    slug: "ramallo-storage",
    cover: "/images/terminals/ramallo-storage.jpg",
    thumb: "/images/terminals/ramallo-storage-thumb.webp",
    name: "Ramallo — Storage Facility",
    city: "Ramallo",
    country: "Buenos Aires, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Instalação de Armazenamento",
        facilities: ["Armazéns para granéis sólidos"],
        highlights: [
          "70.000 toneladas de capacidade",
          "11.000 m² de estrutura",
          "Terreno próprio de 62 hectares",
          "Serviços de valor agregado disponíveis",
        ],
      },
    ],
  },
  {
    slug: "ramallo-terminal",
    cover: "/images/terminals/ramallo-terminal.jpg",
    thumb: "/images/terminals/ramallo-terminal-thumb.webp",
    name: "Ramallo — Deep-sea Multipurpose Terminal",
    city: "Ramallo",
    country: "Buenos Aires, Argentina",
    flag: "🇦🇷",
    isProject: true,
    sections: [
      {
        type: "Terminal Multipropósito Marítima (Projeto)",
        coast: "Rio Paraná",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        facilities: [
          "Parque de tanques para granéis líquidos",
          "Armazéns cobertos",
          "Pátios descobertos",
        ],
        highlights: [
          "34 pés de calado",
          "Terreno próprio de 20 hectares",
          "400 metros de cais",
          "Instalações no local",
        ],
        isProject: true,
      },
    ],
  },
  {
    slug: "pgsm-transshipment",
    cover: "/images/terminals/pgsm-transshipment.jpg",
    thumb: "/images/terminals/pgsm-transshipment-thumb.webp",
    name: "Puerto General San Martín — Transshipment Area",
    city: "Puerto Gral. San Martín",
    country: "Santa Fe, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Área de Transbordo",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "34 pés de calado",
          "Permite operações simultâneas",
          "Local de apoio às operações da área portuária do Grande Rosário",
          "Operação navio a navio bordo a bordo",
        ],
      },
    ],
  },
  {
    slug: "pgsm-storage",
    cover: "/images/terminals/pgsm-storage.jpg",
    thumb: "/images/terminals/pgsm-storage-thumb.webp",
    name: "Puerto General San Martín — Storage Facility",
    city: "Puerto Gral. San Martín",
    country: "Santa Fe, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Instalação de Armazenamento",
        facilities: ["Armazém para granéis sólidos"],
        highlights: [
          "70.000 toneladas de capacidade",
          "11.000 m² de estrutura",
          "Terreno próprio de 12 hectares",
          "Serviços de valor agregado disponíveis",
          "Instalação reconhecida pelo município por seu valor socioeconômico positivo",
        ],
      },
    ],
  },
  {
    slug: "villa-constitucion-port",
    cover: "/images/terminals/villa-constitucion-port.jpg",
    thumb: "/images/terminals/villa-constitucion-port-thumb.webp",
    name: "Villa Constitución — Deep-sea Private Multipurpose Port",
    city: "Villa Constitución",
    country: "Santa Fe, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Porto Privado Multipropósito Marítimo",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "Regime de Zona Franca",
          "34 pés de calado natural",
          "Permite operações simultâneas",
          "Cais de mais de 300 metros",
          "Instalações no local",
          "Porta de entrada para o hinterland sul-americano",
        ],
      },
    ],
  },
  {
    slug: "villa-constitucion-storage",
    cover: "/images/terminals/villa-constitucion-storage.jpg",
    thumb: "/images/terminals/villa-constitucion-storage-thumb.webp",
    name: "Villa Constitución — Storage Facility",
    city: "Villa Constitución",
    country: "Santa Fe, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        subtitle: "Instalação de Armazenamento (Granéis Sólidos)",
        type: "Instalação de Armazenamento (Granéis Sólidos)",
        facilities: ["Armazéns para granéis sólidos", "Pátios descobertos"],
        highlights: [
          "Regime de Zona Franca",
          "33.000 m² de estrutura",
          "210.000 toneladas de capacidade",
        ],
      },
      {
        subtitle: "Instalação de Armazenamento (Granéis Líquidos)",
        type: "Instalação de Armazenamento (Granéis Líquidos)",
        facilities: ["Parque de tanques para granéis líquidos"],
        highlights: [
          "Regime de Zona Franca",
          "100.000 m³ de capacidade",
          "Multi-pipelines",
        ],
      },
    ],
  },
  {
    slug: "ibicuy",
    cover: "/images/terminals/ibicuy.jpg",
    thumb: "/images/terminals/ibicuy-thumb.webp",
    name: "Ibicuy — Deep-sea Multipurpose Terminal",
    city: "Ibicuy",
    country: "Entre Ríos, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Terminal Multipropósito Marítima",
        coast: "Rio Ibicuy",
        vessels: ["Navios Handymax", "Barcaças fluviais"],
        facilities: [
          "Parque de tanques para granéis líquidos",
          "Armazéns cobertos",
          "Pátios descobertos",
        ],
        highlights: [
          "Regime de Zona Franca",
          "34 pés de calado",
          "2 berços",
          "Instalações no local",
          "Terreno de 30 hectares",
        ],
      },
    ],
  },
  {
    slug: "concepcion-del-uruguay",
    cover: "/images/terminals/concepcion-del-uruguay.jpg",
    thumb: "/images/terminals/concepcion-del-uruguay-thumb.webp",
    name: "Concepción del Uruguay — Deep-sea Public Port",
    city: "Concepción del Uruguay",
    country: "Entre Ríos, Argentina",
    flag: "🇦🇷",
    sections: [
      {
        type: "Porto Público Marítimo",
        coast: "Rio Uruguai",
        vessels: ["Navios Handymax", "Barcaças fluviais"],
        highlights: ["28 pés de calado"],
      },
    ],
  },
  {
    slug: "lima",
    cover: "/images/terminals/lima.jpg",
    thumb: "/images/terminals/lima-thumb.webp",
    name: "Lima — Deep-sea Multipurpose Terminal",
    city: "Lima",
    country: "Buenos Aires, Argentina",
    flag: "🇦🇷",
    isProject: true,
    sections: [
      {
        type: "Terminal Multipropósito Marítima (Projeto)",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        facilities: [
          "Parque de tanques para granéis líquidos",
          "Armazéns cobertos",
          "Pátios descobertos",
        ],
        highlights: [
          "700 metros de cais",
          "34 pés de calado",
          "Instalações no local",
          "Terreno próprio de 45 hectares",
        ],
        isProject: true,
      },
    ],
  },

  // ---------- Uruguay ----------
  {
    slug: "montevideo",
    cover: "/images/terminals/montevideo.jpg",
    thumb: "/images/terminals/montevideo-thumb.webp",
    name: "Montevideo — Deep-sea Public Port",
    city: "Montevideo",
    country: "Uruguai",
    flag: "🇺🇾",
    sections: [
      {
        type: "Porto Público Marítimo",
        coast: "Rio da Prata",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "42 pés de calado",
          "Porta de entrada para o hinterland sul-americano",
        ],
      },
    ],
  },
  {
    slug: "juanico-storage",
    cover: "/images/terminals/juanico-storage.jpg",
    thumb: "/images/terminals/juanico-storage-thumb.webp",
    gallery: ["/images/terminals/juanico-alt.jpg"],
    name: "Juanicó — Storage Facility",
    city: "Juanicó",
    country: "Canelones, Uruguai",
    flag: "🇺🇾",
    sections: [
      {
        type: "Instalação de Armazenamento",
        highlights: [
          "Outsourcing operacional",
          "Instalação com 45.000 toneladas de capacidade",
        ],
      },
    ],
  },
  {
    slug: "juanico-storage-project",
    cover: "/images/terminals/juanico-storage-project.jpg",
    thumb: "/images/terminals/juanico-storage-project-thumb.webp",
    name: "Juanicó — Storage Facility (Project)",
    city: "Juanicó",
    country: "Canelones, Uruguai",
    flag: "🇺🇾",
    isProject: true,
    sections: [
      {
        type: "Instalação de Armazenamento (Projeto)",
        highlights: [
          "Terreno próprio de 2,5 hectares",
          "11.000 m² de estrutura",
          "70.000 toneladas de capacidade",
          "Serviços de valor agregado disponíveis",
        ],
        isProject: true,
      },
    ],
  },
  {
    slug: "nueva-palmira-port",
    cover: "/images/terminals/nueva-palmira-port.jpg",
    thumb: "/images/terminals/nueva-palmira-port-thumb.webp",
    name: "Nueva Palmira — Deep-sea Public Port",
    city: "Nueva Palmira",
    country: "Colonia, Uruguai",
    flag: "🇺🇾",
    sections: [
      {
        type: "Porto Público Marítimo",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "34 pés de calado",
          "Próximo às instalações de armazenamento da PTP Uruguay",
        ],
      },
    ],
  },
  {
    slug: "nueva-palmira-storage",
    cover: "/images/terminals/nueva-palmira-storage.jpg",
    thumb: "/images/terminals/nueva-palmira-storage-thumb.webp",
    name: "Nueva Palmira — Storage Facilities · Dry Bulk & Liquid Bulk",
    city: "Nueva Palmira",
    country: "Colonia, Uruguai",
    flag: "🇺🇾",
    sections: [
      {
        subtitle: "Instalação de Armazenamento (Granéis Sólidos)",
        type: "Instalação de Armazenamento (Granéis Sólidos)",
        facilities: ["Armazéns para granéis sólidos"],
        highlights: [
          "Terreno próprio de 3 hectares",
          "70.000 toneladas de capacidade",
          "11.000 m² de estrutura",
        ],
      },
      {
        subtitle: "Instalação de Armazenamento (Granéis Líquidos)",
        type: "Instalação de Armazenamento (Granéis Líquidos)",
        facilities: ["Parque de tanques para granéis líquidos"],
        highlights: [
          "Terreno próprio",
          "Parque de tanques com 23.750 m³ de capacidade",
          "Próximo ao porto público de Nueva Palmira",
        ],
      },
    ],
  },
  {
    slug: "punta-del-arenal",
    cover: "/images/terminals/punta-del-arenal.jpg",
    thumb: "/images/terminals/punta-del-arenal-thumb.webp",
    name: "Punta del Arenal — Storage & Multipurpose Terminal",
    city: "Punta del Arenal",
    country: "Soriano, Uruguai",
    flag: "🇺🇾",
    isProject: true,
    sections: [
      {
        subtitle: "Instalações de Armazenamento",
        type: "Instalações de Armazenamento",
        facilities: ["Pátios descobertos", "Pátio de contêineres"],
        highlights: [
          "Terreno próprio de 250 hectares",
          "Parque de tanques com 100.000 m³ de capacidade",
          "150.000 toneladas de capacidade para fertilizantes",
          "50.000 m² de estrutura",
        ],
      },
      {
        subtitle: "Terminal Multipropósito Privada Marítima (Projeto)",
        type: "Terminal Multipropósito Marítima (Projeto)",
        coast: "Rio Uruguai",
        vessels: ["Navios Panamax", "Barcaças fluviais"],
        highlights: [
          "34 pés de calado",
          "Cais com capacidade para dois navios",
          "Área de amarração e espera de barcaças",
          "Instalações no local",
        ],
        isProject: true,
      },
    ],
  },

  // ---------- Paraguay ----------
  {
    slug: "villeta",
    cover: "/images/terminals/villeta.jpg",
    thumb: "/images/terminals/villeta-thumb.webp",
    name: "Villeta — Multipurpose River Terminal",
    city: "Villeta",
    country: "Departamento Central, Paraguai",
    flag: "🇵🇾",
    sections: [
      {
        type: "Terminal Fluvial Multipropósito",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Pequenos navios feeder", "Barcaças fluviais"],
        highlights: [
          "15 pés de calado",
          "Instalações no local",
          "Primeira PPP do Paraguai",
          "65.000 toneladas de capacidade para fertilizantes",
          "15.000 toneladas de capacidade para grãos",
          "Parque de tanques de 10.000 m³",
        ],
      },
    ],
  },

  // ---------- Brasil ----------
  {
    slug: "porto-murtinho",
    cover: "/images/terminals/porto-murtinho.jpg",
    thumb: "/images/terminals/porto-murtinho-thumb.webp",
    name: "Porto Murtinho — Multipurpose River Terminal",
    city: "Porto Murtinho",
    country: "Mato Grosso do Sul, Brasil",
    flag: "🇧🇷",
    sections: [
      {
        type: "Terminal Fluvial Multipropósito",
        coast: "Hidrovia Paraná-Paraguai",
        vessels: ["Barcaças fluviais"],
        highlights: [
          "15 pés de calado",
          "Instalações no local",
          "Terreno próprio de 35 hectares",
          "40.000 toneladas de capacidade para fertilizantes",
          "30.000 toneladas de capacidade para grãos",
          "4.200 m² para carga geral",
        ],
      },
    ],
  },

  // ---------- España ----------
  {
    slug: "cadiz-port",
    cover: "/images/terminals/cadiz-port.jpg",
    thumb: "/images/terminals/cadiz-port-thumb.webp",
    name: "Cádiz — Deep-sea Multipurpose Public Port & Cold Store",
    city: "Cádiz",
    country: "Andalucía, Espanha",
    flag: "🇪🇸",
    intro:
      "Duas concessões de longo prazo outorgadas pela Autoridade Portuária da Baía de Cádiz.",
    sections: [
      {
        subtitle: "Porto Público Multipropósito Marítimo",
        type: "Porto Público Multipropósito Marítimo",
        coast: "Oceano Atlântico",
        vessels: [
          "Navios Panamax",
          "Transporte marítimo de cabotagem",
          "Embarcações de navegação interior",
        ],
        highlights: [
          "45 pés de calado",
          "Capacidade de crossdocking",
          "Rampa Ro-Ro",
          "2 cais somando mais de 600 metros de plataforma operacional",
          "Instalações no local",
        ],
      },
      {
        subtitle: "Instalação de Armazenamento",
        type: "Instalação de Armazenamento",
        facilities: ["Armazém frigorífico"],
        cargoes: ["Carga fresca, refrigerada e congelada"],
        highlights: [
          "20.000 posições de paletes",
          "Terreno de 24.000 m²",
          "Conectividade ferroviária",
          "Controle fronteiriço no local",
        ],
      },
    ],
  },
  {
    slug: "cadiz-drybulk",
    cover: "/images/terminals/cadiz-drybulk.jpg",
    thumb: "/images/terminals/cadiz-drybulk-thumb.webp",
    name: "Cádiz — Dry bulk Warehouse",
    city: "Cádiz",
    country: "Andalucía, Espanha",
    flag: "🇪🇸",
    intro:
      "Duas concessões de longo prazo outorgadas pela Autoridade Portuária da Baía de Cádiz.",
    sections: [
      {
        type: "Instalação de Armazenamento",
        facilities: ["Armazém para granéis sólidos"],
        highlights: [
          "Terreno de 38.000 m²",
          "119.000 toneladas de capacidade",
          "Estrutura com 10 divisões",
        ],
      },
    ],
  },
  {
    slug: "tarragona",
    cover: "/images/terminals/tarragona.jpg",
    thumb: "/images/terminals/tarragona-thumb.webp",
    name: "Tarragona — Deep-sea Multipurpose Public Port",
    city: "Tarragona",
    country: "Cataluña, Espanha",
    flag: "🇪🇸",
    intro: "Joint venture entre PTP Group e COSCO.",
    sections: [
      {
        type: "Porto Público Multipropósito Marítimo",
        coast: "Mar Mediterrâneo",
        vessels: ["Navios Post-Panamax", "Navios Capesize", "Navios Ro-Ro"],
        facilities: [
          "Pátio de contêineres",
          "Pátio de veículos",
          "Zona logística refrigerada",
          "Terminal intermodal",
          "Ponto de controle fronteiriço / scanner",
        ],
        highlights: [
          "50 pés de calado",
          "Mais de 1.050 metros de cais",
          "Capacidade de crossdocking",
          "Concessão de terreno de 510.000 m²",
          "160.000 m² de pátio para mais de 3.200 contêineres (cheios e vazios)",
          "49.000 m² de pátio para mais de 2.400 veículos",
          "110.000 m² para logística de cadeia de frio",
          "23.000 m² de armazém frigorífico para carga fresca, refrigerada e congelada",
          "58.000 m² de hub intermodal ferroportuário",
          "Ponto de controle e inspeção fronteiriça no local",
        ],
      },
    ],
  },

  // ---------- Netherlands ----------
  {
    slug: "rotterdam",
    cover: "/images/terminals/rotterdam.jpg",
    thumb: "/images/terminals/rotterdam-thumb.webp",
    name: "Rotterdam — Deep-sea Food & Agri Terminal",
    city: "Rotterdam",
    country: "South Holland, Holanda",
    flag: "🇳🇱",
    intro:
      "O Porto de Roterdã é o maior porto da Europa e um dos principais hubs marítimos do mundo, entre os 15 maiores portos globais em movimentação de carga e principal porta de entrada da Europa para o comércio internacional.",
    sections: [
      {
        subtitle: "Terminal Marítima de Food & Agri",
        type: "Terminal Marítima de Food & Agri",
        coast: "Mar do Norte",
        vessels: [
          "Navios de longo curso",
          "Transporte marítimo de cabotagem",
          "Barcaças fluviais",
        ],
        highlights: [
          "43 pés de calado",
          "500 metros de cais",
          "Quebra-mar de 160 metros",
          "Área de espera de barcaças",
          "Instalações no local",
        ],
      },
      {
        subtitle: "Terminal",
        type: "Terminal",
        highlights: [
          "73.000 m² de área de terminal e operações",
          "Capacidade para carga conteinerizada e paletizada",
          "700 tomadas reefer",
          "Preparado para shore-power",
        ],
      },
      {
        subtitle: "Instalações de Armazenamento",
        type: "Instalações de Armazenamento",
        cargoes: ["Carga fresca, refrigerada e congelada"],
        highlights: [
          "DC1 — 70.000 m² de armazéns frigoríficos",
          "DC2 — 60.000 m² de armazéns frigoríficos",
          "25.000 m² de armazém frigorífico exclusivo do PTP Group, com 40.000 posições de paletes",
          "Apto para carga fresca, refrigerada e congelada",
        ],
      },
    ],
  },
];

export const getPort = (slug: string) => ports.find((p) => p.slug === slug);
