// Fonte única da equipe do Braz Skate — usada em "Quem organiza" (Sobre)
// e nos Agradecimentos (fim de /galeria, docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.4). Um nome novo
// na organização não pode ficar dessincronizado entre as duas seções.
//
// `instagram` é opcional: sem perfil confirmado pelo Lain, o nome entra
// sem link (política de placeholder, AGENT.md) — nunca inventar um handle.

export type Pessoa = {
  nome: string;
  instagram?: string;
};

// P7 (docs/02-DECISOES.md): funções ainda não fechadas pra todo mundo — só
// os nomes por enquanto, sem inventar cargo formal. Instagram de cada um
// adicionado em D53.
export const organizacao: readonly Pessoa[] = [
  { nome: "Luciano", instagram: "lainciano" },
  { nome: "Gustavo", instagram: "gustavolno" },
  { nome: "Cauet", instagram: "cauetista" },
  { nome: "Samuel", instagram: "samuelsktg" },
];

// Fotografaram e filmaram o evento em 13/09/2026. Perfis pendentes
// (docs/superpowers/specs/2026-09-27-pos-evento-galeria-resultados-design.md §8).
export const fotografiaEVideo: readonly Pessoa[] = [
  { nome: "Duda" },
  { nome: "Ítalo" },
  { nome: "Victor" },
  { nome: "Nerd" },
];

// Sem função fixa no dia — cobriram o que faltava, resolveram na hora, até
// cobriram ausência de algum organizador quando precisou. Perfis
// pendentes.
export const sempreProPerto: readonly Pessoa[] = [
  { nome: "João Paulo" },
  { nome: "Rafael" },
  { nome: "Danilo" },
];
