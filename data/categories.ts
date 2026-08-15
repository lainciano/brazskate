// Fonte única das categorias e regras de premiação — ver docs/03-SPEC-SITE.md §4
// e docs/02-DECISOES.md (D8, D9, D43, D45). Usada na home, no regulamento e
// na validação do formulário de inscrição. Premiação trocou de medalha pra
// camiseta em D43 (07/08/2026). Categoria Master adicionada em D45
// (15/08/2026) — autodeclarada, sem idade mínima; mesma regra de premiação
// das demais (D45 também unificou a do Feminino, que antes era diferente).

export const categories = [
  { id: "iniciante", nome: "Iniciante", premiacao: "camiseta-todos-top3" },
  { id: "amador", nome: "Amador", premiacao: "camiseta-todos-top3" },
  { id: "feminino", nome: "Feminino", premiacao: "camiseta-todos-top3" },
  { id: "master", nome: "Master", premiacao: "camiseta-todos-top3" },
] as const;

// camiseta-todos-top3: camiseta p/ todos; premiação adicional ao top 3
// Faixas etárias: PENDENTE (P6 em docs/02-DECISOES.md) — adicionar
// minAge/maxAge quando definido pela organização. Master é exceção: sem
// idade mínima definida, autodeclarada pelo competidor (D45).

export type Category = (typeof categories)[number];
