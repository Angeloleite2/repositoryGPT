export type Service = {
  slug: string;
  title: string;
  description: string;
  note?: string;
};

export const services: Service[] = [
  {
    slug: "operacoes-portuarias",
    title: "Operações Portuárias",
    description:
      "Com presença em diversos portos e terminais, incluindo públicos, privados, de terceiros e próprios, a PTP Group realiza atividades relacionadas à operação portuária de embarcações marítimas e barcaças fluviais, incluindo carga, descarga e transbordo direto. As operações portuárias vão além do cais e podem ser complementadas com outros serviços, como transporte terrestre para as instalações de armazenagem, agenciamento marítimo, suporte documental ou atividades de comércio exterior.",
  },
  {
    slug: "instalacoes-de-armazenamento",
    title: "Instalações de Armazenamento",
    description:
      "Precisa de armazenagem de carga? Sem problemas. A PTP Group investe regularmente em infraestrutura e desenvolvimento de instalações de armazenagem para acomodar e movimentar diferentes tipos de carga e mercadorias, abrangendo granéis sólidos, granéis líquidos, carga geral, carga de projeto e contêineres, em áreas que podem ser encontradas dentro e fora das instalações portuárias. Os locais, tipos e capacidades de armazenagem podem variar entre os países.",
  },
  {
    slug: "terceirizacao-operacional",
    title: "Terceirização Operacional",
    description:
      "Terminal estressante, com baixo desempenho ou não relacionado ao seu negócio principal? A PTP Group adquiriu um conjunto específico de habilidades que lhe permitem cuidar de terminais de forma abrangente · desde a busca por talentos até a aquisição e entrega de EPIs, investindo em equipamentos e soluções, zelando pelo desempenho, padrões de produtividade e requisitos definidos pelo proprietário do terminal.",
  },
  {
    slug: "comex",
    title: "COMEX",
    description:
      "A PTP Group atua como Despachante Aduaneiro autorizado, auxiliando no monitoramento das leis e regulamentos aplicáveis às atividades de comércio exterior realizadas por seus clientes, além de fornecer suporte na geração, produção, rastreamento, apresentação, envio, recebimento e entrega de todos os documentos operacionais, como autorizações de embarque, transferências, manifestos etc.",
    note: "Disponível em alguns países.",
  },
  {
    slug: "agencia-maritima",
    title: "Agência Marítima",
    description:
      "Seguindo uma política rigorosa de atendimento, a PTP Group começou a oferecer serviços de representação de navios em 2023 e hoje é uma das unidades de negócios em expansão da empresa. Os serviços abrangem embarcações marítimas e barcaças fluviais para diferentes tipos de carga em portos de linhas regulares e internacionais. Quando necessário, também oferece serviços de amarração e atracação, abastecimento de combustível, entrega de provisões, suporte documental, leitura de calado, transporte de tripulação e mais.",
  },
  {
    slug: "transporte-terrestre",
    title: "Transporte Terrestre",
    description:
      "Seja do porto para as instalações de armazenamento, das instalações de armazenamento para o porto, do porto para o usuário final, da fábrica para o porto, ou de qualquer ponto A ao ponto B, a PTP Group fornece alternativas de transporte terrestre utilizando sua própria frota ou por meio de suporte de gestão.",
    note: "Disponível em alguns países.",
  },
  {
    slug: "atividades-de-valor-agregado",
    title: "Atividades de Valor Agregado",
    description:
      "Serviços verdadeiramente personalizados exigem evolução e adaptabilidade. A PTP Group expandiu o escopo do seu portfólio atendendo solicitações dos clientes · \"vocês fazem isso?\", \"vocês fazem aquilo?\". Sim, fazemos. Mistura, ensacamento, fracionamento, desova de container, maturação, consolidação, entre outros.",
  },
  {
    slug: "zonas-francas",
    title: "Gestão de Zonas Francas e Entrepostos Alfandegados",
    description:
      "A PTP Group adquiriu conhecimento e experiência em logística em zonas francas e entrepostos alfandegados e oferece suporte, consultoria e assessoria na definição da cadeia de suprimentos envolvendo esses setores.",
  },
];
