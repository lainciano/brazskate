// Fonte única da programação do dia (item 9 de docs/03-SPEC-SITE.md §3.2) —
// ver docs/02-DECISOES.md (D26, D32, D37, D38, D41, D42, D48). Cronograma
// oficial do dia fechado pela organização (D58, arte em public/cronograma.jpg):
// 9h abertura/check-in, 10h Feminino, 10h30 Iniciante, pausa, 13h30 Amador,
// 15h Master, 17h Premiação. Best trick (D38) e apuração não têm horário fixo
// na arte oficial — seguem "em breve" até a ASB definir (política de
// placeholder, AGENT.md). Formato das baterias segue o regulamento
// (data/regulamento.ts, D41): 2 voltas de 45s com 2 bomb tricks cada e
// rodada final de 3 manobras. Inscrição só-online (D42) — não há inscrição
// presencial no credenciamento.

export type ProgramacaoEtapa = {
  id: string;
  titulo: string;
  horario: string | null;
  texto: string;
};

export const programacao: { etapas: readonly ProgramacaoEtapa[] } = {
  etapas: [
    {
      id: "abertura-check-in",
      titulo: "Abertura e check-in",
      horario: "9h",
      texto:
        "Abertura da pista. Check-in dos competidores com conferência de documento de identificação e assinatura do termo de responsabilidade em papel — não há inscrição presencial no dia.",
    },
    {
      id: "feminino",
      titulo: "Feminino",
      horario: "10h",
      texto:
        "Bateria Feminino. Formato Braz Skate: 2 voltas de 45 segundos por competidora — cada volta seguida de 2 bomb tricks — e rodada final de 3 manobras após todas completarem as voltas.",
    },
    {
      id: "iniciante",
      titulo: "Iniciante",
      horario: "10h30",
      texto:
        "Bateria Iniciante. Formato Braz Skate: 2 voltas de 45 segundos por competidor — cada volta seguida de 2 bomb tricks — e rodada final de 3 manobras.",
    },
    {
      id: "pausa-almoco",
      titulo: "Pausa",
      horario: "12h às 13h30",
      texto: "Intervalo para almoço antes das categorias da tarde e da premiação.",
    },
    {
      id: "amador",
      titulo: "Amador",
      horario: "13h30",
      texto:
        "Bateria Amador. Formato Braz Skate: 2 voltas de 45 segundos por competidor — cada volta seguida de 2 bomb tricks — e rodada final de 3 manobras. O check-in desta categoria fica aberto até 30 minutos antes do início.",
    },
    {
      id: "master",
      titulo: "Master",
      horario: "15h",
      texto:
        "Bateria Master. Formato Braz Skate: 2 voltas de 45 segundos por competidor — cada volta seguida de 2 bomb tricks — e rodada final de 3 manobras. O check-in desta categoria fica aberto até 30 minutos antes do início.",
    },
    {
      id: "best-trick",
      titulo: "Best trick",
      horario: null,
      texto:
        "Rodada de melhor manobra à parte das categorias, com a pista liberada para qualquer pessoa presente tentar — não só competidores inscritos.",
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
      horario: "17h",
      texto:
        "Camiseta oficial do Braz Skate para todos os competidores. Top 3 de cada categoria recebe premiação em dinheiro (1º R$ 350, 2º R$ 250, 3º R$ 150) e itens de skate — shapes de maple, trucks, rolamentos e rodas.",
    },
  ],
};
