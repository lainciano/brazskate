// Fonte única do FAQ — ver docs/02-DECISOES.md (D16, D26, D27, D42, D48) e
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
    resposta: "Iniciante, Amador, Feminino e Master.",
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
      "Iniciante: até 25 anos. Amador, Feminino e Master: sem limite de idade — Master é autodeclarada, sem idade mínima exigida.",
  },
  {
    id: "cota-presencial",
    pergunta: "Dá pra se inscrever no dia?",
    resposta:
      "Não. As inscrições estão encerradas e não há inscrição presencial no credenciamento. Eram exclusivamente online, pelo formulário de pré-inscrição, com prazo até 30 de agosto de 2026.",
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
  {
    id: "estacionamento",
    pergunta: "Onde estacionar?",
    resposta:
      "Tem estacionamento ao lado da pista, com mais espaço do que a via pública do entorno. Um trecho da rua em frente ao parque pode ficar fechado no dia do evento — o formato exato ainda está sendo definido com a Administração.",
  },
] as const;

export type FaqItem = (typeof faq)[number];
