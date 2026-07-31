// Fonte única da grade de patrocinadores comerciais (item 6 de
// docs/03-SPEC-SITE.md §3.2) — schema pronto, sem patrocinador fechado
// ainda (P4 segue aberta, docs/02-DECISOES.md). Nenhum componente lê este
// arquivo ainda — a regra do roadmap contra casca vazia (05-DESIGN.md §4.3)
// proíbe criar a grade de logos antes de ter patrocinador real para mostrar.
// Ver também docs/leads-patrocinio-2021.md (não linkado no site) para
// contatos de captação — precedente de 2021, não patrocinador confirmado.

export type Patrocinador = {
  nome: string;
  logoSrc: string;
  url: string;
  nivel: "patrocinio" | "apoio";
};

export const patrocinadores: readonly Patrocinador[] = [];
