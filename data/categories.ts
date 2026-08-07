// Fonte única das categorias e regras de premiação — ver docs/03-SPEC-SITE.md §4
// e docs/02-DECISOES.md (D8, D9, D43). Usada na home, no regulamento e na
// validação do formulário de inscrição. Premiação trocou de medalha pra
// camiseta em D43 (07/08/2026).

export const categories = [
  { id: "iniciante", nome: "Iniciante", premiacao: "camiseta-todos-top3" },
  { id: "amador", nome: "Amador", premiacao: "camiseta-todos-top3" },
  {
    id: "feminino",
    nome: "Feminino",
    premiacao: "camiseta-e-premiacao-todas",
  },
] as const;

// camiseta-todos-top3: camiseta p/ todos; premiação adicional ao top 3
// camiseta-e-premiacao-todas: camiseta + premiação para todas as participantes
// Faixas etárias: PENDENTE (P6 em docs/02-DECISOES.md) — adicionar
// minAge/maxAge quando definido pela organização.

export type Category = (typeof categories)[number];
