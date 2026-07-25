// Fonte única do FAQ — ver docs/02-DECISOES.md (D16) e docs/04-ROADMAP-V1.md
// (V1.3). Perguntas com `resposta: null` dependem do regulamento completo
// (P6 em docs/02-DECISOES.md) e aparecem na seção com sticker "em breve" —
// nunca com resposta inventada (política de placeholder, AGENT.md).

export const faq = [
  {
    id: "taxa",
    pergunta: "Tem taxa de inscrição?",
    resposta: "Não — a inscrição é gratuita.",
  },
  {
    id: "categorias",
    pergunta: "Quais são as categorias?",
    resposta: "Iniciante, Amador e Feminino.",
  },
  {
    id: "o-que-levar",
    pergunta: "O que preciso levar no dia?",
    resposta:
      "Seu skate, equipamento de segurança (capacete e proteções) e um documento de identificação para o credenciamento.",
  },
  {
    id: "publico",
    pergunta: "Posso levar acompanhantes? O evento é aberto ao público?",
    resposta: "Sim — entrada livre, o evento é aberto à comunidade.",
  },
  {
    id: "faixas-etarias",
    pergunta: "Quais as faixas etárias por categoria?",
    resposta: null,
  },
  {
    id: "cota-presencial",
    pergunta: "Dá pra se inscrever no dia?",
    resposta: null,
  },
  {
    id: "chuva",
    pergunta: "E se chover?",
    resposta: null,
  },
] as const;

export type FaqItem = (typeof faq)[number];
