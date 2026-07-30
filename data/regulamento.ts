// Fonte única do regulamento — ver docs/02-DECISOES.md (D8, D9, D26) e
// docs/04-ROADMAP-V1.md (item 2 da spec). Página /regulamento renderiza
// SEMPRE deste array — nunca hardcode em outro lugar. Itens de premiação
// (valores/marcas específicas) seguem em aberto (P4) e não entram aqui —
// só a estrutura já decidida em D9.

export const regulamento = {
  versaoTexto: "30/07/2026",
  secoes: [
    {
      id: "categorias",
      titulo: "Categorias e faixas etárias",
      texto:
        "Iniciante: até 25 anos. Amador e Feminino: sem limite de idade. Menores de idade podem se inscrever em qualquer categoria — a exigência de autorização do responsável legal segue a data de nascimento, nunca a categoria escolhida.",
    },
    {
      id: "inscricao",
      titulo: "Inscrição e cota presencial",
      texto:
        "Modelo híbrido: pré-inscrição online (gratuita) + cota de inscrição presencial no dia do evento, até um limite total de 60 competidores. Quem se inscreve antes garante a vaga com folga.",
    },
    {
      id: "formato",
      titulo: "Formato das baterias",
      texto:
        "Bateria cronometrada individual: cada competidor tem 2 passagens de 1 minuto dentro de sua categoria.",
    },
    {
      id: "pontuacao",
      titulo: "Pontuação",
      texto:
        "Cada juiz dá uma nota de 0 a 10 por passagem. Conta a melhor passagem entre as notas dos juízes.",
    },
    {
      id: "premiacao",
      titulo: "Premiação",
      texto:
        "Feminino: medalha e premiação para todas as participantes. Iniciante e Amador: medalha para todos os competidores, com premiação extra para o top 3 de cada categoria. Itens e valores específicos da premiação ainda estão em definição e serão anunciados assim que confirmados.",
    },
    {
      id: "chuva",
      titulo: "Política de chuva e adiamento",
      texto:
        "Se chover no dia, o evento é reagendado para uma data alternativa, anunciada nos canais oficiais (Instagram e WhatsApp).",
    },
  ],
} as const;

export type RegulamentoSecao = (typeof regulamento)["secoes"][number];
