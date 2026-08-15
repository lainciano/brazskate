// Fonte única do regulamento — ver docs/02-DECISOES.md (D8, D9, D26, D41,
// D42, D43, D45) e docs/04-ROADMAP-V1.md (item 2 da spec). Página
// /regulamento renderiza SEMPRE deste array — nunca hardcode em outro
// lugar. Formato das baterias corrigido para o modelo "Braz Skate" em
// 07/08/2026 (D41, revisa D35 — a versão anterior tinha um erro de
// transcrição do formato SLS dividido em eliminatória/final que o Lain
// nunca pediu). Inscrição virou só-online com prazo em 07/08/2026 (D42,
// revisa D1/D26/D36). Premiação (valores e itens) confirmada em 07/08/2026
// (D43, revisa D9). Categoria Master adicionada e premiação do Feminino
// unificada com as demais em 15/08/2026 (D45, revisa D8/D43).

export const regulamento = {
  versaoTexto: "15/08/2026",
  secoes: [
    {
      id: "categorias",
      titulo: "Categorias e faixas etárias",
      texto:
        "Iniciante: até 25 anos. Amador, Feminino e Master: sem limite de idade — a categoria Master é autodeclarada pelo competidor, sem idade mínima exigida. Menores de idade podem se inscrever em qualquer categoria — a exigência de autorização do responsável legal segue a data de nascimento, nunca a categoria escolhida.",
    },
    {
      id: "inscricao",
      titulo: "Inscrição",
      texto:
        "Inscrição 100% online e gratuita, até 30 de agosto de 2026. Não há inscrição presencial no dia do evento.",
    },
    {
      id: "formato",
      titulo: "Formato das baterias",
      texto:
        "Formato Braz Skate: cada competidor faz 2 voltas de 45 segundos dentro de sua categoria, cada volta seguida de 2 bomb tricks. Depois que todos os competidores da bateria completarem suas voltas, cada um faz uma rodada final de 3 manobras.",
    },
    {
      id: "pontuacao",
      titulo: "Pontuação",
      texto:
        "Cada juiz dá uma nota de 0 a 10 por volta (incluindo os bomb tricks) e por manobra da rodada final. Conta a melhor nota entre as tentativas em cada etapa.",
    },
    {
      id: "premiacao",
      titulo: "Premiação",
      texto:
        "Camiseta oficial do Braz Skate para todos os competidores. Top 3 de cada categoria recebe premiação em dinheiro — 1º lugar R$ 350, 2º lugar R$ 250, 3º lugar R$ 150 — além de itens de skate (shapes de maple, trucks, rolamentos e rodas).",
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
