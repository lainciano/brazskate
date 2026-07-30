// Fonte única do FAQ — ver docs/02-DECISOES.md (D16, D26, D27) e
// docs/04-ROADMAP-V1.md (V1.3). Perguntas com `resposta: null` dependem de
// conteúdo ainda pendente e aparecem na seção com sticker "em breve" — nunca
// com resposta inventada (política de placeholder, AGENT.md).

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
    resposta:
      "Iniciante: até 25 anos. Amador e Feminino: sem limite de idade.",
  },
  {
    id: "cota-presencial",
    pergunta: "Dá pra se inscrever no dia?",
    resposta:
      "Sim — o modelo é híbrido: pré-inscrição online + cota de inscrição presencial no dia, até um limite de 60 competidores no total. Quem se inscreve antes garante a vaga com folga.",
  },
  {
    id: "chuva",
    pergunta: "E se chover?",
    resposta:
      "O evento é reagendado para uma data alternativa, anunciada nos canais oficiais (Instagram e WhatsApp).",
  },
  {
    id: "pista",
    pergunta: "A pista está em boas condições?",
    resposta:
      "A pista do Skate Park de Brazlândia está em processo de manutenção e melhorias — o campeonato acontece normalmente, e a organização trabalha para deixar a estrutura em boas condições até o dia do evento.",
  },
] as const;

export type FaqItem = (typeof faq)[number];
