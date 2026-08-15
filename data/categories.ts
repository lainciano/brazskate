// Fonte única das categorias e regras de premiação — ver docs/03-SPEC-SITE.md §4
// e docs/02-DECISOES.md (D8, D9). Usada na home, no regulamento e na
// validação do formulário de inscrição.

export const categories = [
  { id: "iniciante", nome: "Iniciante", premiacao: "medalha-todos-top3" },
  { id: "amador", nome: "Amador", premiacao: "medalha-todos-top3" },
  { id: "master", nome: "Master", premiacao: "medalha-todos-top3" },
  {
    id: "feminino",
    nome: "Feminino",
    premiacao: "medalha-todos-top3",
  },
] as const;

// medalha-todos-top3: medalha p/ todos; premiação adicional ao top 3
// Faixas etárias: PENDENTE (P6 em docs/02-DECISOES.md) — adicionar
// minAge/maxAge quando definido pela organização.

export type Category = (typeof categories)[number];
