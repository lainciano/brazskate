// Fonte única de avisos/atualizações (item 10 de docs/03-SPEC-SITE.md §3.2)
// — ver docs/02-DECISOES.md (D32). MDX descartado (a spec original pedia
// "lista simples em MDX", mas o projeto não tem infra MDX — mesmo motivo
// que já descartou MDX no FAQ, D13/D7). Mais recente primeiro.

export const avisos = [
  {
    id: "inscricoes-abertas",
    dataISO: "2026-07-30",
    data: "30/07/2026",
    titulo: "Inscrições abertas",
    texto:
      "O formulário de pré-inscrição já está no ar. Garanta sua vaga — são até 60 vagas no total, entre pré-inscrição online e cota presencial no dia.",
  },
  {
    id: "data-confirmada",
    dataISO: "2026-07-30",
    data: "30/07/2026",
    titulo: "Data confirmada: 12 de setembro",
    texto:
      "O Braz Skate tem data fechada com a Administração Regional — 12 de setembro de 2026, no Skate Park de Brazlândia.",
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
