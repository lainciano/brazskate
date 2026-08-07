// Fonte única da programação do dia (item 9 de docs/03-SPEC-SITE.md §3.2) —
// ver docs/02-DECISOES.md (D26, D32, D37, D38, D41, D42). Sequência derivada
// do regulamento (data/regulamento.ts, D41): formato "Braz Skate" — cada
// competidor faz 2 voltas de 45s (cada volta seguida de 2 bomb tricks) e,
// depois que todos da bateria completarem as voltas, uma rodada final de 3
// manobras. Inscrição virou só-online com prazo 30/08 (D42) — não há mais
// inscrição presencial no credenciamento. Horários gerais confirmados em
// reunião de 06/08/2026 (D37): abertura da pista às 9h, início das
// atividades às 10h, pausa para o almoço das 12h às 13h30. Horários
// específicos de cada etapa (best trick, apuração, premiação) ainda não
// definidos pela ASB (política de placeholder, AGENT.md) — etapa sem
// `horario` mostra StickerBadge "em breve" no lugar dele.

export type ProgramacaoEtapa = {
  id: string;
  titulo: string;
  horario: string | null;
  texto: string;
};

export const programacao: { etapas: readonly ProgramacaoEtapa[] } = {
  etapas: [
    {
      id: "credenciamento",
      titulo: "Credenciamento",
      horario: "9h",
      texto:
        "Abertura da pista. Conferência de documento de identificação e assinatura do termo de responsabilidade em papel para quem já se inscreveu online — não há inscrição presencial no dia.",
    },
    {
      id: "baterias",
      titulo: "Baterias por categoria",
      horario: "10h",
      texto:
        "Início das atividades. Formato Braz Skate: 2 voltas de 45 segundos por competidor dentro de sua categoria — Iniciante, Amador ou Feminino — cada volta seguida de 2 bomb tricks. Depois que todos completarem as voltas, cada competidor faz uma rodada final de 3 manobras.",
    },
    {
      id: "best-trick",
      titulo: "Best trick",
      horario: null,
      texto:
        "Rodada de melhor manobra à parte das categorias, com a pista liberada para qualquer pessoa presente tentar — não só competidores inscritos.",
    },
    {
      id: "pausa-almoco",
      titulo: "Pausa para o almoço",
      horario: "12h às 13h30",
      texto: "Intervalo antes da apuração e da premiação.",
    },
    {
      id: "apuracao",
      titulo: "Apuração",
      horario: null,
      texto:
        "Cada juiz dá uma nota de 0 a 10 por volta (incluindo os bomb tricks) e por manobra da rodada final. Conta a melhor nota entre as tentativas em cada etapa.",
    },
    {
      id: "premiacao",
      titulo: "Premiação",
      horario: null,
      texto:
        "Camiseta oficial do Braz Skate para todos os competidores. Top 3 de cada categoria recebe premiação em dinheiro (1º R$ 350, 2º R$ 250, 3º R$ 150) e itens de skate — shapes de maple, trucks, rolamentos e rodas. Na categoria Feminino, camiseta e premiação para todas as participantes.",
    },
  ],
};
