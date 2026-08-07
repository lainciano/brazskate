// Fonte única de avisos/atualizações (item 10 de docs/03-SPEC-SITE.md §3.2)
// — ver docs/02-DECISOES.md (D32, D34, D38, D41, D42, D43). MDX descartado
// (a spec original pedia "lista simples em MDX", mas o projeto não tem
// infra MDX — mesmo motivo que já descartou MDX no FAQ, D13/D7). Mais
// recente primeiro.

export const avisos = [
  {
    id: "vai-ter-no-dia",
    dataISO: "2026-08-06",
    data: "06/08/2026",
    titulo: "O que vai ter no dia",
    texto:
      "Além das baterias por categoria, vai ter uma rodada de best trick à parte, com a pista liberada para qualquer pessoa presente tentar uma manobra. Fotógrafo oficial cobrindo o evento, e presença confirmada de Galego (Street Loyal).",
  },
  {
    id: "formato-braz-skate",
    dataISO: "2026-08-07",
    data: "07/08/2026",
    titulo: "Formato das baterias definido: Braz Skate",
    texto:
      "As baterias seguem o formato Braz Skate: 2 voltas de 45 segundos por competidor, cada volta seguida de 2 bomb tricks. Depois que todos completarem as voltas, cada competidor faz uma rodada final de 3 manobras. Regulamento completo em /regulamento.",
  },
  {
    id: "inscricao-so-online",
    dataISO: "2026-08-07",
    data: "07/08/2026",
    titulo: "Inscrição só online, até 30 de agosto",
    texto:
      "A inscrição é só pelo formulário online — não há mais inscrição presencial no dia do evento. O prazo final é 30 de agosto de 2026.",
  },
  {
    id: "data-confirmada",
    dataISO: "2026-08-06",
    data: "06/08/2026",
    titulo: "Data confirmada: 13 de setembro",
    texto:
      "O Braz Skate tem nova data fechada com a Administração Regional — 13 de setembro de 2026, no Skate Park de Brazlândia.",
  },
  {
    id: "inscricoes-abertas",
    dataISO: "2026-07-30",
    data: "30/07/2026",
    titulo: "Inscrições abertas",
    texto:
      "O formulário de pré-inscrição já está no ar. Garanta sua vaga o quanto antes.",
  },
  {
    id: "parceria-uiemapv",
    dataISO: "2026-07-25",
    data: "25/07/2026",
    titulo: "UIEMAPV é parceira institucional",
    texto:
      "O instituto UIEMAPV (@uiemapvsocial) confirmou parceria institucional com o Braz Skate, dando lastro pra captação e execução do evento.",
  },
] as const;

export type Aviso = (typeof avisos)[number];
