import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "pt" | "es" | "en";

export const langMeta: Record<Lang, { code: string; label: string; html: string }> = {
  pt: { code: "PT", label: "Português", html: "pt" },
  es: { code: "SP", label: "Español", html: "es" },
  en: { code: "EN", label: "English", html: "en" },
};

export const langOrder: Lang[] = ["en", "pt", "es"];

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  pt: {
    // Nav
    "nav.home": "Início",
    "nav.about": "Sobre Nós",
    "nav.services": "Serviços",
    "nav.operations": "Operações",
    "nav.freezone": "Zona Franca",
    "nav.maritime": "Agência Marítima",
    "nav.resources": "Recursos",
    "nav.news": "Imprensa",
    "nav.contact": "Contato",

    // Hero
    "hero.scroll": "Rolar",

    // Globe / Presença
    "globe.eyebrow": "Presença Global",
    "globe.title.line1": "Uma rede",
    "globe.title.line2": "sem fronteiras.",
    "globe.intro": "Operações estratégicas conectando o comércio internacional entre América do Sul e Europa.",
    "globe.loading": "Carregando globo…",
    "globe.card.cta": "Ver terminal",
    "globe.cta": "VER DETALHES →",
    "globe.highlights": "Destaques",
    "globe.address": "Endereço",
    "globe.close": "Fechar",
    "globe.list.show": "Ver terminais",
    "globe.list.hide": "Ocultar terminais",
    "globe.legend.port": "Portos e terminais",
    "globe.legend.storage": "Armazenagem",
    "globe.legend.project": "Projetos",
    "globe.legend.waterway": "Hidrovias, rios e canais",


    // Operations
    "ops.eyebrow": "Atuações",
    "ops.title.line1": "Três pilares,",
    "ops.title.line2": "uma só visão.",
    "ops.01.title": "Operações Portuárias",
    "ops.01.desc": "Gestão integral de terminais marítimos e fluviais. Carga geral, granéis e contêineres com infraestrutura de classe mundial.",
    "ops.02.title": "Logística",
    "ops.02.desc": "Soluções end-to-end: transporte terrestre, armazenagem e distribuição. Frota própria e rede integrada de parceiros.",
    "ops.03.title": "Zonas Francas",
    "ops.03.desc": "Operador exclusivo da Zona Franca Santafesina. Plataforma estratégica para comércio internacional e redução de custos.",

    // Operations list page
    "ops.list.eyebrow": "Portos e Terminais",
    "ops.list.title1": "22 portos,",
    "ops.list.title2": "6 países.",
    "ops.list.intro": "Selecione um porto ou terminal para acessar a ficha técnica completa: tipo, costa, embarcações, instalações, cargas e destaques operacionais.",
    "ops.list.view": "Ver ficha",

    // Home about block
    "home.about.eyebrow": "Quem Somos",
    "home.about.title1": "Plataforma logística",
    "home.about.title2": "totalmente integrada.",
    "home.about.copy": "O PTP Group é uma empresa privada que oferece soluções logísticas integradas na América do Sul e na Europa. Sob o lema Conectando Mercados Globais e com uma sólida orientação para o cliente, a companhia evoluiu desde suas origens nas operações portuárias até tornar-se uma plataforma logística integrada que potencializa o fluxo de commodities entre regiões.",
    "home.about.cta": "Conheça nossa história",

    // Stats bar
    "stats.countries": "Países",
    "stats.ports": "Portos e Terminais",
    "stats.hectares": "Hectares sob Regime de Zona Franca",
    "stats.since": "Desde",
    "notfound.title": "Página não encontrada",
    "notfound.home": "Voltar ao início",

    // About page
    "about.eyebrow": "Quem Somos",
    "about.title1": "Plataforma logística",
    "about.title2": "totalmente integrada.",
    "about.p1": "O PTP Group é uma empresa privada que oferece soluções logísticas integradas na América do Sul e na Europa. Sob o lema Conectando Mercados Globais e com uma sólida orientação para o cliente, a companhia evoluiu desde suas origens nas operações portuárias até tornar-se uma plataforma logística integrada que potencializa o fluxo de commodities entre regiões.",
    "about.p2": "Graças a uma integração vertical progressiva ao longo da cadeia de suprimentos, a companhia desenvolveu um amplo portfólio de serviços que abrange operações portuárias, agenciamento marítimo, armazenagem, suporte documental, transporte terrestre, gestão de zonas francas, outsourcing operacional e entrega de última milha, entre outros serviços logísticos de alto valor agregado.",
    "about.p3": "A expansão geográfica e o crescimento sustentado do PTP Group consolidaram a companhia como um dos principais players logísticos da região, com operações ao longo da Hidrovia Paraná–Paraguai e em mais de 20 unidades distribuídas entre Argentina, Brasil, Paraguai, Uruguai, Espanha e os Países Baixos.",
    "about.p4": "A companhia conta com escritórios, equipes comerciais e operacionais alocadas in loco, presença em portos públicos e terminais privados, bem como infraestrutura para granéis líquidos e sólidos, carga geral, carga de projeto, carga conteinerizada e carga com temperatura controlada.",
    "about.timeline.eyebrow": "Linha do tempo",

    // Timeline
    "timeline.all": "Todos",

    // Services page
    "services.eyebrow": "Serviços",
    "seo.home.desc": "PTP Group: 22 portos, terminais e instalações de armazenagem em 6 países — operações portuárias, logística integrada, zona franca e agência marítima.",
    "seo.services.desc": "Oito frentes de serviço integradas: operações portuárias, armazenagem, transbordo, logística, zona franca e agência marítima.",
    "seo.maritime.desc": "PTP Maritime Shipping Services: agenciamento marítimo completo na Argentina, Uruguai, Paraguai, Brasil e Espanha.",
    "seo.downloads.desc": "Baixe o brochure institucional 2026 do PTP Group e assista aos vídeos corporativos em português, espanhol e inglês.",
    "seo.contact.desc": "Fale com o PTP Group. Escritórios na Argentina, Uruguai, Paraguai, Espanha e Países Baixos.",
    "services.title1": "Oito frentes,",
    "services.title2": "uma só operação.",

    // FreeZone page
    "fz.eyebrow": "Zona Franca",
    "fz.title1": "Zona Franca",
    "fz.title2": "Santa Fé.",
    "fz.label.location": "Localização",
    "fz.label.operator": "Operadora",
    "fz.location": "Villa Constitución · Santa Fe · Argentina",
    "fz.operator": "Zofravilla S.A.",
    "fz.p1": "A Zofravilla S.A. é a concessionária de longo prazo da Zona Franca de Santa Fé. Está localizada em um terreno de 65 hectares com mais de 600 metros de frente fluvial diretamente conectado à Hidrovia Paraguai-Paraná, onde a empresa desenvolveu um ambicioso polo logístico regional para cargas, mercadorias e commodities, tanto na entrada quanto na saída da região.",
    "fz.p2": "O regime tributário, fiscal e aduaneiro diferenciado torna esta localização estratégica com vantagens competitivas muito atrativas.",
    "fz.quote": "A Zona Franca de Santa Fé é a primeira e única zona franca na Argentina diretamente conectada a um porto de águas profundas.",
    "fz.highlights": "Destaques",
    "fz.outro": "A proximidade de uma via navegável principal, oceano, ferrovia e rodovia, além da curta distância de alguns dos principais centros de consumo e produção do país, fazem deste local uma alternativa interessante para inclusão em qualquer cadeia de fornecimento de commodities.",
    "fz.h.1": "Mais de 50 hectares de terra sob regime de zona franca",
    "fz.h.2": "Capacidade para navios Panamax",
    "fz.h.3": "Calado natural de 34''",
    "fz.h.4": "Autoridades governamentais no local",
    "fz.h.5": "Primeiro porto na Argentina diretamente conectado a uma zona franca",
    "fz.h.6": "Operador portuário único",
    "fz.h.7": "Instalações multiprodutos e multiclientes",
    "fz.h.8": "Adequado para carga geral, carga fracionada, granel, conteinerizada, paletizada e carga de projeto",
    "fz.h.9": "33.000 m² de armazéns cobertos já construídos, com mais de 30.000 m² de instalações adicionais projetadas",
    "fz.h.10": "Tanque de granéis líquidos com 100.000 m³ em construção",
    "fz.h.11": "Nacionalização parcial de bens e commodities",
    "fz.h.12": "Sem limite de tempo de armazenagem",
    "fz.h.13": "Maior mitigação de riscos",
    "fz.h.14": "Melhores garantias jurídicas, econômicas e financeiras",

    // Maritime page
    "mar.eyebrow": "Agência Marítima",
    "mar.title1": "PTP Maritime",
    "mar.title2": "Shipping Services.",
    "mar.lead": "Oferece soluções por meio de escritórios e equipe próprios, bem como por meio de parceiros estratégicos, fornecendo ampla cobertura e conectividade regional.",
    "mar.intro": "Alinhada à estratégia de integração vertical da empresa e com o objetivo de oferecer melhores e mais abrangentes serviços aos nossos clientes, nasceu a PTP Maritime Shipping Services. Uma agência marítima completa que oferece suporte em áreas como:",
    "mar.services.title": "Serviços",
    "mar.ports.title": "Portos servidos",
    "mar.offices.title": "Rede de escritórios",
    "mar.address": "Nación 340, CP 2900, San Nicolás de los Arroyos, Buenos Aires, Argentina",
    "mar.coverage.national": "cobertura nacional",
    "mar.s.1": "Coordenação de entrada e desembaraço aduaneiro",
    "mar.s.2": "Articulação com as autoridades portuárias",
    "mar.s.3": "Desembaraço aduaneiro para facilitar as operações das embarcações",
    "mar.s.4": "Elaboração e acompanhamento de documentação",
    "mar.s.5": "Documentação para autorização de atraque e desatraque",
    "mar.s.6": "Supervisão de carga e descarga",
    "mar.s.7": "Troca de tripulação e transporte de práticos",
    "mar.s.8": "Consultoria sobre regulamentos portuários, cultura e idioma",
    "mar.s.9": "Garantia de serviços portuários quando necessário",
    "mar.s.10": "Representante dos armadores",
    "mar.s.11": "Abastecimento de combustível (bunkering)",
    "mar.s.12": "Descarte de resíduos",

    // Contact page (extension)
    "contact.offices.eyebrow": "Escritórios",
    "contact.offices.title1": "Nossa rede",
    "contact.offices.title2": "de escritórios.",

    // Contact
    "contact.eyebrow": "Contato",
    "contact.title.line1": "Se você tiver perguntas, dúvidas ou comentários,",
    "contact.title.line2": "entre em contato conosco.",
    "contact.intro": "Nossa equipe responderá o mais breve possível.",
    "contact.field.name": "Nome completo",
    "contact.field.company": "Empresa",
    "contact.field.phone": "Telefone (com código do país e área)",
    "contact.field.phone.placeholder": "+54 11 5555 5555",
    "contact.field.email": "Email",
    "contact.field.message": "Sua mensagem",
    "contact.submit": "Enviar",
    "contact.toast.title": "Mensagem enviada",
    "contact.toast.desc": "Entraremos em contato em breve.",

    // Downloads / Media Library
    "dl.eyebrow": "Biblioteca de Mídia",
    "dl.title.line1": "Corporate",
    "dl.title.line2": "Media.",
    "dl.size": "PDF · 12MB",
    "dl.brochure.title": "Company Brochure",
    "dl.brochure.desc": "Apresentação completa do grupo, operações e capacidades.",
    "dl.download": "Download",
    "dl.videos.eyebrow": "Company Video",
    "dl.videos.size": "MP4 · Google Drive",
    "dl.video.por.title": "PTP Group — Portuguese",
    "dl.video.por.desc": "Apresentação institucional do PTP Group em português.",
    "dl.video.esp.title": "PTP Group — Spanish",
    "dl.video.esp.desc": "Apresentação institucional do PTP Group em espanhol.",
    "dl.video.eng.title": "PTP Group — English",
    "dl.video.eng.desc": "Apresentação institucional do PTP Group em inglês.",
    "dl.video.watch": "Assistir / Baixar",

    // News / LinkedIn
    "news.eyebrow": "Press Center",
    "news.title.line1": "Press",
    "news.title.line2": "Center.",
    "news.intro": "Notas, publicações e comunicados oficiais do grupo. Siga-nos no LinkedIn para acompanhar cada movimento em tempo real.",
    "news.follow": "Seguir PTP Group",
    "news.viewOn": "Ver no LinkedIn",
    "news.viewMore": "Ver mais no LinkedIn",

    // Footer
    "footer.about": "Soluções logísticas portuárias integradas na América do Sul e Europa.",
    "footer.contact": "Contato",
    "footer.operations": "Operações",
    "footer.nav": "Navegação",
    "footer.units": "Rede",
    "footer.rights": "Todos os direitos reservados.",
    "footer.craft": "Feito com precisão.",
    "footer.g2.prefix": "Desenvolvido por",

    // Port detail
    "port.back": "Voltar para Atuações",
    "port.notfound.eyebrow": "Não encontrado",
    "port.notfound.title": "Porto não encontrado.",
    "port.fs.type": "Tipo",
    "port.fs.coast": "Costa / Rio",
    "port.fs.vessels": "Embarcações",
    "port.fs.facilities": "Instalações",
    "port.fs.cargoes": "Cargas",
    "port.fs.highlights": "Destaques",

    // Badges
    "badge.project": "Em desenvolvimento",
    "badge.project.aria": "Projeto em desenvolvimento",

    // WhatsApp
    "wa.aria": "Contatar por WhatsApp",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.services": "Servicios",
    "nav.operations": "Operaciones",
    "nav.freezone": "Zona Franca",
    "nav.maritime": "Agencia Marítima",
    "nav.resources": "Recursos",
    "nav.news": "Prensa",
    "nav.contact": "Contacto",

    "hero.scroll": "Scroll",

    "globe.eyebrow": "Presencia Global",
    "globe.title.line1": "Una red",
    "globe.title.line2": "sin fronteras.",
    "globe.intro": "Operaciones estratégicas conectando el comercio internacional entre Sudamérica y Europa.",
    "globe.loading": "Cargando globo…",
    "globe.card.cta": "Ver terminal",
    "globe.cta": "VER DETALLES →",
    "globe.highlights": "Destacados",
    "globe.address": "Dirección",
    "globe.close": "Cerrar",
    "globe.list.show": "Ver terminales",
    "globe.list.hide": "Ocultar terminales",
    "globe.legend.port": "Puertos y terminales",
    "globe.legend.storage": "Almacenamiento",
    "globe.legend.project": "Proyectos",
    "globe.legend.waterway": "Hidrovías, ríos y canales",


    "ops.eyebrow": "Actuaciones",
    "ops.title.line1": "Tres pilares,",
    "ops.title.line2": "una sola visión.",
    "ops.01.title": "Operaciones Portuarias",
    "ops.01.desc": "Gestión integral de terminales marítimas y fluviales. Carga general, graneles y contenedores con infraestructura de clase mundial.",
    "ops.02.title": "Logística",
    "ops.02.desc": "Soluciones end-to-end: transporte terrestre, almacenamiento y distribución. Flota propia y red integrada de socios.",
    "ops.03.title": "Zonas Francas",
    "ops.03.desc": "Operador exclusivo de la Zona Franca Santafesina. Plataforma estratégica para comercio internacional y reducción de costos.",

    "ops.list.eyebrow": "Puertos y Terminales",
    "ops.list.title1": "22 puertos,",
    "ops.list.title2": "6 países.",
    "ops.list.intro": "Seleccione un puerto o terminal para acceder a la ficha técnica completa: tipo, costa, buques, instalaciones, cargas y destacados operativos.",
    "ops.list.view": "Ver ficha",

    "home.about.eyebrow": "Nosotros",
    "home.about.title1": "Plataforma logística",
    "home.about.title2": "totalmente integrada.",
    "home.about.copy": "PTP Group es una empresa privada que brinda soluciones logísticas integrales en Sudamérica y Europa. Bajo el lema “Conectando Mercados Globales” y con una sólida orientación al cliente, la compañía ha evolucionado desde sus orígenes en las operaciones portuarias hasta convertirse en una plataforma logística integrada que potencia el flujo de commodities entre regiones.",
    "home.about.cta": "Conocé nuestra historia",

    "stats.countries": "Países",
    "stats.ports": "Puertos y Terminales",
    "stats.hectares": "Hectáreas bajo Régimen Zona Franca",
    "stats.since": "Desde",
    "notfound.title": "Página no encontrada",
    "notfound.home": "Volver al inicio",

    "about.eyebrow": "Nosotros",
    "about.title1": "Plataforma logística",
    "about.title2": "totalmente integrada.",
    "about.p1": "PTP Group es una empresa privada que brinda soluciones logísticas integrales en Sudamérica y Europa. Bajo el lema “Conectando Mercados Globales” y con una sólida orientación al cliente, la compañía ha evolucionado desde sus orígenes en las operaciones portuarias hasta convertirse en una plataforma logística integrada que potencia el flujo de commodities entre regiones.",
    "about.p2": "Como resultado de una integración vertical progresiva a lo largo de la cadena de suministro, la compañía ha dado forma a un amplio portfolio que abarca operaciones portuarias, agenciamiento marítimo, almacenaje, soporte documental, transporte terrestre, gestión de zonas francas, outsourcing operativo y distribución de última milla, entre otros servicios logísticos de alto valor agregado.",
    "about.p3": "La expansión geográfica y el crecimiento sostenido de PTP Group han consolidado a la compañía como uno de los principales referentes logísticos de la región, con operaciones a lo largo de la Hidrovía Paraná–Paraguay y en más de 20 sitios distribuidos entre Argentina, Brasil, Paraguay, Uruguay, España y los Países Bajos.",
    "about.p4": "La compañía cuenta con oficinas, equipos comerciales y operativos in situ, presencia en puertos públicos y terminales privadas, así como infraestructura para graneles líquidos y sólidos, carga general, carga de proyecto, carga contenerizada y carga con temperatura controlada.",
    "about.timeline.eyebrow": "Línea de tiempo",

    "timeline.all": "Todos",

    "services.eyebrow": "Servicios",
    "seo.home.desc": "PTP Group: 22 puertos, terminales e instalaciones de almacenamiento en 6 países — operaciones portuarias, logística integrada, zona franca y agencia marítima.",
    "seo.services.desc": "Ocho frentes de servicio integradas: operaciones portuarias, almacenamiento, transbordo, logística, zona franca y agencia marítima.",
    "seo.maritime.desc": "PTP Maritime Shipping Services: agenciamiento marítimo integral en Argentina, Uruguay, Paraguay, Brasil y España.",
    "seo.downloads.desc": "Descargue el brochure institucional 2026 de PTP Group y vea los videos corporativos en portugués, español e inglés.",
    "seo.contact.desc": "Contacte a PTP Group. Oficinas en Argentina, Uruguay, Paraguay, España y Países Bajos.",
    "services.title1": "Ocho frentes,",
    "services.title2": "una sola operación.",

    "fz.eyebrow": "Zona Franca",
    "fz.title1": "Zona Franca",
    "fz.title2": "Santa Fe.",
    "fz.label.location": "Ubicación",
    "fz.label.operator": "Operadora",
    "fz.location": "Villa Constitución · Santa Fe · Argentina",
    "fz.operator": "Zofravilla S.A.",
    "fz.p1": "Zofravilla S.A. es la concesionaria a largo plazo de la Zona Franca de Santa Fe. Está ubicada en un terreno de 65 hectáreas con más de 600 metros de frente fluvial directamente conectado a la Hidrovía Paraguay-Paraná, donde la empresa desarrolló un ambicioso polo logístico regional para cargas, mercaderías y commodities, tanto a la entrada como a la salida de la región.",
    "fz.p2": "El régimen tributario, fiscal y aduanero diferencial vuelve a esta ubicación estratégica con ventajas competitivas muy atractivas.",
    "fz.quote": "La Zona Franca de Santa Fe es la primera y única zona franca en Argentina conectada directamente a un puerto de aguas profundas.",
    "fz.highlights": "Destacados",
    "fz.outro": "La proximidad a una vía navegable principal, océano, ferrocarril y carretera, sumada a la corta distancia de algunos de los principales centros de consumo y producción del país, hacen de este sitio una alternativa interesante para incluir en cualquier cadena de suministro de commodities.",
    "fz.h.1": "Más de 50 hectáreas de tierra bajo régimen de zona franca",
    "fz.h.2": "Capacidad para buques Panamax",
    "fz.h.3": "Calado natural de 34''",
    "fz.h.4": "Autoridades gubernamentales en el sitio",
    "fz.h.5": "Primer puerto en Argentina directamente conectado a una zona franca",
    "fz.h.6": "Operador portuario único",
    "fz.h.7": "Instalaciones multiproducto y multicliente",
    "fz.h.8": "Apto para carga general, fraccionada, granel, contenerizada, paletizada y carga de proyecto",
    "fz.h.9": "33.000 m² de depósitos cubiertos ya construidos, con más de 30.000 m² de instalaciones adicionales proyectadas",
    "fz.h.10": "Tanque de graneles líquidos de 100.000 m³ en construcción",
    "fz.h.11": "Nacionalización parcial de bienes y commodities",
    "fz.h.12": "Sin límite de tiempo de almacenamiento",
    "fz.h.13": "Mayor mitigación de riesgos",
    "fz.h.14": "Mejores garantías jurídicas, económicas y financieras",

    "mar.eyebrow": "Agencia Marítima",
    "mar.title1": "PTP Maritime",
    "mar.title2": "Shipping Services.",
    "mar.lead": "Ofrece soluciones a través de oficinas y equipo propios, así como mediante socios estratégicos, brindando amplia cobertura y conectividad regional.",
    "mar.intro": "Alineada con la estrategia de integración vertical de la empresa y con el objetivo de ofrecer mejores y más amplios servicios a nuestros clientes, nació PTP Maritime Shipping Services. Una agencia marítima completa que ofrece soporte en áreas como:",
    "mar.services.title": "Servicios",
    "mar.ports.title": "Puertos servidos",
    "mar.offices.title": "Red de oficinas",
    "mar.address": "Nación 340, CP 2900, San Nicolás de los Arroyos, Buenos Aires, Argentina",
    "mar.coverage.national": "cobertura nacional",
    "mar.s.1": "Coordinación de ingreso y despacho aduanero",
    "mar.s.2": "Articulación con las autoridades portuarias",
    "mar.s.3": "Despacho aduanero para facilitar las operaciones de los buques",
    "mar.s.4": "Elaboración y seguimiento de documentación",
    "mar.s.5": "Documentación para autorización de atraque y desatraque",
    "mar.s.6": "Supervisión de carga y descarga",
    "mar.s.7": "Cambio de tripulación y transporte de prácticos",
    "mar.s.8": "Asesoramiento sobre regulaciones portuarias, cultura e idioma",
    "mar.s.9": "Garantía de servicios portuarios cuando sea necesario",
    "mar.s.10": "Representante de los armadores",
    "mar.s.11": "Abastecimiento de combustible (bunkering)",
    "mar.s.12": "Descarte de residuos",

    "contact.offices.eyebrow": "Oficinas",
    "contact.offices.title1": "Nuestra red",
    "contact.offices.title2": "de oficinas.",

    "contact.eyebrow": "Contacto",
    "contact.title.line1": "Si tienes preguntas, dudas o comentarios,",
    "contact.title.line2": "no dudes en contactarnos.",
    "contact.intro": "Nuestro equipo te responderá a la brevedad.",
    "contact.field.name": "Nombre completo",
    "contact.field.company": "Empresa",
    "contact.field.phone": "Teléfono (con código de país y área)",
    "contact.field.phone.placeholder": "+54 11 5555 5555",
    "contact.field.email": "Email",
    "contact.field.message": "Tu mensaje",
    "contact.submit": "Enviar",
    "contact.toast.title": "Mensaje enviado",
    "contact.toast.desc": "Nos pondremos en contacto a la brevedad.",

    "dl.eyebrow": "Biblioteca de Medios",
    "dl.title.line1": "Corporate",
    "dl.title.line2": "Media.",
    "dl.size": "PDF · 12MB",
    "dl.brochure.title": "Company Brochure",
    "dl.brochure.desc": "Presentación completa del grupo, operaciones y capacidades.",
    "dl.download": "Descargar",
    "dl.videos.eyebrow": "Company Video",
    "dl.videos.size": "MP4 · Google Drive",
    "dl.video.por.title": "PTP Group — Portuguese",
    "dl.video.por.desc": "Presentación institucional de PTP Group en portugués.",
    "dl.video.esp.title": "PTP Group — Spanish",
    "dl.video.esp.desc": "Presentación institucional de PTP Group en español.",
    "dl.video.eng.title": "PTP Group — English",
    "dl.video.eng.desc": "Presentación institucional de PTP Group en inglés.",
    "dl.video.watch": "Ver / Descargar",

    "news.eyebrow": "Press Center",
    "news.title.line1": "Press",
    "news.title.line2": "Center.",
    "news.intro": "Notas, publicaciones y comunicados oficiales del grupo. Síganos en LinkedIn para acompañar cada movimiento en tiempo real.",
    "news.follow": "Seguir PTP Group",
    "news.viewOn": "Ver en LinkedIn",
    "news.viewMore": "Ver más en LinkedIn",

    "footer.about": "Soluciones logísticas portuarias integradas en Sudamérica y Europa.",
    "footer.contact": "Contacto",
    "footer.operations": "Operaciones",
    "footer.nav": "Navegación",
    "footer.units": "Red",
    "footer.rights": "Todos los derechos reservados.",
    "footer.craft": "Hecho con precisión.",
    "footer.g2.prefix": "Desarrollado por",

    "port.back": "Volver a Actuaciones",
    "port.notfound.eyebrow": "No encontrado",
    "port.notfound.title": "Puerto no encontrado.",
    "port.fs.type": "Tipo",
    "port.fs.coast": "Costa / Río",
    "port.fs.vessels": "Buques",
    "port.fs.facilities": "Instalaciones",
    "port.fs.cargoes": "Cargas",
    "port.fs.highlights": "Destacados",

    "badge.project": "En desarrollo",
    "badge.project.aria": "Proyecto en desarrollo",

    "wa.aria": "Contactar por WhatsApp",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.operations": "Operations",
    "nav.freezone": "Free Zone",
    "nav.maritime": "Shipping Agency",
    "nav.resources": "Resources",
    "nav.news": "Press Center",
    "nav.contact": "Contact Us",

    "hero.scroll": "Scroll",

    "globe.eyebrow": "Global Presence",
    "globe.title.line1": "A network",
    "globe.title.line2": "without borders.",
    "globe.intro": "Strategic operations connecting international trade between South America and Europe.",
    "globe.loading": "Loading globe…",
    "globe.card.cta": "View terminal",
    "globe.cta": "VIEW DETAILS →",
    "globe.highlights": "Highlights",
    "globe.address": "Address",
    "globe.close": "Close",
    "globe.list.show": "View terminals",
    "globe.list.hide": "Hide terminals",
    "globe.legend.port": "Ports & terminals",
    "globe.legend.storage": "Storage",
    "globe.legend.project": "Projects",
    "globe.legend.waterway": "Waterways, rivers & channels",


    "ops.eyebrow": "Operations",
    "ops.title.line1": "Three pillars,",
    "ops.title.line2": "one single vision.",
    "ops.01.title": "Port Operations",
    "ops.01.desc": "Integral management of maritime and river terminals. General cargo, bulk and containers with world-class infrastructure.",
    "ops.02.title": "Logistics",
    "ops.02.desc": "End-to-end solutions: land transport, warehousing and distribution. Owned fleet and integrated partner network.",
    "ops.03.title": "Free Trade Zones",
    "ops.03.desc": "Exclusive operator of the Santafesina Free Zone. A strategic platform for international trade and cost reduction.",

    "ops.list.eyebrow": "Ports & Terminals",
    "ops.list.title1": "22 sites,",
    "ops.list.title2": "6 countries.",
    "ops.list.intro": "Select a port or terminal to access the full fact sheet: type, coast, vessels, facilities, cargoes and operational highlights.",
    "ops.list.view": "View fact sheet",

    "home.about.eyebrow": "About Us",
    "home.about.title1": "Fully integrated",
    "home.about.title2": "logistics platform.",
    "home.about.copy": "PTP Group is a privately held company providing integrated port-based solutions across South America and Europe. Guided by the premise of Connecting Global Markets and driven by a strong client-focused approach, the company has evolved from a stevedoring and port operations business into a comprehensive logistics platform that enhances commodity flows between regions.",
    "home.about.cta": "Discover our story",

    "stats.countries": "Countries",
    "stats.ports": "Ports and Terminals",
    "stats.hectares": "Hectares under Free Zone Regime",
    "stats.since": "Since",
    "notfound.title": "Page not found",
    "notfound.home": "Back to home",

    "about.eyebrow": "About Us",
    "about.title1": "Fully integrated",
    "about.title2": "logistics platform.",
    "about.p1": "PTP Group is a privately held company providing integrated port-based solutions across South America and Europe. Guided by the premise of Connecting Global Markets and driven by a strong client-focused approach, the company has evolved from a stevedoring and port operations business into a comprehensive logistics platform that enhances commodity flows between regions.",
    "about.p2": "The company's progressive vertical integration throughout the supply chain has shaped an extensive service portfolio encompassing port operations, stevedoring, maritime shipping agency services, storage and warehousing, documentary support, ground transportation, free zone management, operational outsourcing and last-mile delivery, among other value-added logistics services.",
    "about.p3": "PTP Group's expanding geographical footprint and operational capabilities have positioned the company as a leading regional logistics player, with a presence along the Paraná–Paraguay Waterway, encompassing more than 20 sites across Argentina, Brazil, Paraguay, Uruguay, Spain and the Netherlands.",
    "about.p4": "Its network comprises offices, on-site operational and commercial teams, operations in public ports and private terminals, and storage infrastructure for liquid bulk, dry bulk, general cargo, project cargo, containerized cargo, and temperature-controlled cargo.",
    "about.timeline.eyebrow": "Timeline",

    "timeline.all": "All",

    "services.eyebrow": "Services",
    "seo.home.desc": "PTP Group: 22 ports, terminals and storage facilities across 6 countries — port operations, integrated logistics, free zone and maritime agency.",
    "seo.services.desc": "Eight integrated service lines: port operations, storage, transshipment, logistics, free zone and maritime agency.",
    "seo.maritime.desc": "PTP Maritime Shipping Services: full ship agency coverage in Argentina, Uruguay, Paraguay, Brazil and Spain.",
    "seo.downloads.desc": "Download the PTP Group 2026 institutional brochure and watch the corporate videos in Portuguese, Spanish and English.",
    "seo.contact.desc": "Get in touch with PTP Group. Offices in Argentina, Uruguay, Paraguay, Spain and the Netherlands.",
    "services.title1": "Eight fronts,",
    "services.title2": "one single operation.",

    "fz.eyebrow": "Free Zone",
    "fz.title1": "Santa Fe",
    "fz.title2": "Free Zone.",
    "fz.label.location": "Location",
    "fz.label.operator": "Operator",
    "fz.location": "Villa Constitución · Santa Fe · Argentina",
    "fz.operator": "Zofravilla S.A.",
    "fz.p1": "Zofravilla S.A. is the long-term concessionaire of the Santa Fe Free Zone. It is located on a 65-hectare property with more than 600 meters of river frontage directly connected to the Paraguay-Paraná Waterway, where the company has developed an ambitious regional logistics hub for cargo, goods and commodities, both inbound and outbound.",
    "fz.p2": "Its differentiated tax, fiscal and customs regime makes this a strategic location with very attractive competitive advantages.",
    "fz.quote": "The Santa Fe Free Zone is the first and only free zone in Argentina that is directly connected to a deep-sea port.",
    "fz.highlights": "Highlights",
    "fz.outro": "Proximity to a major waterway, ocean, rail and road, along with the short distance to some of the country's main consumption and production centers, make this site an attractive alternative to include in any commodities supply chain.",
    "fz.h.1": "More than 50 hectares of land under free-zone regime",
    "fz.h.2": "Capacity for Panamax vessels",
    "fz.h.3": "Natural draft of 34''",
    "fz.h.4": "Government authorities on site",
    "fz.h.5": "First port in Argentina directly connected to a free zone",
    "fz.h.6": "Sole port operator",
    "fz.h.7": "Multi-product, multi-client facilities",
    "fz.h.8": "Suitable for general cargo, break bulk, bulk, containerized, palletized and project cargo",
    "fz.h.9": "33,000 sqm of covered warehouses already built, with over 30,000 sqm of additional facilities planned",
    "fz.h.10": "100,000 m³ liquid-bulk tank farm under construction",
    "fz.h.11": "Partial nationalization of goods and commodities",
    "fz.h.12": "No storage time limit",
    "fz.h.13": "Greater risk mitigation",
    "fz.h.14": "Stronger legal, economic and financial guarantees",

    "mar.eyebrow": "Maritime Agency",
    "mar.title1": "PTP Maritime",
    "mar.title2": "Shipping Services.",
    "mar.lead": "Delivers solutions through its own offices and team as well as through strategic partners, providing broad coverage and regional connectivity.",
    "mar.intro": "Aligned with the company's vertical-integration strategy and aiming to offer better, broader services to our clients, PTP Maritime Shipping Services was born. A complete maritime agency providing support in areas such as:",
    "mar.services.title": "Services",
    "mar.ports.title": "Ports served",
    "mar.offices.title": "Office network",
    "mar.address": "Nación 340, CP 2900, San Nicolás de los Arroyos, Buenos Aires, Argentina",
    "mar.coverage.national": "nationwide coverage",
    "mar.s.1": "Inbound and customs clearance coordination",
    "mar.s.2": "Liaison with port authorities",
    "mar.s.3": "Customs clearance to facilitate vessel operations",
    "mar.s.4": "Documentation preparation and follow-up",
    "mar.s.5": "Documentation for berthing and unberthing authorization",
    "mar.s.6": "Loading and unloading supervision",
    "mar.s.7": "Crew change and pilot transport",
    "mar.s.8": "Advice on port regulations, culture and language",
    "mar.s.9": "Guarantee of port services when required",
    "mar.s.10": "Shipowners' representative",
    "mar.s.11": "Bunkering",
    "mar.s.12": "Waste disposal",

    "contact.offices.eyebrow": "Offices",
    "contact.offices.title1": "Our office",
    "contact.offices.title2": "network.",

    "contact.eyebrow": "Contact",
    "contact.title.line1": "If you have any questions, doubts or comments,",
    "contact.title.line2": "please reach out to us.",
    "contact.intro": "Our team will get back to you as soon as possible.",
    "contact.field.name": "Full Name",
    "contact.field.company": "Company",
    "contact.field.phone": "Phone Number (please include country and area code)",
    "contact.field.phone.placeholder": "+54 11 5555 5555",
    "contact.field.email": "Email",
    "contact.field.message": "Your message",
    "contact.submit": "Submit",
    "contact.toast.title": "Message sent",
    "contact.toast.desc": "We will get back to you shortly.",

    "dl.eyebrow": "Media Library",
    "dl.title.line1": "Corporate",
    "dl.title.line2": "Media.",
    "dl.size": "PDF · 12MB",
    "dl.brochure.title": "Company Brochure",
    "dl.brochure.desc": "Complete overview of the group, operations and capabilities.",
    "dl.download": "Download",
    "dl.videos.eyebrow": "Company Video",
    "dl.videos.size": "MP4 · Google Drive",
    "dl.video.por.title": "PTP Group — Portuguese",
    "dl.video.por.desc": "PTP Group institutional presentation in Portuguese.",
    "dl.video.esp.title": "PTP Group — Spanish",
    "dl.video.esp.desc": "PTP Group institutional presentation in Spanish.",
    "dl.video.eng.title": "PTP Group — English",
    "dl.video.eng.desc": "PTP Group institutional presentation in English.",
    "dl.video.watch": "Watch / Download",

    "news.eyebrow": "Press Center",
    "news.title.line1": "Press",
    "news.title.line2": "Center.",
    "news.intro": "Notes, posts and official statements from the group. Follow us on LinkedIn to keep up with every move in real time.",
    "news.follow": "Follow PTP Group",
    "news.viewOn": "View on LinkedIn",
    "news.viewMore": "See more on LinkedIn",

    "footer.about": "Integrated port-based logistic solutions across South America and Europe.",
    "footer.contact": "Contact",
    "footer.operations": "Operations",
    "footer.nav": "Navigation",
    "footer.units": "Network",
    "footer.rights": "All rights reserved.",
    "footer.craft": "Crafted with precision.",
    "footer.g2.prefix": "Developed by",

    "port.back": "Back to Operations",
    "port.notfound.eyebrow": "Not found",
    "port.notfound.title": "Port not found.",
    "port.fs.type": "Type",
    "port.fs.coast": "Coast / River",
    "port.fs.vessels": "Vessels",
    "port.fs.facilities": "Facilities",
    "port.fs.cargoes": "Cargoes",
    "port.fs.highlights": "Highlights",

    "badge.project": "In development",
    "badge.project.aria": "Project in development",

    "wa.aria": "Contact via WhatsApp",
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  cycleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("ptp-lang") as Lang | null;
    return saved && langOrder.includes(saved) ? saved : "en";
  });

  useEffect(() => {
    document.documentElement.lang = langMeta[lang].html;
    localStorage.setItem("ptp-lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const cycleLang = () =>
    setLangState((l) => langOrder[(langOrder.indexOf(l) + 1) % langOrder.length]);

  const t = (key: string) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, cycleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const useT = () => useLanguage().t;
