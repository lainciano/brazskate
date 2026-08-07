// Contrapartidas de patrocínio (D30, D39, docs/02-DECISOES.md) — dois
// níveis derivados do precedente do próprio campeonato de 2021 (a ASB já
// separava "Patrocínio" de "Apoio" nas artes de premiação daquela edição) e
// das "formas de apoio" já publicadas nesta página. Sem valor em R$ — a
// contrapartida final segue acertada no WhatsApp (política de placeholder,
// AGENT.md); o que muda é que agora existe um piso concreto do que cada
// nível recebe. Tópico "Infraestrutura" saiu das formas de apoio em D39 —
// nível Apoio passa a cobrir só divulgação/mídia.

export type NivelContrapartida = {
  nivel: string;
  quemEntra: string;
  recebe: readonly string[];
};

export const contrapartidas: readonly NivelContrapartida[] = [
  {
    nivel: "Patrocínio",
    quemEntra: "Apoio financeiro (Pix) ou premiação",
    recebe: [
      "Menção no som durante o evento",
      "Espaço para a faixa/banner da marca na pista (material fornecido pela marca)",
      "Logo na camiseta oficial do Braz Skate",
      "Citação pelo narrador durante o evento, com apresentação dos produtos da marca (merchandising)",
      "Logo e link no site",
      "Menção nas redes sociais (@brazskate)",
    ],
  },
  {
    nivel: "Apoio",
    quemEntra: "Divulgação e mídia",
    recebe: [
      "Menção no som durante o evento",
      "Nome no site",
      "Menção nas redes sociais (@brazskate)",
    ],
  },
];
