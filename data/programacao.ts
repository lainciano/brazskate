// Fonte única da programação do dia (item 9 de docs/03-SPEC-SITE.md §3.2) —
// ver docs/02-DECISOES.md (D26, D32). Sequência derivada do regulamento
// (data/regulamento.ts, D26): formato de fase única, sem "final" separada
// — cada competidor faz 2 passagens e a melhor conta. Horários específicos
// ainda não definidos pela ASB (política de placeholder, AGENT.md); cada
// etapa mostra StickerBadge "em breve" no lugar do horário até existir.

export const programacao = {
  etapas: [
    {
      id: "credenciamento",
      titulo: "Credenciamento",
      texto:
        "Conferência de documento de identificação, assinatura do termo de responsabilidade em papel (quem já se inscreveu online) e inscrição presencial enquanto houver cota — limite total de 60 competidores.",
    },
    {
      id: "baterias",
      titulo: "Baterias por categoria",
      texto:
        "Cada competidor tem 2 passagens de 1 minuto dentro de sua categoria — Iniciante, Amador ou Feminino.",
    },
    {
      id: "apuracao",
      titulo: "Apuração",
      texto:
        "Cada juiz dá uma nota de 0 a 10 por passagem. Conta a melhor passagem entre as notas dos juízes.",
    },
    {
      id: "premiacao",
      titulo: "Premiação",
      texto:
        "Medalha para todos os competidores, com premiação extra para o top 3 de cada categoria. Na categoria Feminino, premiação para todas as participantes.",
    },
  ],
} as const;

export type ProgramacaoEtapa = (typeof programacao)["etapas"][number];
